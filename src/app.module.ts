import { Module } from '@nestjs/common'
import { DbModule } from './db'
import { VocabularyModule } from './features/vocabulary/vocabulary.module'
import { CardModule } from './features/card/card.module'
import { MeaningModule } from './features/meaning/meaning.module'

@Module({
  imports: [DbModule, VocabularyModule, CardModule, MeaningModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
