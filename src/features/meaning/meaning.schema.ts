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
  card: mongoose.Types.ObjectId

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Translation' }] })
  translations: mongoose.Types.ObjectId[]
}

export const MeaningSchema = SchemaFactory.createForClass(Meaning)
