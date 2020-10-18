import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { Inject } from 'typedi'
import { ConfigService } from '../services/ConfigService'

@Middleware({ type: 'before' })
export class CorsMiddleware implements ExpressMiddlewareInterface {
  @Inject() private conf!: ConfigService

  public use(req: any, res: any, next?: (err?: any) => any): any {
    const origin = req.header('Origin')
    if (origin) {
      this.conf.config.httpServer.allowOrigins.forEach(value => {
        if (value.exec(origin)) {
          res.set({
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': req.header('Access-Control-Request-Headers'),
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, PATCH',
          })
        }
      })
    }
    next && next()
  }
}
