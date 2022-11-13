import { IsMongoId, IsNotEmpty } from 'class-validator'

export class RemoveTranslationParams {
  @IsNotEmpty()
  @IsMongoId()
  id: string
}
