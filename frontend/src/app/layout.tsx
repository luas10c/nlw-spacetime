import { Toaster } from 'react-hot-toast'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'

import './globals.css'

interface Props {
  children: React.ReactNode
}

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma capsula do tempo construída com React, Next.js, Tailwind e Typescript'
}

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto'
})

const baiJamjuree = Bai_Jamjuree({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-bai-jamjuree'
})

const AppLayout = (props: Props) => {
  const { children } = props

  return (
    <html lang="en" className={`${roboto.variable} ${baiJamjuree.variable}`}>
      <body cz-shortcut-listen="true">
        <Toaster />
        {children}
      </body>
    </html>
  )
}

export default AppLayout
