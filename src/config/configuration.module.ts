import { Module } from '@nestjs/common'

import { ConfigurationFactory } from './configuration-factory'

const configProvider = ConfigurationFactory.provider()

@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class ConfigurationModule {}
