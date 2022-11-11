import { Body, Controller, Post } from '@nestjs/common'
import { MeaningService } from './meaning.service'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { CreateMeaningDto } from './dto/create-meaning.dto'
import { AddTranslationDto } from './dto/add-translation.dto'

@Controller('meanings')
export class MeaningController {
  public constructor(
    private readonly service: MeaningService
  ) {}

  @Post()
  public create(@Body(new ValidationPipe()) dto: CreateMeaningDto) {
    return this.service.create(dto)
  }

  @Post('add-translation')
  public addTranslation(@Body(new ValidationPipe()) dto: AddTranslationDto) {
    return this.service.addTranslation(dto)
  }
}
