# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

An Expo Router news-feed app (tech + game article feeds, plus a "social" post-card
experiment) styled with NativeWind/Tailwind. It was recently upgraded from Expo 48 to
Expo 54 (see "Legacy code" below). See `README.md` for the portfolio-facing overview
(what it is, stack, screenshots, how to run) — this file covers implementation details
for working in the code, not duplicated there.

## Local instructions

Additional, un-versioned instructions (if present): @CLAUDE.local.md

## Git workflow

- Never run `git commit` or open a PR (`gh pr create`) on your own initiative — only do so
  when a human explicitly asks for it in that turn, even if the change looks complete.
- Do not add Claude/Copilot as a co-author (no `Co-Authored-By` trailer, no
  `Claude-Session`/generated-with links) on commits or PRs in this repo.

## Commands

```
npm start      # expo start --clear
npm run android
npm run ios
npm run web
```

Linting/formatting is Biome (`npm run lint`, `lint:fix`, `format`), configured via `biome.json`
extending `@arthurrios/biome-config/react` (same config the reference/style-guide projects use).
There is no test script configured. Use `npx tsc --noEmit` if you need to typecheck manually.
`.npmrc` sets `legacy-peer-deps=true`, needed because of React 19 / RN 0.81 peer dep mismatches —
use `npm install` (not a strict installer) when adding packages.

## Architecture

**Routing**: `expo-router` with `src/app` as the routes root (see `main: "expo-router/entry"`
in package.json). Top-level stack (`src/app/_layout.tsx`) has three screens: `(tabs)`, `article`,
and `social-grid`. `article.tsx` is a full-screen `WebView` reader that opens external article
URLs passed via the `url` query param.

**Tabs**: `src/app/(tabs)/_layout.tsx` does NOT use expo-router's file-based tab convention —
it manually builds a `@react-navigation/bottom-tabs` navigator and imports the two tab screens
directly (`tech/articles/[origin]` and `game/articles/[origin]`). Keep that in mind: adding a
route file under `(tabs)/` alone will not create a new tab, you also need to register it here.

**Tech vs. Game feeds**: `src/app/(tabs)/tech/articles/[origin].tsx` and
`src/app/(tabs)/game/articles/[origin].tsx` are near-duplicate screens (same data-loading /
rendering logic, different origin JSON, different API path segment `/tech/source` vs
`/game/source`, and different key in `SettingsContext`). When fixing a bug in one, check
whether the same fix is needed in the other.

**Settings context** (`src/contexts/Settings.tsx`): holds the currently selected feed "origin"
(the source site) separately for tech (`origin`/`originChange`) and game
(`originGame`/`originGameChange`). Selection is driven by `src/components/Select` (a modal
picker), which is wired up per-screen.

**Data flow**: each article screen reads its origin list from
`src/assets/json/{tech,game}/origins.json`, fetches `GET {apiUrl}/{tech|game}/source?url=...`
via the shared axios instance in `src/lib/api.ts`, and falls back to bundled
`placeholder.json` data when `env.placeholder` is true. `env.ts` (untracked/local config,
see note below; template at `env.example.ts`) selects `dev`/`staging`/`prod` based on `__DEV__`.

**Card rendering**: `src/components/ArticleList` maps API `Content` items to one of several
presentational card layouts in `src/components/Card` (`NewsCard`, `HeroCard`, `GridImage`,
`PostCard`, `PlaylistItem`) via a `layout` switch (`renderCard`) — currently hardcoded to
`"news"`. Add new card variants in `src/components/Card` and export them from
`src/components/Card/index.tsx`.

**Styling**: NativeWind v4 (`className` on RN components), Tailwind config content-scanned
over `App.tsx`, `components/**`, and `src/**`. Global stylesheet is `global.css`, wired into
Metro via `withNativeWind` in `metro.config.js`. Colors are centralized in
`src/styles/colors.ts` (named tokens, e.g. `background`/`background-dark`), extended into
`theme.colors` in `tailwind.config.js` (`darkMode: "class"`) instead of raw Tailwind palette
classes (`slate-900`, `zinc-400`...) in JSX. Theme preference is persisted via
`@react-native-async-storage/async-storage` (`src/lib/theme-storage.ts`). On mount,
`src/app/_layout.tsx` (`useEffect` + `useRef` guard, so it only runs once) reads the stored
scheme and applies it; dark is only forced when nothing is stored yet (first real app open).
`Select`'s footer toggle (`toggleColorScheme()` from NativeWind) persists the new choice on every
switch, so closing and reopening the app keeps the last theme picked instead of always reverting
to dark.

**Path alias**: `@/*` → `src/*` (see `tsconfig.json`).

## Legacy / noise directories — don't edit unless asked

- `src-48/` — a full snapshot of the app pre-Expo-54-upgrade, kept for reference only. It is
  listed in `.gitignore` and was never committed (`git ls-files src-48` is empty) — it's local-only
  reference material, not repo history; treat it as read-only.
- `env.ts` is likewise gitignored and never tracked — it's a local, per-developer config file
  (see `env.example.ts` for the template/shape). `.gitignore` additionally lists
  `src/assets/json`, but those files *were* committed before that rule was added, so — unlike
  `env.ts`/`src-48` — they remain tracked despite being ignored; don't assume edits there are
  excluded from version control.
