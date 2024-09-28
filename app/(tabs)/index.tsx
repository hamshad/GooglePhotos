import React from 'react';
import { Stack } from 'expo-router';
import { Text, FlatList, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function Home() {
  const [permissionResponse, requestPremission] = MediaLibrary.usePermissions();
  const [localAssets, setLocalAssets] = React.useState<MediaLibrary.Asset[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState<boolean>(true);
  const [endCursor, setEndCursor] = React.useState<MediaLibrary.AssetRef>();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (permissionResponse?.status !== 'granted') {
      requestPremission();
    } else {
      loadLocalAssets();
    }
  }, [permissionResponse])

  const loadLocalAssets = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const assetPage: MediaLibrary.PagedInfo<MediaLibrary.Asset> = await MediaLibrary.getAssetsAsync({ after: endCursor });
    console.log(JSON.stringify(assetPage, null, 2));

    setLocalAssets(values => [...values, ...assetPage.assets]);

    setHasNextPage(assetPage.hasNextPage);
    setEndCursor(assetPage.endCursor);
    setIsLoading(false);
  }

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
        refreshing={isLoading}
        renderItem={({item}) => (
          <Image source={{uri: item.uri}} className='w-1/4 aspect-square'/>
        )}
      />
    </>
  );
}
