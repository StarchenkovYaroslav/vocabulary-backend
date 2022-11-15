import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Example } from '../../../infrastructure/swagger/examples'

export class CreateMeaningDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Значение 1',
    description: 'name of meaning to create',
  })
  name: string

  @IsMongoId()
  @ApiProperty({
    example: Example.MONGO_ID,
    description: '_id of card to add meaning to',
  })
  cardId: string
}
