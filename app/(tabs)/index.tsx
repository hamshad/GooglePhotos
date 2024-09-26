import React from 'react';
import { Stack } from 'expo-router';
import { Text, FlatList, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function Home() {
  const [permissionResponse, requestPremission] = MediaLibrary.usePermissions();
  const [localAssets, setLocalAssets] = React.useState<MediaLibrary.Asset[]>();

  React.useEffect(() => {
    if (permissionResponse?.status !== 'granted') {
      requestPremission();
    } else {
      loadLocalAssets();
    }
  }, [permissionResponse])

  const loadLocalAssets = async () => {
    const assetPage: MediaLibrary.PagedInfo<MediaLibrary.Asset> = await MediaLibrary.getAssetsAsync();
    console.log(JSON.stringify(assetPage, null, 2));

    setLocalAssets(assetPage.assets);
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Photos' }} />
      <FlatList
        data={localAssets}
        numColumns={4}
        contentContainerClassName='gap-0.5'
        columnWrapperClassName='gap-0.5'
        renderItem={({item}) => (
          <Image source={{uri: item.uri}} className='w-1/4 aspect-square'/>
        )}
      />
    </>
  );
}
