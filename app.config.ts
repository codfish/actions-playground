import { ConfigContext, ExpoConfig } from 'expo/config';

const getAppIdSuffix = () => {
  if (!process.env.APP_ENV || process.env.APP_ENV === 'production') {
    return '';
  }

  return `.${process.env.APP_ENV}`; // e.g. '.beta'
};

const getAppNameSuffix = () => {
  if (!process.env.APP_ENV || process.env.APP_ENV === 'production') {
    return '';
  }

  return ` (${process.env.APP_ENV.toUpperCase()})`; // e.g. ' (Beta)'
};

const getAppLogo = () => {
  if (process.env.APP_ENV === 'production') {
    return './src/assets/logos/foo-app-icon.png';
  }

  return './src/assets/logos/foo-app-icon-beta.png';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: `Foo Mobile${getAppNameSuffix()}`,
  slug: 'foomobile',
  version: '1.0.0',
  orientation: 'portrait',
  icon: getAppLogo(),
  scheme: 'foomobile',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/logos/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: `com.foo.oacmobile${getAppIdSuffix()}`,
    entitlements: {
      'com.apple.developer.networking.wifi-info': true,
    },
  },
  android: {
    package: `com.foo.oac${getAppIdSuffix()}`,
  },
  plugins: [
    'expo-router',
    [
      'react-native-auth0',
      {
        domain: 'foo-foo-testing-temporary.us.auth0.com',
      },
    ],
    'expo-secure-store',
    'expo-font',
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        project: 'foo-mobile',
        organization: 'foo',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: 'c4d7f3e1-9a2b-4d8f-b5e6-8c1f2a3b4d5e',
    },
    router: {
      origin: false,
    },
  },
  owner: 'foo',
});
