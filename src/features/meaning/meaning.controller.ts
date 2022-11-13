import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common'
import { MeaningService } from './meaning.service'
import { CreateMeaningDto } from './dto/create-meaning.dto'
import { AddTranslationDto } from './dto/add-translation.dto'
import { RemoveTranslationDto } from './dto/remove-translation.dto'
import { RemoveMeaningParams } from './params/remove-meaning.params'
import { AddTranslationParams } from './params/add-translation.params'
import { RemoveTranslationParams } from './params/remove-translation.params'

@Controller('meanings')
export class MeaningController {
  public constructor(
    private readonly service: MeaningService
  ) {}

  @Post()
  public create(@Body() dto: CreateMeaningDto) {
    return this.service.create(dto)
  }

  @Delete(':id')
  public remove(@Param() params: RemoveMeaningParams) {
    return this.service.remove(params.id)
  }

  @Put(':id/translations')
  public addTranslation(
    @Param() params: AddTranslationParams,
    @Body() dto: AddTranslationDto,
  ) {
    return this.service.addTranslation(params.id, dto)
  }

  @Delete(':id/translations')
  public removeTranslation(
    @Param() params: RemoveTranslationParams,
    @Body() dto: RemoveTranslationDto,
  ) {
    return this.service.removeTranslation(params.id, dto)
  }
}
