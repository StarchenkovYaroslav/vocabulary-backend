import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Message } from '../../constants/messages'
import { Model } from 'mongoose'
import { Translation, TranslationDocument } from './translation.schema'

interface CreationData {
  name: string,
}

@Injectable()
export class TranslationRepository {
  public constructor(
    @InjectModel(Translation.name) private model: Model<TranslationDocument>
  ) {}

  public async create(data: CreationData): Promise<TranslationDocument> {
    return this.model.create(data)
  }

  public async getByName(name: string): Promise<TranslationDocument> {
    return this.model.findOne({ name })
      .orFail(new NotFoundException(Message.TRANSLATION_NOT_FOUND))
  }
}
