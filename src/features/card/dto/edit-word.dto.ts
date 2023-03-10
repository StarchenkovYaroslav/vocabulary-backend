import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EditWordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Word',
    description: 'word name to change for',
  })
  wordName: string
}
