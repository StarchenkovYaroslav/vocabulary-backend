import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Message } from '../../constants/messages'
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

  public async getById(id: Types.ObjectId | string): Promise<VocabularyDocument> {
    return this.model.findById(id)
      .orFail(new NotFoundException(Message.VOCABULARY_NOT_FOUND))
  }

  public async addCard(
    vocabularyId: Types.ObjectId | string,
    cardId: Types.ObjectId | string
  ): Promise<VocabularyDocument> {
    return this.model.findByIdAndUpdate(
      vocabularyId,
      { $push: { cards: cardId } },
      { new: true }
      )
      .orFail(new NotFoundException(Message.VOCABULARY_NOT_FOUND))
  }

  public async removeCard(
    vocabularyId: Types.ObjectId | string,
    cardId: Types.ObjectId | string
  ): Promise<VocabularyDocument> {
    return this.model.findByIdAndUpdate(
      vocabularyId,
      { $pull: { cards: cardId } },
      { new: true }
      )
      .orFail(new NotFoundException(Message.VOCABULARY_NOT_FOUND))
  }
}
