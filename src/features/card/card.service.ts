import { Injectable } from '@nestjs/common'
import { CardRepository } from './card.repository'
import { CreateCardDto } from './dto/create-card.dto'
import { CardDocument } from './card.schema'
import { WordRepository } from '../word/word.repository'
import { VocabularyRepository } from '../vocabulary/vocabulary.repository'
import { MeaningRepository } from '../meaning/meaning.repository'

@Injectable()
export class CardService {
  public constructor(
    private readonly cardRepository: CardRepository,
    private readonly wordRepository: WordRepository,
    private readonly vocabularyRepository: VocabularyRepository,
    private readonly meaningRepository: MeaningRepository,
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

  public async remove(id: string) {
    const card = await this.cardRepository.getById(id)

    // TODO: handle
    if (!card) throw new Error('no card')

    await this.meaningRepository.removeByIds(card.meanings)

    await this.vocabularyRepository.removeCard(card.vocabulary, card._id)

    await card.remove()

    return {
      cardId: id,
    }
  }
}

