import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EditMeaningNameDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Значение 1',
    description: 'name of meaning to change for',
  })
  name: string
}
