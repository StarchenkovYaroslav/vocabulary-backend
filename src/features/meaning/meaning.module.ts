import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MeaningController } from './meaning.controller'
import { MeaningService } from './meaning.service'
import { Card, CardSchema } from '../card/card.schema'
import { Meaning, MeaningSchema } from './meaning.schema'
import { Word, WordSchema } from '../word/word.schema'
import {
  Translation,
  TranslationSchema,
} from '../translation/translation.schema'
import { MeaningRepository } from './meaning.repository'
import { CardRepository } from '../card/card.repository'
import { TranslationRepository } from '../translation/translation.repository'
import { WordRepository } from '../word/word.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Meaning.name, schema: MeaningSchema },
      { name: Card.name, schema: CardSchema },
      { name: Translation.name, schema: TranslationSchema },
      { name: Word.name, schema: WordSchema },
    ]),
  ],
  controllers: [MeaningController],
  providers: [
    MeaningService,
    MeaningRepository,
    CardRepository,
    TranslationRepository,
    WordRepository,
  ],
})
export class MeaningModule {}
