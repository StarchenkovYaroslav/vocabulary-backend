import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Example } from '../../../infrastructure/swagger/examples'

export class EditTranslationDto {
  @IsMongoId()
  @ApiProperty()
  @ApiProperty({
    example: Example.MONGO_ID,
    description: '_id of translation to change',
  })
  translationId: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Новый перевод',
    description: 'new translation of word to change for',
  })
  translationName: string
}
