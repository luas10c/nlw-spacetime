import { use, useState } from 'react'

import Image from 'next/image'

import { LogoutButton } from '../logout-button'

import { getProfile } from '#/services/getProfile'

export const Profile = () => {
  const profile = use(getProfile())

  return (
    <div className="flex shrink-0 gap-3 text-left">
      {profile?.avatarUrl && (
        <Image
          src={profile.avatarUrl}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
          alt="#"
        />
      )}

      <div>
        <p className="max-w-[140px] text-sm leading-snug">{profile?.name}, </p>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
