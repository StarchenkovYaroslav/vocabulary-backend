import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const path = 'api'

const config = new DocumentBuilder()
  .setTitle('vocabulary')
  .setDescription('words and their translations storage')
  .setVersion('1.0.0')
  .build()

export const swagger = (app: INestApplication): void => {
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(path, app, document)
}
