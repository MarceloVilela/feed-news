import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import posts from "@/assets/json/posts.json";
import { GridImage } from "@/components/Card";

export default function Social() {
  const { bottom, top } = useSafeAreaInsets();

  const router = useRouter();

  return (
    <View
      className="flex-1 bg-zinc-950"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <FlatList
        data={posts.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <GridImage item={{ image: item.cover }} />}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
