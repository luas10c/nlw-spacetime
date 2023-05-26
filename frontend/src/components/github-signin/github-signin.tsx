'use client'

import { User } from 'lucide-react'

import * as env from '#/config/env'

export const GithubSignin = () => {
  const authorizeURL = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}`

  return (
    <a
      href={authorizeURL}
      className="flex shrink-0 items-center gap-3 transition-colors hover:text-gray-50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-400 ">
        <User className="h-5 w-5 text-gray-500" />
      </div>

      <p className="max-w-[140px] text-sm leading-snug">
        <span className="underline">Crie sua conta</span> e salve suas memórias!
      </p>
    </a>
  )
}
