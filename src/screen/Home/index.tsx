import {StackNavigationProp} from '@react-navigation/stack';
import {View} from 'react-native';
import {RootStackNavigation} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import PetsList from './components/PetsList';

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

  useEffect(() => {
    getPets();
  }, []);

  return (
    <View style={{flex: 1}}>
      <PetsList pets={pets} />
    </View>
  );
}
