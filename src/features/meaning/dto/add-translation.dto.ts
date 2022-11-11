import { IsMongoId, IsNotEmpty } from 'class-validator'

export class AddTranslationDto {
  @IsNotEmpty()
  translationName: string

  @IsNotEmpty()
  @IsMongoId()
  meaningId: string
}
