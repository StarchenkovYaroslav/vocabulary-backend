import { Injectable } from '@nestjs/common'
import { VocabularyRepository } from './vocabulary.repository'
import { VocabularyDocument } from './vocabulary.schema'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'

@Injectable()
export class VocabularyService {
  public constructor(
    private readonly vocabularyRepository: VocabularyRepository
  ) {}

  public async create(dto: CreateVocabularyDto): Promise<VocabularyDocument> {
    return this.vocabularyRepository.create(dto)
  }
}
