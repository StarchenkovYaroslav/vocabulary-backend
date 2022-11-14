import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  wordName: string

  @IsMongoId()
  vocabularyId: string
}
