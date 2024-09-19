import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import styles from './styles';

interface IInputValue {
  email: string;
  password: string;
  errorEmail?: string | null;
  errorPassword?: string | null;
}

export default function LoginPage() {
  const [inputValue, setInputValue] = useState<IInputValue>({
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

    if (!emailValidation.test(inputValue.email)) {
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

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Раді тебе вітати!</Text>
        <Text style={styles.welcomeText}>
          Кожен пухнастик заслуговує на дбайливих господарів. Ми допоможемо тобі
          знайти друга.
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
            value={inputValue.email}
            onChangeText={text => handleChangeInput('email', text)}
          />
        </View>
        {inputValue.errorEmail && <Text>{inputValue.errorEmail}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Password'}
            style={styles.input}
            placeholderTextColor={'#838383'}
            value={inputValue.password}
            onChangeText={text => {
              handleChangeInput('password', text);
              checkPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
        {inputValue.errorPassword && <Text>{inputValue.errorPassword}</Text>}
      </View>
      <TouchableOpacity style={styles.loginBtnContainer}>
        <Text style={styles.loginText}>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
}
