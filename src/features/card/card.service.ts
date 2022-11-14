import { ConflictException, Injectable } from '@nestjs/common'
import { Message } from '../../constants/messages'
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

  public async create(
    { wordName, vocabularyId }: CreateCardDto,
  ): Promise<CardDocument> {
    const word =
      await this.wordRepository.existsByName(wordName)
      || await this.wordRepository.create({ name: wordName })

    const vocabulary = await this.vocabularyRepository.getById(vocabularyId)

    const cards = await this.cardRepository.getByIds(vocabulary.cards)
    if (cards.some(card => card.word.equals(word._id))) {
      throw new ConflictException(Message.WORD_EXISTS_IN_VOCABULARY)
    }

    const card = await this.cardRepository.create({
      word: word._id,
      vocabulary: vocabularyId,
    })

    await this.vocabularyRepository.addCard(vocabularyId, card._id)

    return card
  }

  public async remove(id: string) {
    const card = await this.cardRepository.getById(id)

    await this.meaningRepository.removeByIds(card.meanings)

    await this.vocabularyRepository.removeCard(card.vocabulary, card._id)

    await card.remove()

    return {
      cardId: id,
    }
  }
}

