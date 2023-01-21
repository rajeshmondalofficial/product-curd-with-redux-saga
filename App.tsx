import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/stores';
import RootRoutes from './src/routes/RootRoutes';
import {NativeBaseProvider} from 'native-base';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          <RootRoutes />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
