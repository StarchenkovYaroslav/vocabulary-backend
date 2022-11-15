import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
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
}
