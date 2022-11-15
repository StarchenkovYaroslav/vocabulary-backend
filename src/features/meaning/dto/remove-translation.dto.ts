import { IsMongoId } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Example } from '../../../infrastructure/swagger/examples'

export class RemoveTranslationDto {
  @IsMongoId()
  @ApiProperty()
  @ApiProperty({
    example: Example.MONGO_ID,
    description: '_id of translation to remove from meaning',
  })
  translationId: string
}
