import 'es6-shim'
import 'reflect-metadata'

import { Container } from 'typedi'
import { log } from 'log9'
import { HttpServerService } from './services/HttpServerService'

const httpServerManager = Container.get(HttpServerService)
;(async () => {
  const address = await httpServerManager.listen()
  log.info(`HttpServer listened on http://${address}`)
})().catch(err => {
  log.error(err)
})
