import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const redirectURL = new URL('/', request.url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': 'access_token=;Path=/;Max-age=0;'
    }
  })
}
