import React, { useState } from 'react'
import { Alert, Text, View, AppState, TouchableOpacity, TextInput } from 'react-native'
import { supabase } from '../../utils/supabase'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '~/providers/AuthProvider'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { user } = useAuth();
  const TAG = "[login]";

  console.log(TAG, user);

  if (user) {
    return <Redirect href={"/(tabs)"} />;
  }

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <>
      <Stack.Screen options={{title: "Google Photos"}} />
      <View className={`mt-10 gap-3 p-5`}>
          <TextInput
            className='rounded-md border border-gray-300 p-3 text-lg'
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            autoCapitalize={'none'}
          />
          <TextInput
            className='mb-16 rounded-md border border-gray-300 p-3 text-lg'
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
          <TouchableOpacity className="rounded-2xl bg-blue-300 p-5" disabled={loading} onPress={() => signInWithEmail()} >
            <Text className='text-center font-semibold text-xl'>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-2xl bg-neutral-300 p-5" disabled={loading} onPress={() => signUpWithEmail()} >
            <Text className='text-center font-semibold text-xl'>Sign up</Text>
          </TouchableOpacity>
      </View>
    </>
  )
}
