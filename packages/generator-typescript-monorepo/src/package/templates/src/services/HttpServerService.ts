import bodyParser = require('body-parser')
import express = require('express')
import morgan = require('morgan')
import * as path from 'path'
import { useContainer, useExpressServer } from 'routing-controllers'
import { Container, Service } from 'typedi'
import { ConfigService } from '../services/ConfigService'

@Service()
export class HttpServerService {
  public app: express.Application
  private config: any

  constructor(cfg: ConfigService) {
    this.config = cfg.config.httpServer
    this.app = express()
    this.app.use('/assets', express.static(path.join(__dirname, '..', 'assets')))
    this.app.use(morgan('combined'))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    this.app.use(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('cookie-session')({
        name: 's',
        keys: [cfg.config.secret.session],
        maxAge: 15 * 24 * 60 * 60 * 1000,
      }),
    )
    this.app.set('view engine', 'pug')
    const viewsRoot = path.join(__dirname, '..', 'views')
    this.app.locals = { basedir: viewsRoot }
    this.app.set('views', viewsRoot)
    useContainer(Container)
    useExpressServer(this.app, {
      controllers: [path.join(__dirname, '..', '/routes/*Route.*')],
      middlewares: [path.join(__dirname, '..', '/middlewares/*Middleware.*')],
      interceptors: [path.join(__dirname, '', '/interceptor/*Interceptor.*')],
      defaultErrorHandler: false,
      routePrefix: '/api',
    })
  }

  public listen(): Promise<string> {
    const config = this.config
    return new Promise<string>((resolve, reject) => {
      try {
        this.app.listen(config.port, config.host, () => {
          resolve(`${config.host}:${config.port}`)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}
