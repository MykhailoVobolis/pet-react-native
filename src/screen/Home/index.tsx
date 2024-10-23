import {StackNavigationProp} from '@react-navigation/stack';
import {View} from 'react-native';
import {RootStackNavigation} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import PetsList from './components/PetsList';
import SearchBar from './components/SearchBar';

export interface IPets {
  age: number;
  color: string;
  description: string;
  images: string[];
  isDog: boolean;
  isVaccinated: boolean;
  location: string;
  name: string;
  sex: string;
  type: string;
  timeStamp: number;
  size: 'big' | 'medium' | 'small';
}

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();
  const [pets, setPets] = useState<IPets[]>([]);

  const getPets = async () => {
    try {
      const result = await firestore().collection('animals').get();
      const temp: IPets[] = result.docs.map(i => i.data()) as IPets[];
      setPets(temp);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleSearch = async (text: string) => {
    try {
      const result = await firestore()
        .collection('animals')
        .orderBy('name')
        .startAt(text)
        .endAt(text + '\uf8ff')
        .get();
      const temp: IPets[] = result.docs.map(e => e.data()) as IPets[];
      setPets(temp);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <View style={{flex: 1}}>
      <SearchBar handleSearch={handleSearch} />
      <PetsList pets={pets} />
    </View>
  );
}
