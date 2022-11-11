import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
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

  public async getById(id: Types.ObjectId | string): Promise<CardDocument | null> {
    return this.model.findById(id)
  }

  public async addMeaning(
    cardId: Types.ObjectId | string,
    meaningId: Types.ObjectId | string,
  ): Promise<void> {
    await this.model.findByIdAndUpdate(cardId, {
      $push: { meanings: meaningId }
    })
  }
}
