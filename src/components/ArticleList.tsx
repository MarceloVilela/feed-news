import { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { slate } from "tailwindcss/colors";
import Icon from "@expo/vector-icons/Feather";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
//import base64 from "base-64";

import { Content } from "@/app/(tabs)/tech/articles/[origin]";

dayjs.locale(ptBR);

interface ArticleCardWithImageProps {
  articles: Content[];
}

export default function ArticleList({ articles }: ArticleCardWithImageProps) {
  const router = useRouter();

  const _articles = useMemo(() => {
    //return [...new Set(articles)];
    if (typeof articles != "object") {
      return [];
    }
    return articles.filter(
      (value, index, self) =>
        self.findIndex((v) => v["id"] === value["id"]) === index,
    );
  }, [articles]);

  const handleSeeMore = (url: string) =>
    router.push(`/article?url=${encodeURIComponent(url)}`);

  return (
    <ScrollView>
      <View className="mt-6">
        {_articles.map((article) => {
          return (
            <View key={article.id} className="pb-4">
              <View className="hidden flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-sm text-gray-100">
                  {dayjs(article.posted_at).format("D[ de ]MMMM[, ]YYYY")}
                </Text>
              </View>
              <View className="space-y-4 px-0">
                <Image
                  source={{ uri: article.thumb }}
                  className="aspect-video w-full rounded-lg"
                  alt=""
                />
                <View className="px-2">
                  <Text className="font-body text-xl leading-relaxed text-slate-900 dark:text-slate-100">
                    {article.title}
                  </Text>

                  <TouchableOpacity
                    className="flex-row items-center gap-2"
                    onPress={() => handleSeeMore(article.link)}
                  >
                    <Text className="font-body text-md text-blue-700 dark:text-slate-300">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color={slate["700"]} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
