'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export const LogoutButton = () => {
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setLoading(true)
      await axios.get('http://localhost:3000/api/auth/logout')
      router.push('/')
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-red-400 outline-none hover:text-red-300">
      Quero sair
    </button>
  )
}
