import { IsMongoId } from 'class-validator'

export class RemoveTranslationParams {
  @IsMongoId()
  id: string
}
