// The isolated renderer lab omits playback/network providers, making matched
// renderer measurements possible even while unrelated native modules are under development.
function withIsolatedLyricsLab(config) {
  if (process.env.KINESYNC_ISOLATED_LYRICS_LAB !== '1') return config;
  return { ...config, experiments: { ...config.experiments, typedRoutes: false }, plugins: config.plugins.map(plugin => plugin === 'expo-router'
    ? ['expo-router', { root: './scripts/native-lyrics-lab-app' }] : plugin) };
}

// The development build and its over-the-air updates (docs/development-build.md).
// Without these variables the app is configured exactly as app.json says.
//   KINESYNC_DEV_BUILD=1   Android installs as "KineSync Dev" (package suffix
//                          .dev), beside the regular app and its vault.
//   KINESYNC_EAS_UPDATES=1 Turn on expo-updates so the build can load
//                          JavaScript published with `eas update`.
//   EXPO_PROJECT_ID, EXPO_OWNER, EXPO_SLUG
//                          Another Expo project than app.json's (a fork's own):
//                          its ID, its owner (account or team) and its slug.
function withDevelopmentBuild(config) {
  const devBuild = process.env.KINESYNC_DEV_BUILD === '1';
  const easUpdates = process.env.KINESYNC_EAS_UPDATES === '1';
  const projectId = process.env.EXPO_PROJECT_ID || config.extra?.eas?.projectId;
  const owner = process.env.EXPO_OWNER || config.owner;
  const slug = process.env.EXPO_SLUG || config.slug;
  return {
    ...config,
    slug,
    ...(devBuild ? { name: `${config.name} Dev` } : {}),
    owner,
    android: { ...config.android, ...(devBuild ? { package: `${config.android.package}.dev` } : {}) },
    extra: { ...config.extra, eas: { ...config.extra?.eas, projectId } },
    // A JavaScript update only loads into a build with the same native code.
    ...(easUpdates ? { runtimeVersion: { policy: 'fingerprint' } } : {}),
    updates: easUpdates
      ? { url: `https://u.expo.dev/${projectId}`, requestHeaders: { 'expo-channel-name': 'development' } }
      : { enabled: false },
  };
}

module.exports = ({ config }) => withDevelopmentBuild(withIsolatedLyricsLab(config));
