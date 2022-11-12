import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Vocabulary, VocabularyDocument } from './vocabulary.schema'

interface CreationData {
  name: string,
}

@Injectable()
export class VocabularyRepository {
  public constructor(
    @InjectModel(Vocabulary.name) private model: Model<VocabularyDocument>
  ) {}

  public async create(data: CreationData): Promise<VocabularyDocument> {
    return this.model.create(data)
  }

  public async addCard(
    vocabularyId: Types.ObjectId | string,
    cardId: Types.ObjectId | string
  ): Promise<void> {
    await this.model.findByIdAndUpdate(vocabularyId, {
      $push: { cards: cardId }
    })
  }
}