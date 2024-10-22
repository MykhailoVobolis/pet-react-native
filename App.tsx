import React, {useEffect} from 'react';
import {DevSettings, NativeModules, SafeAreaView} from 'react-native';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';

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
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <RootNavigation />
    </SafeAreaView>
  );
}

export default App;
