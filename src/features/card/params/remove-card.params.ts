import { IsMongoId } from 'class-validator'

export class RemoveCardParams {
  @IsMongoId()
  id: string
}
