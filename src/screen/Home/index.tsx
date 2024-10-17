import {StackNavigationProp} from '@react-navigation/stack';
import {Text, TouchableOpacity} from 'react-native';
import {RootStackNavigation} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Text>Hello user</Text>
    </TouchableOpacity>
  );
}
