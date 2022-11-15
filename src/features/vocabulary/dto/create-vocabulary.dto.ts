import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateVocabularyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'words from my first book',
    description: 'name of vocabulary to create',
  })
  name: string
}
