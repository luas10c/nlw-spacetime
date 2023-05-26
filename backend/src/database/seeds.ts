import { prisma } from './index'

async function execute() {
  try {
    await Promise.all([prisma.user.deleteMany(), prisma.memory.deleteMany()])
    const user = await prisma.user.create({
      data: {
        login: 'luas10c'
      }
    })

    await Promise.all([
      prisma.memory.create({
        data: {
          content: '..',
          coverUrl: '..',
          userId: user.id
        }
      }),
      prisma.memory.create({
        data: {
          content: '..',
          coverUrl: '..',
          userId: user.id
        }
      })
    ])
  } catch (error: any) {
    console.log(error.message)
  }
}

execute()
