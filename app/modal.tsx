import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Button } from '~/components/Button';

import { ScreenContent } from '~/components/ScreenContent';
import { supabase } from '~/utils/supabase';

export default function Modal() {
  return (
      <>
        {/* <ScreenContent path="app/modal.tsx" title="Modal" /> */}
        <Button className='m-4 bg-blue-400 rounded-2xl' title='Sign out' onPress={() => 
          supabase.auth.signOut().then(() => router.back())
        } />
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </>
  );
}
