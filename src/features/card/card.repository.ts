import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Message } from '../../constants/messages'
import { Model, Types } from 'mongoose'
import { Card, CardDocument } from './card.schema'

interface CreationData {
  word: Types.ObjectId | string,
  vocabulary: Types.ObjectId | string,
}

@Injectable()
export class CardRepository {
  public constructor(
    @InjectModel(Card.name) private model: Model<CardDocument>
  ) {}

  public async create(data: CreationData): Promise<CardDocument> {
    return this.model.create(data)
  }

  public async getById(id: Types.ObjectId | string): Promise<CardDocument> {
    return this.model.findById(id)
      .orFail(new NotFoundException(Message.CARD_NOT_FOUND))
  }

  public async getByIds(ids: Types.ObjectId[] | string[]): Promise<CardDocument[]> {
    return this.model.find({ id: { $in: ids }})
  }

  public async removeByIds(ids: Types.ObjectId[] | string[]): Promise<void> {
    await this.model.deleteMany({ _id: { $in: ids } })
  }

  public async addMeaning(
    cardId: Types.ObjectId | string,
    meaningId: Types.ObjectId | string,
  ): Promise<CardDocument> {
    return  this.model.findByIdAndUpdate(
      cardId,
      { $push: { meanings: meaningId } },
      { new: true }
      )
      .orFail(new NotFoundException(Message.CARD_NOT_FOUND))
  }

  public async removeMeaning(
    cardId: Types.ObjectId | string,
    meaningId: Types.ObjectId | string,
  ): Promise<CardDocument> {
    return  this.model.findByIdAndUpdate(
      cardId,
      { $pull: { meanings: meaningId } },
      { new: true },
      )
      .orFail(new NotFoundException(Message.CARD_NOT_FOUND))
  }
}
