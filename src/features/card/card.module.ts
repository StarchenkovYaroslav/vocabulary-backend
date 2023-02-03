import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Card, CardSchema } from './card.schema'
import { Word, WordSchema } from '../word/word.schema'
import { Vocabulary, VocabularySchema } from '../vocabulary/vocabulary.schema'
import { Meaning, MeaningSchema } from '../meaning/meaning.schema'
import {
  Translation,
  TranslationSchema,
} from '../translation/translation.schema'
import { CardRepository } from './card.repository'
import { CardService } from './card.service'
import { CardController } from './card.controller'
import { WordRepository } from '../word/word.repository'
import { VocabularyRepository } from '../vocabulary/vocabulary.repository'
import { MeaningRepository } from '../meaning/meaning.repository'
import { TranslationRepository } from '../translation/translation.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: Word.name, schema: WordSchema },
      { name: Vocabulary.name, schema: VocabularySchema },
      { name: Meaning.name, schema: MeaningSchema },
      { name: Translation.name, schema: TranslationSchema },
    ]),
  ],
  controllers: [CardController],
  providers: [
    CardService,
    CardRepository,
    WordRepository,
    VocabularyRepository,
    MeaningRepository,
    TranslationRepository,
  ],
})
export class CardModule {}
