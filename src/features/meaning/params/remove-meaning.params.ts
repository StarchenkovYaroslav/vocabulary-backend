import { IsMongoId } from 'class-validator'

export class RemoveMeaningParams {
  @IsMongoId()
  id: string
}
