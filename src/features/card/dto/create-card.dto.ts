import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Example } from '../../../infrastructure/swagger/examples'

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'theatre',
    description: 'word to use in card',
  })
  wordName: string

  @IsMongoId()
  @ApiProperty({
    example: Example.MONGO_ID,
    description: '_id of vocabulary to add card to',
  })
  vocabularyId: string
}
