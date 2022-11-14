import { IsMongoId } from 'class-validator'

export class RemoveTranslationDto {
  @IsMongoId()
  translationId: string
}
