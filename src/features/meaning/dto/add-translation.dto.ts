import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddTranslationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Перевод',
    description: 'translation of word to add to meaning',
  })
  translationName: string
}
