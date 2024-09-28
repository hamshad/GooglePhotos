import React, { PropsWithChildren, createContext, useContext } from "react";
import * as MediaLibrary from 'expo-media-library';

type MediaContextType = {
  localAssets: MediaLibrary.Asset[];
  loadLocalAssets: () => void;
}

const MediaContext = createContext<MediaContextType>({
  localAssets: [],
  loadLocalAssets: () => {}
});


export function MediaContextProvider({ children }: PropsWithChildren) {
  const [permissionResponse, requestPremission] = MediaLibrary.usePermissions(); const [localAssets, setLocalAssets] = React.useState<MediaLibrary.Asset[]>([]);
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
    <MediaContext.Provider value={{ localAssets, loadLocalAssets }}>
      {children}
    </MediaContext.Provider>  
  )
}


export const useMedia = () => useContext(MediaContext);
