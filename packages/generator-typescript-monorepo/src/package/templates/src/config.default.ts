import { ConfigService } from './services/ConfigService'

const config: ConfigService['config'] = {
  httpServer: {
    host: '0.0.0.0',
    port: 3001,
    allowOrigins: [/.*/],
  },
  secret: {
    session: 'string',
  },
  env: 'development',
}

module.exports = config
