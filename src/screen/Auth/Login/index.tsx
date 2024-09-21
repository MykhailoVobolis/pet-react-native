import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useState} from 'react';
import {HidePassIcon, ViewPassIcon} from '../../../assets/icons';

import styles from './styles';

interface IInputValue {
  email: string;
  password: string;
  errorEmail?: string | null;
  errorPassword?: string | null;
}

export default function LoginPage() {
  const [isPassHidden, setIsPassHidden] = useState(true);
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainWrapper}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({android: 20, ios: 90})}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Раді тебе вітати!</Text>
            <Text style={styles.welcomeText}>
              Кожен пухнастик заслуговує на дбайливих господарів. Ми допоможемо
              тобі знайти друга.
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.authText}>Вхід</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registrationBtn}>
              <Text style={styles.authText}>Реєстрація</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Email'}
                style={styles.input}
                placeholderTextColor={'#838383'}
                onBlur={() => {
                  checkEmail();
                }}
                value={inputValues.email}
                onChangeText={text => handleChangeInput('email', text)}
              />
            </View>
            {inputValues.errorEmail && <Text>{inputValues.errorEmail}</Text>}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Password'}
                style={styles.input}
                placeholderTextColor={'#838383'}
                value={inputValues.password}
                onChangeText={text => {
                  handleChangeInput('password', text);
                  checkPassword(text);
                }}
                secureTextEntry={isPassHidden}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsPassHidden(!isPassHidden);
                }}
                hitSlop={{top: 15, bottom: 15, right: 15, left: 15}}>
                {isPassHidden ? (
                  <HidePassIcon fill={'#A36161'} />
                ) : (
                  <ViewPassIcon fill={'#000000'} />
                )}
              </TouchableOpacity>
            </View>
            {inputValues.errorPassword && (
              <Text>{inputValues.errorPassword}</Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.loginBtnContainer,
              isDisabledLoginBtn && {opacity: 0.5},
            ]}
            disabled={isDisabledLoginBtn}>
            <Text style={styles.loginText}>Увійти</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
