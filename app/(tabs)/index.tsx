import React from 'react';
import { Stack } from 'expo-router';
import { Text, FlatList, Image } from 'react-native';
import { useMedia } from '~/providers/MediaProvider';

export default function Home() {
  const { localAssets, loadLocalAssets } = useMedia();

  return (
    <>
      <Stack.Screen options={{ title: 'Photos' }} />
      <FlatList
        data={localAssets}
        numColumns={4}
        contentContainerClassName='gap-0.5'
        columnWrapperClassName='gap-0.5'
        onEndReached={loadLocalAssets}
        onEndReachedThreshold={1}
        renderItem={({item}) => (
          <Image source={{ uri: item.uri }} className='w-1/4 aspect-square'/>
        )}
      />
    </>
  );
}
