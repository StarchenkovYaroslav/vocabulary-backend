import { Injectable } from '@nestjs/common'
import { MeaningDocument } from './meaning.schema'
import { TranslationDocument } from '../translation/translation.schema'
import { MeaningRepository } from './meaning.repository'
import { CardRepository } from '../card/card.repository'
import { WordRepository } from '../word/word.repository'
import { TranslationRepository } from '../translation/translation.repository'
import { CreateMeaningDto } from './dto/create-meaning.dto'
import { AddTranslationDto } from './dto/add-translation.dto'

@Injectable()
export class MeaningService {
  constructor(
    private readonly meaningRepository: MeaningRepository,
    private readonly cardRepository: CardRepository,
    private readonly translationRepository: TranslationRepository,
    private readonly wordRepository: WordRepository,
  ) {}

  public async create(dto: CreateMeaningDto): Promise<MeaningDocument> {
    const meaning = await this.meaningRepository.create({
      name: dto.name,
      card: dto.cardId,
    })

    await this.cardRepository.addMeaning(dto.cardId, meaning._id)

    return meaning
  }

  public async addTranslation(dto: AddTranslationDto): Promise<TranslationDocument> {
    let translation = await this.translationRepository.getByName(dto.translationName)
    if (!translation) translation = await this.translationRepository.create({
      name: dto.translationName
    })

    const meaning = await this.meaningRepository.getById(dto.meaningId)

    // TODO: handle
    if (!meaning) throw new Error('no meaning')

    const card = await this.cardRepository.getById(meaning.card)

    const word = await this.wordRepository.getById(meaning._id)

    // TODO: handle
    //if (!word) throw new Error('no word')

    // if (word.translations.includes(translation)) {
    //
    // }

    return translation
  }
}
