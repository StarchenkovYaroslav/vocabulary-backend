import { IsMongoId } from 'class-validator'

export class AddTranslationParams {
  @IsMongoId()
  id: string
}
