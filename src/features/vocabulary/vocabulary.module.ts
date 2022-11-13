import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Vocabulary, VocabularySchema } from './vocabulary.schema'
import { Card, CardSchema } from '../card/card.schema'
import { Meaning, MeaningSchema } from '../meaning/meaning.schema'
import { VocabularyController } from './vocabulary.controller'
import { VocabularyService } from './vocabulary.service'
import { VocabularyRepository } from './vocabulary.repository'
import { CardRepository } from '../card/card.repository'
import { MeaningRepository } from '../meaning/meaning.repository'

@Module({
  imports: [
    MongooseModule.forFeature(
    [
      { name: Vocabulary.name, schema: VocabularySchema },
      { name: Card.name, schema: CardSchema },
      { name: Meaning.name, schema: MeaningSchema },
    ]
    )
  ],
  controllers: [VocabularyController],
  providers: [
    VocabularyService,
    VocabularyRepository,
    CardRepository,
    MeaningRepository,
  ],
})
export class VocabularyModule {}
