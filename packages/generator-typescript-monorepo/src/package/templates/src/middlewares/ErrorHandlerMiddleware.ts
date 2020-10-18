import { Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers'
import { Inject } from 'typedi'
import { ConfigService } from '../services/ConfigService'
import { log } from 'log9'

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  @Inject() private config!: ConfigService

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public error(error: Error, request: Request, response: Response, next: (err?: any) => any) {
    let statusCode: number
    let json: any
    const isDev = this.config.config.env === 'development'
    if (error instanceof HttpError) {
      statusCode = error.httpCode
      json = {
        error: true,
        name: error.name,
        status: statusCode,
        message: error.message,
      }
    } else {
      statusCode = 500
      json = {
        error: true,
        name: error.name,
        status: statusCode,
        message: '内部错误',
        internalMessage: isDev ? error.message : undefined,
        internalStack: isDev ? error.stack : undefined,
      }
      log.error(error)
    }
    response.status(statusCode)
    response.json(json)
  }
}
