import { IsMongoId, IsNotEmpty } from 'class-validator'

export class CreateMeaningDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsMongoId()
  cardId: string
}
