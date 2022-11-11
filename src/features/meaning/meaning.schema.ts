import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import mongoose from 'mongoose'
import { Translation } from '../translation/translation.schema'
import { Card } from '../card/card.schema'

export type MeaningDocument = HydratedDocument<Meaning>

@Schema()
export class Meaning {
  @Prop({ isRequired: true })
  name: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'Card',
    isRequired: true,
  })
  card: Card | mongoose.Schema.Types.ObjectId

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Translation' }] })
  translations: Translation[]
}

export const MeaningSchema = SchemaFactory.createForClass(Meaning)
