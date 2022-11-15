import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { Translation } from '../translation/translation.schema'
import mongoose from 'mongoose'

export type WordDocument = HydratedDocument<Word>

@Schema()
export class Word {
  @Prop({ isRequired: true, unique: true })
  name: string

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Translation' }],
  })
  translations: Types.ObjectId[]
}

export const WordSchema = SchemaFactory.createForClass(Word)
