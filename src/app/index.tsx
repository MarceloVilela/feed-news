import Articles from '@/app/tech/articles/[origin]';
import { origins } from '@/assets/json/tech/origins.json';
import gameOrigins from '@/assets/json/game/origins.json';
import { SettingsProvider } from '@/contexts/Settings';

export default function Index() {
    return (
        <SettingsProvider origin={origins[0].title} originGame={gameOrigins.origins[0].title}>
            <Articles />
        </SettingsProvider>
    );
}
