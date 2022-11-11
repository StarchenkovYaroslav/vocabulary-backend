import { IsNotEmpty, IsString } from 'class-validator'

export class CreateVocabularyDto {
  @IsNotEmpty()
  @IsString()
  name: string
}
