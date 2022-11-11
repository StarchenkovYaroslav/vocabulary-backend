import { Body, Controller, Post } from '@nestjs/common'
import { VocabularyService } from './vocabulary.service'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'
import { ValidationPipe } from '../../pipes/validation.pipe'

@Controller('vocabularies')
export class VocabularyController {
  public constructor(
    private readonly service: VocabularyService
  ) {}

  @Post()
  public create(@Body(new ValidationPipe()) dto: CreateVocabularyDto) {
    return this.service.create(dto)
  }
}
