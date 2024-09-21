import React, {useEffect} from 'react';
import {DevSettings, NativeModules, SafeAreaView} from 'react-native';
import LoginPage from './src/screen/Auth/Login';

function App(): React.JSX.Element {
  // Налаштування дебвг меню у react-native-debugger
  useEffect(() => {
    if (__DEV__) {
      // Додавання меню старту дебагера
      DevSettings.addMenuItem('Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
      });
      // Додавання меню зупинки дебагера
      DevSettings.addMenuItem('Stop Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(false);
      });
    }
    console.log('Info', {age: 25, array: [1, 2, 3, 5, {name: 'Mykhailo'}]});
    fetch('https://google.com');
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <LoginPage />
    </SafeAreaView>
  );
}

export default App;
