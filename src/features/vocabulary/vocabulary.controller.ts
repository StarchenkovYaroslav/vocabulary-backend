import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { VocabularyService } from './vocabulary.service'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'
import { RemoveVocabularyParams } from './params/remove-vocabulary.params'

@Controller('vocabularies')
export class VocabularyController {
  public constructor(
    private readonly service: VocabularyService
  ) {}

  @Post()
  public create(@Body() dto: CreateVocabularyDto) {
    return this.service.create(dto)
  }

  @Delete(':id')
  public remove(@Param() params: RemoveVocabularyParams) {
    return this.service.remove(params.id)
  }
}
