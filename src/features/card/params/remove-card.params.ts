import { IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Example } from '../../../infrastructure/swagger/examples'

export class RemoveCardParams {
  @IsMongoId()
  @ApiProperty({
    example: Example.MONGO_ID,
    description: '_id of card to remove',
  })
  id: string
}
