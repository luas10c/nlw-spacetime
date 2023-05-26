import { api } from '#/lib/api'
import { cookies } from 'next/dist/client/components/headers'

export const getProfile = async () => {
  const access_token = cookies().get('access_token')?.value
  if (!access_token) {
    return null
  }

  try {
    const { data } = await api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    return data
  } catch (error) {
    console.log(error)
  }
}
