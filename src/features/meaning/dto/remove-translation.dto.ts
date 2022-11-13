import { IsMongoId, IsNotEmpty } from 'class-validator'

export class RemoveTranslationDto {
  @IsNotEmpty()
  @IsMongoId()
  translationId: string
}
