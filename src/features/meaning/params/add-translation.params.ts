import { IsMongoId, IsNotEmpty } from 'class-validator'

export class AddTranslationParams {
  @IsNotEmpty()
  @IsMongoId()
  id: string
}
