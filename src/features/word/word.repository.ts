import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Message } from '../../constants/messages'
import { Model, Types } from 'mongoose'
import { Word, WordDocument } from './word.schema'

interface CreationData {
  name: string,
}

@Injectable()
export class WordRepository {
  public constructor(
    @InjectModel(Word.name) private model: Model<WordDocument>
  ) {}

  public async create(data: CreationData): Promise<WordDocument> {
    return this.model.create(data)
  }

  public async existsByName(name: string) {
    return this.model.exists({ name })
  }

  public async addTranslation(
    wordId: Types.ObjectId | string,
    translationId: Types.ObjectId | string,
  ): Promise<WordDocument> {
    return this.model.findByIdAndUpdate(
      wordId,
      { $push: { translations: translationId } },
      { new: true }
      )
      .orFail(new NotFoundException(Message.WORD_NOT_FOUND))
  }
}
