import { api } from '#/lib/api'
import { NextResponse, type NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')

  const { data } = await api.post('/auth/github', {
    code
  })

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // 30 days

  const redirectURL = new URL('/', request.url)
  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `access_token=${data?.token}; Path=/; Max-age=${cookieExpiresInSeconds};`
    }
  })
}
