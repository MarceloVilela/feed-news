import { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { api } from '@/lib/api';
import delay from '@/utils/delay';
import { SettingsContext } from '@/contexts/Settings';
import Select from '@/components/Select';
import ArticleList from '@/components/ArticleList';

import { origins } from '@/assets/json/tech/origins.json';
import placeholder from '@/assets/json/tech/placeholder.json';
import env from '../../../../env';

const options = origins.map(({ title, url }) => ({ label: title, value: url }));

export interface Content {
    id: string;
    link: string;
    title: string;
    thumb: string;
    created_at: string;
    posted_at?: string;
}

export interface NewsResponse {
    data: Content[];
    total: number;
}

export default function Articles() {
    const { origin, originChange } = useContext(SettingsContext);

    const { bottom, top } = useSafeAreaInsets();

    const [articles, setArticles] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);

    const loadArticles = useCallback(() => {
        async function load() {
            let url = origins[0].url;
            const originCurrent = origins.filter(({ title }) => title === origin);
            if (originCurrent.length) {
                url = originCurrent[0].url;
            }

            setLoading(true);
            console.log(api.defaults.baseURL + `/tech/source?url=${url}`);
            const response = await api.get<NewsResponse>(`/tech/source?url=${url}`);
            setLoading(false);

            setArticles(response.data.data);
        }
        load();
    }, [origin]);

    async function loadPlaceholder() {
        setLoading(true);
        await delay(1000);
        setArticles(placeholder.data);
        setLoading(false);
    }

    useEffect(() => {
        env.placeholder ? loadPlaceholder() : loadArticles();
    }, [origin, loadArticles]);

    return (
        <View className="mt-6 flex-1 px-2" style={{ paddingBottom: bottom, paddingTop: top }}>
            <Select selected={String(origin)} options={options} handleOnChange={originChange} />

            {loading ? (
                <View className="flex-1 justify-center">
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <ArticleList articles={articles} />
            )}
        </View>
    );

    /* return (
    <View className="mt-4 flex-row items-center justify-between">
      <Text className="font-body text-sm text-gray-100">
        {JSON.stringify(articles, null, 2)}
      </Text>
    </View>
  ) */
}
