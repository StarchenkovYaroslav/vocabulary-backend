import { Inject, Injectable } from '@nestjs/common'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import { Configuration } from '../config'

@Injectable()
export class DbOptionsFactory implements MongooseOptionsFactory {
  public constructor(
    @Inject(Configuration) private readonly config: Configuration,
  ) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.config.getOrElse(
        'DB_ADDRESS',
        'mongodb://localhost:27017/vocabulary',
      ),
    }
  }
}
