import {View} from 'react-native';
import {useState} from 'react';
import AuthHeader from '../components/AuthHeader';
import AuthLayout from '../components/AuthLayout';
import Input from '../../../common/components/Input';
import DefaultButton from '../../../common/components/DefaultButton';

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

  const isDisabledLoginBtn = Boolean(
    inputValues.errorEmail ||
      inputValues.errorPassword ||
      !inputValues.email ||
      !inputValues.password,
  );

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
        onPress={() => {}}
        disabled={isDisabledLoginBtn}
        text={'Увійти'}
      />
    </AuthLayout>
  );
}
