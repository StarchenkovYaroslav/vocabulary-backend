import { Body, Controller, Post } from '@nestjs/common'
import { VocabularyService } from './vocabulary.service'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'

@Controller('vocabularies')
export class VocabularyController {
  public constructor(
    private readonly service: VocabularyService
  ) {}

  @Post()
  public create(@Body() dto: CreateVocabularyDto) {
    return this.service.create(dto)
  }
}
