import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Message } from '../../constants/messages'
import { Vocabulary, VocabularyDocument } from './vocabulary.schema'

interface CreationData {
  name: string
}

@Injectable()
export class VocabularyRepository {
  public constructor(
    @InjectModel(Vocabulary.name) private model: Model<VocabularyDocument>,
  ) {}

  public async create(data: CreationData): Promise<VocabularyDocument> {
    return this.model.create(data)
  }

  public async getById(
    id: Types.ObjectId | string,
  ): Promise<VocabularyDocument> {
    return this.model
      .findById(id)
      .orFail(new NotFoundException(Message.VOCABULARY_NOT_FOUND))
  }

  public async getByIdPopulated(
    id: Types.ObjectId | string,
  ): Promise<VocabularyDocument> {
    return this.model
      .findById(id)
      .populate({
        path: 'cards',
        populate: {
          path: 'word meanings',
          populate: {
            path: 'translations',
          },
        },
      })
      .orFail(new NotFoundException(Message.VOCABULARY_NOT_FOUND))
  }

  public async edit(
    id: Types.ObjectId | string,
    data: Partial<Vocabulary>,
  ): Promise<VocabularyDocument> {
    return this.model
      .findByIdAndUpdate(id, data, { new: true })
      .orFail(new NotFoundException(Message.VOCABULARY_NOT_FOUND))
  }

  public async existsByName(
    name: string,
  ): Promise<{ _id: Types.ObjectId } | null> {
    return this.model.exists({ name })
  }

  public async addCard(
    vocabularyId: Types.ObjectId | string,
    cardId: Types.ObjectId | string,
  ): Promise<VocabularyDocument> {
    return this.model
      .findByIdAndUpdate(
        vocabularyId,
        { $push: { cards: cardId } },
        { new: true },
      )
      .orFail(new NotFoundException(Message.VOCABULARY_NOT_FOUND))
  }

  public async removeCard(
    vocabularyId: Types.ObjectId | string,
    cardId: Types.ObjectId | string,
  ): Promise<VocabularyDocument> {
    return this.model
      .findByIdAndUpdate(
        vocabularyId,
        { $pull: { cards: cardId } },
        { new: true },
      )
      .orFail(new NotFoundException(Message.VOCABULARY_NOT_FOUND))
  }
}
