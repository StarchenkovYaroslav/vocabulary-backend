import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { MeaningService } from './meaning.service'
import { CreateMeaningDto } from './dto/create-meaning.dto'
import { AddTranslationDto } from './dto/add-translation.dto'
import { RemoveTranslationDto } from './dto/remove-translation.dto'
import { RemoveMeaningParams } from './params/remove-meaning.params'

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

  // TODO: move MeaningId from body to params
  @Post('add-translation')
  public addTranslation(@Body() dto: AddTranslationDto) {
    return this.service.addTranslation(dto)
  }

  // TODO: move MeaningId from body to params
  @Post('remove-translation')
  public removeTranslation(@Body() dto: RemoveTranslationDto) {
    return this.service.removeTranslation(dto)
  }
}
