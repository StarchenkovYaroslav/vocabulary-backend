import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { VocabularyService } from './vocabulary.service'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'
import { RemoveVocabularyParams } from './params/remove-vocabulary.params'
import { CreateVocabularyResponse } from './response/create-vocabulary.response'
import { RemoveVocabularyResponse } from './response/remove-vocabulary.response'
import { GetVocabularyByIdParams } from './params/get-vocabulary-by-id.params'

@Controller('vocabularies')
@ApiTags('vocabularies')
export class VocabularyController {
  public constructor(private readonly service: VocabularyService) {}

  @Post()
  public create(
    @Body() dto: CreateVocabularyDto,
  ): Promise<CreateVocabularyResponse> {
    return this.service.create(dto)
  }

  @Delete(':id')
  public remove(
    @Param() { id }: RemoveVocabularyParams,
  ): Promise<RemoveVocabularyResponse> {
    return this.service.remove(id)
  }

  @Get(':id')
  public getById(
    @Param() { id }: GetVocabularyByIdParams,
  ) {
    return this.service.getById(id)
  }
}
