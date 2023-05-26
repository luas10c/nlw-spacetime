import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { styled } from 'nativewind'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import Logo from '../assets/nlw-spacetime-logo.svg'
import Stripes from '../assets/stripes.svg'

const StripesElement = styled(Stripes)

import * as env from '../config/env'
import { api } from '../lib/api'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${env.GITHUB_CLIENT_ID}`
}

export default function App() {
  const router = useRouter()
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  const [, response, promptAsync] = useAuthRequest(
    {
      clientId: env.GITHUB_CLIENT_ID,
      scopes: ['identy'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      })
    },
    discovery
  )

  const handleSigninWithGithub = async (code: string) => {
    try {
      const { data } = await api.post('/auth/github', {
        code
      })

      await SecureStore.setItemAsync('access_token', data?.token)
      router.push('/memories')
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    if (response && response.type === 'success') {
      const { code } = response.params
      handleSigninWithGithub(code)
    }
  }, [response])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={require('../assets/luz.png')}
      className="relative flex-1 bg-gray-700 px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}>
      <StatusBar style="light" translucent />
      <StripesElement className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => promptAsync()}
          className="rounded-full bg-green-500 px-5 py-2">
          <Text className="font-alt text-sm uppercase text-black">
            Começar cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </ImageBackground>
  )
}
