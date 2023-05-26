import { z } from 'zod'
import type { FastifyInstance } from 'fastify'

import { prisma } from '../database'

export const memoriesRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const data = await prisma.memory.findMany({
      where: {
        userId: request.user.id
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    const memories = data.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...')
      }
    })

    return memories
  })

  app.get('/memories/:id', async (request, reply) => {
    const { id } = z
      .object({
        id: z.string().uuid()
      })
      .parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    })

    if (!memory.isPublic && memory.userId !== request.user.id) {
      return reply.status(401).send()
    }

    return memory
  })

  app.post('/memories', async (request) => {
    const { content, coverUrl, isPublic } = z
      .object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false)
      })
      .parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.id
      }
    })

    return memory
  })

  app.put('/memories/:id', async (request, reply) => {
    try {
      const { id } = z
        .object({
          id: z.string().uuid()
        })
        .parse(request.params)

      const { content, coverUrl, isPublic } = z
        .object({
          content: z.string(),
          coverUrl: z.string(),
          isPublic: z.coerce.boolean()
        })
        .parse(request.body)

      let memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id
        }
      })

      if (memory.userId !== request.user.id) {
        return reply.status(401).send()
      }

      memory = await prisma.memory.update({
        data: {
          content,
          coverUrl,
          isPublic
        },
        where: {
          id
        }
      })

      return memory
    } catch (error: any) {
      return error.issues
    }
  })

  app.delete('/memories/:id', async (request, reply) => {
    try {
      const { id } = z
        .object({
          id: z.string().uuid()
        })
        .parse(request.params)

      const memory = await prisma.memory.findUniqueOrThrow({
        where: {
          id
        }
      })

      if (memory.userId !== request.user.id) {
        return reply.status(401).send()
      }

      await prisma.memory.delete({
        where: {
          id
        }
      })
    } catch (error: any) {
      console.error(error)
    }
  })
}
