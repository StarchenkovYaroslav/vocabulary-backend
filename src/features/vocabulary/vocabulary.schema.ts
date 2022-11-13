import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'
import { Card } from '../card/card.schema'

export type VocabularyDocument = HydratedDocument<Vocabulary>

@Schema()
export class Vocabulary {
  @Prop({ isRequired: true })
  name: string

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  })
  cards: mongoose.Types.ObjectId[]
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary)
