import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { RemoveCardParams } from './params/remove-card.params'
import { CreateCardResponse } from './response/create-card.response'
import { RemoveCardResponse } from './response/remove-card.response'

@Controller('cards')
@ApiTags('cards')
export class CardController {
  public constructor(private readonly service: CardService) {}

  @Post()
  public create(@Body() dto: CreateCardDto): Promise<CreateCardResponse> {
    return this.service.create(dto)
  }

  @Delete(':id')
  public remove(
    @Param() { id }: RemoveCardParams,
  ): Promise<RemoveCardResponse> {
    return this.service.remove(id)
  }
}
