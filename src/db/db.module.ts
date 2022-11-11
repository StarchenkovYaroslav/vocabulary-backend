import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigurationModule } from '../config'
import { DbOptionsFactory } from './db-options-factory'



@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useClass: DbOptionsFactory,
    }),
  ],
})
export class DbModule {}
