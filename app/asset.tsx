import { AntDesign } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, Image } from "react-native";
import { useMedia } from "~/providers/MediaProvider";

export default function AssetPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getAssetById } = useMedia();

  const asset = getAssetById(id);

  if (!asset) {
    return <Text>Asset not found!</Text>
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: asset.filename,
          headerRight: () => <AntDesign name="cloudupload" size={24} color="black" />
        }} />
    <Image
      source={{ uri: asset.uri }}
      className="w-full h-full"
      resizeMode="contain" />
      </>
  )
}
