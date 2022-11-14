import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common'
import { MeaningService } from './meaning.service'
import { CreateMeaningDto } from './dto/create-meaning.dto'
import { AddTranslationDto } from './dto/add-translation.dto'
import { RemoveTranslationDto } from './dto/remove-translation.dto'
import { RemoveMeaningParams } from './params/remove-meaning.params'
import { AddTranslationParams } from './params/add-translation.params'
import { RemoveTranslationParams } from './params/remove-translation.params'
import { CreateMeaningResponse } from './response/create-meaning.response'
import { RemoveMeaningResponse } from './response/remove-meaning.response'
import { AddTranslationResponse } from './response/add-translation.response'
import { RemoveTranslationResponse } from './response/remove-translation.response'

@Controller('meanings')
export class MeaningController {
  public constructor(
    private readonly service: MeaningService
  ) {}

  @Post()
  public create(@Body() dto: CreateMeaningDto): Promise<CreateMeaningResponse> {
    return this.service.create(dto)
  }

  @Delete(':id')
  public remove(@Param() { id }: RemoveMeaningParams): Promise<RemoveMeaningResponse> {
    return this.service.remove(id)
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
}
