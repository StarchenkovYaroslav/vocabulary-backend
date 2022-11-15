import { IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Example } from '../../../infrastructure/swagger/examples'

export class RemoveMeaningParams {
  @IsMongoId()
  @ApiProperty({
    example: Example.MONGO_ID,
    description: '_id of meaning to remove',
  })
  id: string
}
