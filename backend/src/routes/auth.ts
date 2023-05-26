import { z } from 'zod'
import axios from 'axios'
import type { FastifyInstance } from 'fastify'

import * as env from '../config/env'

import { prisma } from '../database'

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/auth/github', async (request) => {
    try {
      const { code } = z
        .object({
          code: z.string()
        })
        .parse(request.body)

      const {
        data: { error, error_description, access_token }
      } = await axios.post(
        'https://github.com/login/oauth/access_token',
        null,
        {
          params: {
            code,
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET
          },
          headers: {
            Accept: 'application/json'
          }
        }
      )

      if (error) {
        throw new Error(error_description)
      }

      const { data } = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })

      const userInfo = z
        .object({
          id: z.coerce.string(),
          name: z.string(),
          login: z.string(),
          avatar_url: z.string()
        })
        .parse(data)
      console.log(userInfo)

      let user = await prisma.user.findUnique({
        where: {
          githubId: userInfo.id
        }
      })
      if (!user) {
        user = await prisma.user.create({
          data: {
            githubId: userInfo.id,
            login: userInfo.login,
            name: userInfo.name,
            avatarUrl: userInfo.avatar_url
          }
        })
      }

      const token = app.jwt.sign({
        id: user.id
      })

      return { token }
    } catch (error: any) {
      console.log(error)
      return null
    }
  })

  app.get('/auth/profile', async (request, reply) => {
    await request.jwtVerify()

    const data = await prisma.user.findUnique({
      where: {
        id: request.user.id
      }
    })
    if (!data) {
      return reply.status(401).send()
    }

    console.log('data', data)

    return data
  })
}
