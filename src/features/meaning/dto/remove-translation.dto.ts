import { IsMongoId, IsNotEmpty } from 'class-validator'

export class RemoveTranslationDto {
  @IsNotEmpty()
  @IsMongoId()
  meaningId: string

  @IsNotEmpty()
  @IsMongoId()
  translationId: string
}
