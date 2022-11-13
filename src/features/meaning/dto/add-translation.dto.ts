import { IsNotEmpty } from 'class-validator'

export class AddTranslationDto {
  @IsNotEmpty()
  translationName: string
}
