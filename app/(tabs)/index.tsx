import React, { useEffect } from 'react';
import { Link, Stack } from 'expo-router';
import { TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { useMedia } from '~/providers/MediaProvider';

export default function Home() {
  const { localAssets, loadLocalAssets } = useMedia();

  useEffect(() => {
    loadLocalAssets();
  }, [localAssets, 2]);

  return (
    <>
      <Stack.Screen options={{ title: 'Photos' }} />
      {/* <Link href={"/asset"}>Go to asset page</Link> */}
      <FlatList
        data={localAssets}
        numColumns={4}
        contentContainerClassName='gap-0.5'
        columnWrapperClassName='gap-0.5'
        onEndReached={loadLocalAssets}
        onEndReachedThreshold={1}
        renderItem={({item}) => (
          <Link href={`/asset?id=${item.id}`} asChild>
            <TouchableOpacity className='w-1/4'>
              <Image source={{ uri: item.uri }} className='w-full aspect-square'/>
            </TouchableOpacity>
          </Link>
        )}
      />
    </>
  );
}
