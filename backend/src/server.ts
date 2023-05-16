import fastify from 'fastify'

async function bootstrap() {
  const app = fastify()

  app.get('/', (request) => {
    return {
      message: 'Hello'
    }
  })

  const url = await app.listen({ port: 7000, host: '0.0.0.0' })
  console.log(url)
}

bootstrap()
