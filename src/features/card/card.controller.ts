import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { RemoveCardParams } from './params/remove-card.params'

@Controller('cards')
export class CardController {
  public constructor(
    private readonly service: CardService
  ) {}

  @Post()
  public create(@Body() dto: CreateCardDto) {
    return this.service.create(dto)
  }

  @Delete(':id')
  public remove(@Param() params: RemoveCardParams) {
    return this.service.remove(params.id)
  }
}
