import { useCallback, useEffect } from "react";
import { Alert, Linking, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
//import base64 from "base-64";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "@expo/vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { slate } from "tailwindcss/colors";

export default function Article() {
  const { bottom, top } = useSafeAreaInsets();

  const router = useRouter();

  const { url: urlEncoded } = useLocalSearchParams<{ url: string }>();
  const url = urlEncoded ? decodeURIComponent(urlEncoded) : "";

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (!url) {
      Alert.alert("Erro", "URL do artigo não encontrada");
      handleGoBack();
      return;
    }
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Erro", "Erro ao listar artigo");
          handleGoBack();
        }
      })
      .catch(() => {
        Alert.alert("Erro", "Erro ao listar artigo");
        handleGoBack();
      });
  }, [url, handleGoBack]);

  return (
    <View
      className="flex-1 bg-zinc-950"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <TouchableOpacity
        className="flex-row items-center gap-4 px-8 py-4"
        onPress={() => handleGoBack()}
      >
        <Icon name="arrow-left" size={16} color={slate[200]} />
        <Text className="text-md text-slate-200">Ver mais artigos</Text>
      </TouchableOpacity>

      <WebView source={{ uri: url }} />
    </View>
  );
}
