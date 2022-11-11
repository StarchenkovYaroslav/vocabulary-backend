import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
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

  public async getById(id: Types.ObjectId | string): Promise<WordDocument | null> {
    return this.model.findById(id)
  }
}
