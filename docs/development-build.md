# Android development build

A release APK holds the app's native code and its JavaScript, so every change
needs a new 30-minute build. The development build holds only the native code
and loads the JavaScript separately, so most changes reach the phone in a
minute without a new APK.

It installs as **KineSync Dev**, a separate app beside KineSync, with its own
settings and vault.

## When a new APK is still needed

Only when native code changes: a new or updated native module
(`ExpoLyrics/modules/*/android`), a config plugin, `app.json`, or a package
update. A push that changes one of these builds a new development APK on its
own. Screens, settings and lyrics behaviour are JavaScript, and need only an
update.

## One-time setup

1. Create a free account at [expo.dev](https://expo.dev) and a project for the
   app.
   - On your own fork, add three repository **variables** (Settings > Secrets
     and variables > Actions > Variables), all from the project's page:
     `EXPO_PROJECT_ID`, `EXPO_OWNER` (the account or team that owns the
     project, such as `yourname-team`) and `EXPO_SLUG` (the project's slug,
     such as `kinesync`).
   - In the main repository, the project in `ExpoLyrics/app.json` is used.
2. Create an access token (expo.dev > Account settings > Access tokens) and
   add it as the repository **secret** `EXPO_TOKEN`.
3. Run **Actions > Android development build > Run workflow** and install
   `KineSync-Android-dev.apk` from the run's artifacts.

## Getting a change onto the phone

Each push that changes `ExpoLyrics` runs **Expo update (development)**, which
publishes the JavaScript to the `development` branch on Expo.

1. Open **KineSync Dev**.
2. Under **Extensions**, sign in to Expo the first time.
3. Pick the newest update on the `development` branch.

An update only loads into a build with the same native code (its *runtime
version*). Both workflows show the runtime version in their run summary. If
an update does not appear, run the development build again.

## From a computer instead

With Node.js installed and the repository cloned, `npm install` and
`npx expo start --dev-client` in `ExpoLyrics` serve the JavaScript from your
computer. Open KineSync Dev on a phone on the same Wi-Fi network (or add
`--tunnel`), and every saved change reloads on the phone.
