import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { VocabularyService } from './vocabulary.service'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'
import { EditVocabularyNameDto } from './dto/edit-vocabulary-name.dto'
import { RemoveVocabularyParams } from './params/remove-vocabulary.params'
import { GetVocabularyByIdParams } from './params/get-vocabulary-by-id.params'
import { EditVocabularyNameParams } from './params/edit-vocabulary-name.params'
import { CreateVocabularyResponse } from './response/create-vocabulary.response'
import { RemoveVocabularyResponse } from './response/remove-vocabulary.response'
import { EditVocabularyNameResponse } from './response/edit-vocabulary-name.response'

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

  @Patch(':id')
  public editName(
    @Param() { id }: EditVocabularyNameParams,
    @Body() dto: EditVocabularyNameDto,
  ): Promise<EditVocabularyNameResponse> {
    return this.service.editName(id, dto)
  }

  @Get(':id')
  public getById(@Param() { id }: GetVocabularyByIdParams) {
    return this.service.getById(id)
  }
}
