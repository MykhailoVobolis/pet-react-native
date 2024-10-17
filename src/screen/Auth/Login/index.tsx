import {View} from 'react-native';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

import AuthHeader from '../components/AuthHeader';
import AuthLayout from '../components/AuthLayout';
import Input from '../../../common/components/Input';
import DefaultButton from '../../../common/components/DefaultButton';

import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigation} from '../../../navigation/types';
import {ScreenNames} from '../../../constants/screenNames';

import styles from '../styles';

interface IInputValue {
  email: string;
  password: string;
  errorEmail?: string | null;
  errorPassword?: string | null;
}

export default function LoginPage() {
  const [inputValues, setInputValue] = useState<IInputValue>({
    email: '',
    password: '',
    errorEmail: null,
    errorPassword: null,
  });

  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  const handleChangeInput = (
    key: 'email' | 'password' | 'errorEmail' | 'errorPassword',
    value: string | null,
  ) => {
    setInputValue(prevState => ({...prevState, [key]: value}));
  };

  const checkEmail = () => {
    const emailValidation = new RegExp(
      '^([a-zA-Z0-9._%-]+@[a-z0-9.-]+.[a-z]{2,6})*$',
    );

    if (!emailValidation.test(inputValues.email)) {
      handleChangeInput('errorEmail', 'Not valide email');
    } else {
      handleChangeInput('errorEmail', null);
    }
  };

  const checkPassword = (text: string) => {
    if (text.length < 8) {
      handleChangeInput(
        'errorPassword',
        'Password must be more then 8 symbols',
      );
    } else {
      handleChangeInput('errorPassword', null);
    }
  };

  const onLogin = async (email, password) => {
    try {
      const result = auth().signInWithEmailAndPassword(email, password);
      console.log('RESULT', result);
    } catch (error) {
      console.log('e', error);
    }
  };

  const isDisabledLoginBtn = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: ScreenNames.LOGGED_IN_STACK}],
          }),
        );
      }
    });

    return subscriber;
  }, []);

  return (
    <AuthLayout>
      <AuthHeader activeTab={'login'} />
      <View style={styles.formContainer}>
        <Input
          onBlur={checkEmail}
          value={inputValues.email}
          onChangeText={text => handleChangeInput('email', text)}
          error={
            inputValues.errorEmail !== null ? inputValues.errorEmail : undefined
          }
          placeholder={'Email'}
        />
        <Input
          placeholder={'Password'}
          value={inputValues.password}
          onChangeText={text => {
            handleChangeInput('password', text);
            checkPassword(text);
          }}
          error={
            inputValues.errorPassword !== null
              ? inputValues.errorPassword
              : undefined
          }
          secureTextEntry={true}
        />
      </View>
      <DefaultButton
        onPress={() => {
          void onLogin(inputValues.email, inputValues.password);
        }}
        disabled={isDisabledLoginBtn}
        text={'Увійти'}
      />
    </AuthLayout>
  );
}
