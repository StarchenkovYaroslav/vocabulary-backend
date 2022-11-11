import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'
import { Word } from '../word/word.schema'
import { Meaning } from '../meaning/meaning.schema'
import { Vocabulary } from '../vocabulary/vocabulary.schema'

export type CardDocument = HydratedDocument<Card>

@Schema()
export class Card {
  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'Word',
    isRequired: true,
  })
  word: Word

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary',
    isRequired: true,
  })
  vocabulary: Vocabulary

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meaning' }] })
  meanings: Meaning[]
}

export const CardSchema = SchemaFactory.createForClass(Card)
