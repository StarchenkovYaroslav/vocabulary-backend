import { IsMongoId, IsNotEmpty } from 'class-validator'

export class RemoveVocabularyParams {
  @IsNotEmpty()
  @IsMongoId()
  id: string
}
