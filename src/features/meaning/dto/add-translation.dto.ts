import { IsNotEmpty, IsString } from 'class-validator'

export class AddTranslationDto {
  @IsNotEmpty()
  @IsString()
  translationName: string
}
