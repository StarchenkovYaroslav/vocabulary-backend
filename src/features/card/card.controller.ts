import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { EditWordDto } from './dto/edit-word.dto'
import { RemoveCardParams } from './params/remove-card.params'
import { EditWordParams } from './params/edit-word.params'
import { CreateCardResponse } from './response/create-card.response'
import { RemoveCardResponse } from './response/remove-card.response'
import { EditWordResponse } from './response/edit-word.response'

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

  @Patch(':id/word')
  public editWord(
    @Param() { id }: EditWordParams,
    @Body() dto: EditWordDto,
  ): Promise<EditWordResponse> {
    return this.service.editWord(id, dto)
  }
}
