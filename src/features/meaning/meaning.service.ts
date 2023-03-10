import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { Message } from '../../constants/messages'
import { TranslationDocument } from '../translation/translation.schema'
import { MeaningRepository } from './meaning.repository'
import { CardRepository } from '../card/card.repository'
import { WordRepository } from '../word/word.repository'
import { TranslationRepository } from '../translation/translation.repository'
import { CreateMeaningDto } from './dto/create-meaning.dto'
import { AddTranslationDto } from './dto/add-translation.dto'
import { RemoveTranslationDto } from './dto/remove-translation.dto'
import { EditTranslationDto } from './dto/edit-translation.dto'
import { EditMeaningNameDto } from './dto/edit-meaning-name.dto'
import { CreateMeaningResponse } from './response/create-meaning.response'
import { RemoveMeaningResponse } from './response/remove-meaning.response'
import { AddTranslationResponse } from './response/add-translation.response'
import { RemoveTranslationResponse } from './response/remove-translation.response'
import { EditTranslationResponse } from './response/edit-translation-response'
import { EditMeaningNameResponse } from './response/edit-meaning-name.response'

@Injectable()
export class MeaningService {
  constructor(
    private readonly meaningRepository: MeaningRepository,
    private readonly cardRepository: CardRepository,
    private readonly translationRepository: TranslationRepository,
    private readonly wordRepository: WordRepository,
  ) {}

  public async create({
    name,
    cardId,
  }: CreateMeaningDto): Promise<CreateMeaningResponse> {
    const card = await this.cardRepository.getById(cardId)

    const meanings = await this.meaningRepository.getByIds(card.meanings)
    if (meanings.some((meaning) => meaning.name === name)) {
      throw new ConflictException(Message.MEANING_EXISTS_IN_CARD)
    }

    const meaning = await this.meaningRepository.create({ name, card: cardId })

    card.meanings.push(meaning._id)
    await card.save()

    return meaning
  }

  public async remove(id: string): Promise<RemoveMeaningResponse> {
    const meaning = await this.meaningRepository.getById(id)

    await this.cardRepository.removeMeaning(meaning.card, meaning._id)

    await meaning.remove()

    return {
      meaningId: id,
    }
  }

  public async editName(
    id: string,
    body: EditMeaningNameDto,
  ): Promise<EditMeaningNameResponse> {
    return this.meaningRepository.edit(id, body)
  }

  public async addTranslation(
    id: string,
    { translationName }: AddTranslationDto,
  ): Promise<AddTranslationResponse> {
    // find meaning first to avoid futile translation creation
    const meaning = await this.meaningRepository.getById(id)

    const translation = await this.getOrCreateTranslation(translationName)

    if (meaning.translations.some((id) => id.equals(translation._id))) {
      throw new ConflictException(Message.TRANSLATION_EXISTS_IN_MEANING)
    }

    meaning.translations.push(translation._id)
    await meaning.save()

    const card = await this.cardRepository.getById(meaning.card)

    await this.checkTranslationInWord(translation, card.word)

    return translation
  }

  public async removeTranslation(
    id: string,
    { translationId }: RemoveTranslationDto,
  ): Promise<RemoveTranslationResponse> {
    await this.meaningRepository.removeTranslation(id, translationId)

    return {
      translationId: translationId,
    }
  }

  public async editTranslation(
    id: string,
    { translationId, translationName }: EditTranslationDto,
  ): Promise<EditTranslationResponse> {
    const meaning = await this.meaningRepository.getById(id)

    const oldTranslationIndex = meaning.translations.findIndex((id) =>
      id.equals(translationId),
    )
    if (oldTranslationIndex === -1) {
      throw new NotFoundException(Message.TRANSLATION_NOT_FOUND_IN_MEANING)
    }

    const newTranslation = await this.getOrCreateTranslation(translationName)

    if (meaning.translations.some((id) => id.equals(newTranslation._id))) {
      throw new ConflictException(Message.TRANSLATION_EXISTS_IN_MEANING)
    }

    meaning.translations[oldTranslationIndex] = newTranslation._id
    await meaning.save()

    const card = await this.cardRepository.getById(meaning.card)

    await this.checkTranslationInWord(newTranslation, card.word)

    return newTranslation
  }

  private async getOrCreateTranslation(
    translationName: string,
  ): Promise<TranslationDocument> {
    return (
      (await this.translationRepository.getByNameOrNull(translationName)) ||
      (await this.translationRepository.create({ name: translationName }))
    )
  }

  private async checkTranslationInWord(
    translation: TranslationDocument,
    wordId: Types.ObjectId,
  ): Promise<void> {
    if (!translation.words.some((id) => id.equals(wordId))) {
      translation.words.push(wordId)
      await translation.save()

      await this.wordRepository.addTranslation(wordId, translation._id)
    }
  }
}
