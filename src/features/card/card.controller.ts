import { Body, Controller, Post } from '@nestjs/common'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'

@Controller('cards')
export class CardController {
  public constructor(
    private readonly service: CardService
  ) {}

  @Post()
  public create(@Body() dto: CreateCardDto) {
    return this.service.create(dto)
  }
}
