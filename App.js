import React from 'react';

import MainNav from './src/navigation/mainNav';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {ToastProvider} from 'react-native-toast-notifications';
import {store, persister} from './src/redux/store';

export default App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <ToastProvider>
          <MainNav />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};
