import { IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Example } from '../../../infrastructure/swagger/examples'

export class EditWordParams {
  @IsMongoId()
  @ApiProperty({
    example: Example.MONGO_ID,
    description: '_id of card to edit word in',
  })
  id: string
}
