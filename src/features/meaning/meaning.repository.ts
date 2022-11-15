import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Message } from '../../constants/messages'
import { Model, Types } from 'mongoose'
import { Meaning, MeaningDocument } from './meaning.schema'

interface CreationData {
  name: string
  card: Types.ObjectId | string
}

@Injectable()
export class MeaningRepository {
  public constructor(
    @InjectModel(Meaning.name) private model: Model<MeaningDocument>,
  ) {}

  public async create(data: CreationData): Promise<MeaningDocument> {
    return this.model.create(data)
  }

  public async getById(id: Types.ObjectId | string): Promise<MeaningDocument> {
    return this.model
      .findById(id)
      .orFail(new NotFoundException(Message.MEANING_NOT_FOUND))
  }

  public async getByIds(
    ids: Types.ObjectId[] | string[],
  ): Promise<MeaningDocument[]> {
    return this.model.find({ _id: { $in: ids } })
  }

  public async removeByIds(ids: Types.ObjectId[] | string[]): Promise<void> {
    await this.model.deleteMany({ _id: { $in: ids } })
  }

  public async removeTranslation(
    meaningId: Types.ObjectId | string,
    translationId: Types.ObjectId | string,
  ): Promise<MeaningDocument> {
    return this.model
      .findByIdAndUpdate(
        meaningId,
        { $pull: { translations: translationId } },
        { new: true },
      )
      .orFail(new NotFoundException(Message.MEANING_NOT_FOUND))
  }
}
