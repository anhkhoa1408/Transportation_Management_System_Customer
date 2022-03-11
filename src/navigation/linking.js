const config = {
  screens: {
    HomeStack: {
      screens: {
        HomeScreen: {
          path: 'home',
        },
        Success: {
          path: 'order-success',
        },
        Error: {
          path: 'order-error',
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
