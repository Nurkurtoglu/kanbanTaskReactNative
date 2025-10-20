export default function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'], // expo kullanıyorsan bunu koru, yoksa 'module:metro-react-native-babel-preset'
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true,
                },
            ],
        ],
    };
}
