import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import * as mongoose from 'mongoose'
import { Word } from '../word/word.schema'

export type TranslationDocument = HydratedDocument<Translation>

@Schema()
export class Translation {
  @Prop({ isRequired: true, unique: true })
  name: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }] })
  words: Types.ObjectId[]
}

export const TranslationSchema = SchemaFactory.createForClass(Translation)
