import * as fs from 'fs'
import * as path from 'path'
import { Service } from 'typedi'
import { log } from 'log9'

@Service()
export class ConfigService {
  public config: {
    httpServer: {
      host: string
      port: number
      allowOrigins: RegExp[]
    }
    secret: {
      session: string
    }
    env: 'development' | 'production'
  }

  constructor() {
    const configFiles = [
      process.env.CONFIG_FILE,
      path.join(process.cwd(), 'config.js'),
      path.join(process.cwd(), 'config.default.js'),
      path.join(__dirname, '..', 'config.js'),
      path.join(__dirname, '..', 'config.default.js'),
      path.join(__dirname, '..', '..', 'config.js'),
      path.join(__dirname, '..', '..', 'config.default.js'),
    ]
    for (const file of configFiles) {
      if (file && fs.existsSync(file)) {
        this.config = require(file)
        this.transformConfig()
        return
      }
    }

    log.error('No config file found! Tried: \n', configFiles.join('\n'))
    process.exit(1)
  }

  private transformConfig() {
    return
  }
}
