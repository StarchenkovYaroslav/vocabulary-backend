import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MeaningService } from './meaning.service'
import { CreateMeaningDto } from './dto/create-meaning.dto'
import { AddTranslationDto } from './dto/add-translation.dto'
import { RemoveTranslationDto } from './dto/remove-translation.dto'
import { EditTranslationDto } from './dto/edit-translation.dto'
import { EditMeaningNameDto } from './dto/edit-meaning-name.dto'
import { RemoveMeaningParams } from './params/remove-meaning.params'
import { AddTranslationParams } from './params/add-translation.params'
import { RemoveTranslationParams } from './params/remove-translation.params'
import { EditTranslationParams } from './params/edit-translation.params'
import { EditMeaningNameParams } from './params/edit-meaning-name.params'
import { CreateMeaningResponse } from './response/create-meaning.response'
import { RemoveMeaningResponse } from './response/remove-meaning.response'
import { AddTranslationResponse } from './response/add-translation.response'
import { RemoveTranslationResponse } from './response/remove-translation.response'
import { EditTranslationResponse } from './response/edit-translation-response'
import { EditMeaningNameResponse } from './response/edit-meaning-name.response'

@Controller('meanings')
@ApiTags('meanings')
export class MeaningController {
  public constructor(private readonly service: MeaningService) {}

  @Post()
  public create(@Body() dto: CreateMeaningDto): Promise<CreateMeaningResponse> {
    return this.service.create(dto)
  }

  @Delete(':id')
  public remove(
    @Param() { id }: RemoveMeaningParams,
  ): Promise<RemoveMeaningResponse> {
    return this.service.remove(id)
  }

  @Patch(':id')
  editName(
    @Param() { id }: EditMeaningNameParams,
    @Body() dto: EditMeaningNameDto,
  ): Promise<EditMeaningNameResponse> {
    return this.service.editName(id, dto)
  }

  @Put(':id/translations')
  public addTranslation(
    @Param() { id }: AddTranslationParams,
    @Body() dto: AddTranslationDto,
  ): Promise<AddTranslationResponse> {
    return this.service.addTranslation(id, dto)
  }

  @Delete(':id/translations')
  public removeTranslation(
    @Param() { id }: RemoveTranslationParams,
    @Body() dto: RemoveTranslationDto,
  ): Promise<RemoveTranslationResponse> {
    return this.service.removeTranslation(id, dto)
  }

  @Patch(':id/translations')
  public editTranslation(
    @Param() { id }: EditTranslationParams,
    @Body() dto: EditTranslationDto,
  ): Promise<EditTranslationResponse> {
    return this.service.editTranslation(id, dto)
  }
}
