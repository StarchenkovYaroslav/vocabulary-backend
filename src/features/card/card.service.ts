import { Injectable } from '@nestjs/common'
import { CardRepository } from './card.repository'
import { CreateCardDto } from './dto/create-card.dto'
import { CardDocument } from './card.schema'
import { WordRepository } from '../word/word.repository'
import { VocabularyRepository } from '../vocabulary/vocabulary.repository'

@Injectable()
export class CardService {
  public constructor(
    private readonly cardRepository: CardRepository,
    private readonly wordRepository: WordRepository,
    private readonly vocabularyRepository: VocabularyRepository,
  ) {}

  public async create(dto: CreateCardDto): Promise<CardDocument> {
    let word = await this.wordRepository.existsByName(dto.wordName)
    if (!word) word = await this.wordRepository.create({ name: dto.wordName })

    const card = await this.cardRepository.create({
      word: word._id,
      vocabulary: dto.vocabularyId,
    })

    await this.vocabularyRepository.addCard(dto.vocabularyId, card._id)

    return card
  }
}

