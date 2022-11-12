import { IsMongoId, IsNotEmpty } from 'class-validator'

export class RemoveMeaningParams {
  @IsNotEmpty()
  @IsMongoId()
  id: string
}
