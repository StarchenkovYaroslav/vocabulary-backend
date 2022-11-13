import { IsMongoId, IsNotEmpty } from 'class-validator'

export class RemoveCardParams {
  @IsNotEmpty()
  @IsMongoId()
  id: string
}
