import { Injectable } from '@nestjs/common'
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

  public async create(dto: CreateVocabularyDto): Promise<VocabularyDocument> {
    return this.vocabularyRepository.create(dto)
  }

  public async remove(id: string) {
    const vocabulary = await this.vocabularyRepository.getById(id)

    // TODO: handle
    if (!vocabulary) throw new Error('no vocabulary')

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
