import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Message } from '../../constants/messages'
import { Translation, TranslationDocument } from './translation.schema'

interface CreationData {
  name: string
}

@Injectable()
export class TranslationRepository {
  public constructor(
    @InjectModel(Translation.name) private model: Model<TranslationDocument>,
  ) {}

  public async create(data: CreationData): Promise<TranslationDocument> {
    return this.model.create(data)
  }

  public async getByNameOrNull(
    name: string,
  ): Promise<TranslationDocument | null> {
    return this.model.findOne({ name })
  }

  public async addWord(
    translationId: Types.ObjectId | string,
    wordId: Types.ObjectId | string,
  ): Promise<TranslationDocument> {
    return this.model
      .findByIdAndUpdate(
        translationId,
        { $push: { words: wordId } },
        { new: true },
      )
      .orFail(new NotFoundException(Message.TRANSLATION_NOT_FOUND))
  }
}
