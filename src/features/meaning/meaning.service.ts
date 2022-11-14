import { ConflictException, Injectable } from '@nestjs/common'
import { Message } from '../../constants/messages'
import { MeaningDocument } from './meaning.schema'
import { TranslationDocument } from '../translation/translation.schema'
import { MeaningRepository } from './meaning.repository'
import { CardRepository } from '../card/card.repository'
import { WordRepository } from '../word/word.repository'
import { TranslationRepository } from '../translation/translation.repository'
import { CreateMeaningDto } from './dto/create-meaning.dto'
import { AddTranslationDto } from './dto/add-translation.dto'
import { RemoveTranslationDto } from './dto/remove-translation.dto'

@Injectable()
export class MeaningService {
  constructor(
    private readonly meaningRepository: MeaningRepository,
    private readonly cardRepository: CardRepository,
    private readonly translationRepository: TranslationRepository,
    private readonly wordRepository: WordRepository,
  ) {}

  public async create(
    { name, cardId }: CreateMeaningDto,
  ): Promise<MeaningDocument> {
    const card = await this.cardRepository.getById(cardId)

    const meanings = await this.meaningRepository.getByIds(card.meanings)
    if (meanings.some(meaning => meaning.name === name)) {
      throw new ConflictException(Message.MEANING_EXISTS_IN_CARD)
    }

    const meaning = await this.meaningRepository.create({ name, card: cardId })

    card.meanings.push(meaning._id)
    await card.save()

    return meaning
  }

  public async remove(id: string) {
    const meaning = await this.meaningRepository.getById(id)

    await this.cardRepository.removeMeaning(meaning.card, meaning._id)

    await meaning.remove()

    return {
      meaningId: id
    }
  }

  public async addTranslation(
    id: string,
    { translationName }: AddTranslationDto,
  ): Promise<TranslationDocument> {
    const translation =
      await this.translationRepository.getByNameOrNull(translationName)
      || await this.translationRepository.create({ name: translationName })

    const meaning = await this.meaningRepository.getById(id)
    if (meaning.translations.some(id => id.equals(translation._id))) {
      throw new ConflictException(Message.TRANSLATION_EXISTS_IN_MEANING)
    }

    meaning.translations.push(translation._id)
    await meaning.save()

    const card = await this.cardRepository.getById(meaning.card)

    if (!translation.words.includes(card.word)) {
      translation.words.push(card.word)
      await translation.save()

      await this.wordRepository.addTranslation(card.word, translation._id)
    }

    return translation
  }

  public async removeTranslation(
    id: string,
    { translationId }: RemoveTranslationDto,
  ) {
    await this.meaningRepository.removeTranslation(id, translationId)

    return {
      translationId: translationId,
    }
  }
}
