import { Provider } from '@nestjs/common'
import {
  DotEnvConfiguration,
  EnvConfiguration,
  AbstractConfiguration as Configuration,
} from '@solid-soda/config'
import * as path from 'path'

const isDev = () => process.env.NODE_ENV === 'development'

export class ConfigurationFactory {
  public static create(): Configuration {
    if (isDev()) {
      return new DotEnvConfiguration(path.resolve(__dirname, '../../.env.dev'))
    }

    return new EnvConfiguration()
  }

  public static provider(): Provider {
    return {
      provide: Configuration,
      useValue: ConfigurationFactory.create(),
    }
  }
}

export { Configuration }
