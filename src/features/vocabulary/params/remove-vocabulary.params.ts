import { IsMongoId } from 'class-validator'

export class RemoveVocabularyParams {
  @IsMongoId()
  id: string
}
