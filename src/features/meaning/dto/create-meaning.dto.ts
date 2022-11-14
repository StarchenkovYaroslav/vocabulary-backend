import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateMeaningDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsMongoId()
  cardId: string
}
