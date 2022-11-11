import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Vocabulary, VocabularySchema } from './vocabulary.schema'
import { VocabularyController } from './vocabulary.controller'
import { VocabularyService } from './vocabulary.service'
import { VocabularyRepository } from './vocabulary.repository'

@Module({
  imports: [
    MongooseModule.forFeature(
    [{ name: Vocabulary.name, schema: VocabularySchema }]
    )
  ],
  controllers: [VocabularyController],
  providers: [VocabularyService, VocabularyRepository],
})
export class VocabularyModule {}
