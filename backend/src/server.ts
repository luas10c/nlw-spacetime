import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'

async function bootstrap() {
  const app = fastify()

  await app.register(jwt, {
    secret: 'spacetime',
    sign: {
      expiresIn: '1h'
    }
  })

  await app.register(cors, {
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })

  await app.register(authRoutes)
  await app.register(memoriesRoutes)

  const url = await app.listen({ port: 7000, host: '0.0.0.0' })
  console.log(`🚀 HTTP server running on ${url}`)
}

bootstrap()
