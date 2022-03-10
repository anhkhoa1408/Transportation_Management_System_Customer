const config = {
  screens: {
    HomeStack: {
      screens: {
        HomeScreen: {
          path: 'home',
        },
      },
    },
  },
};

const linking = {
  prefixes: ['shober-delivery://shober'],
  config,
};

export default linking;
