import { ConflictException, Injectable } from '@nestjs/common'
import { Message } from '../../constants/messages'
import { VocabularyRepository } from './vocabulary.repository'
import { CardRepository } from '../card/card.repository'
import { MeaningRepository } from '../meaning/meaning.repository'
import { VocabularyDocument } from './vocabulary.schema'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'

@Injectable()
export class VocabularyService {
  public constructor(
    private readonly vocabularyRepository: VocabularyRepository,
    private readonly cardRepository: CardRepository,
    private readonly meaningRepository: MeaningRepository,
  ) {}

  public async create(
    { name }: CreateVocabularyDto
  ): Promise<VocabularyDocument> {
    if (await this.vocabularyRepository.existsByName(name)) {
      throw new ConflictException(Message.VOCABULARY_NAME_TAKEN)
    }

    return this.vocabularyRepository.create({ name })
  }

  public async remove(id: string) {
    const vocabulary = await this.vocabularyRepository.getById(id)

    const cards = await this.cardRepository.getByIds(vocabulary.cards)

    const meaningsIds = cards.reduce((ids, { meanings }) =>
      [...ids, ...meanings], [])

    await this.meaningRepository.removeByIds(meaningsIds)

    await this.cardRepository.removeByIds(vocabulary.cards)

    await vocabulary.remove()

    return {
      vocabularyId: id
    }
  }
}
