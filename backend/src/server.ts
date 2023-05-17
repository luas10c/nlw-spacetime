import fastify from 'fastify'

import { prisma } from './database'

async function bootstrap() {
  const app = fastify()

  app.get('/', async (request) => {
    const data = await prisma.user.findMany()

    return data
  })

  const url = await app.listen({ port: 7000, host: '0.0.0.0' })
  console.log(url)
}

bootstrap()
