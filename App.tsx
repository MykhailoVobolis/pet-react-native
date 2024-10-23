import React, {useEffect} from 'react';
import {DevSettings, NativeModules, SafeAreaView} from 'react-native';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
// import {firebase} from '@react-native-firebase/firestore';
// import {animals} from './animals_list';

function App(): React.JSX.Element {
  // const db = firebase.firestore();

  // const uploadAnimalsToFirestore = async animals => {
  //   const collectionRef = db.collection('animals');

  //   for (const animal of animals) {
  //     await collectionRef
  //       .add(animal)
  //       .then(docRef => {
  //         console.log(`Document written with ID: ${docRef.id}`);
  //       })
  //       .catch(error => {
  //         console.error('Error adding document: ', error);
  //       });
  //   }
  // };

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
    // uploadAnimalsToFirestore(animals);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <RootNavigation />
    </SafeAreaView>
  );
}

export default App;
