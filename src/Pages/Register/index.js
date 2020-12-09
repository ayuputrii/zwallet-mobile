import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {signup} from '../../Redux/Action/Register';

const Register = (props) => {
  const inputEmail = React.useRef();
  const inputPassword = React.useRef();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);
  const dispatch = useDispatch();

  const onRegister = () => {
    if (!name) {
      alert('Please Input Name!');
      return false;
    }

    if (!email) {
      alert('Please Input Email!');
      return false;
    }
    if (!password) {
      alert('Please Input Password!');
      return false;
    }

    let data = {
      email: email,
      password: password,
      name: name,
    };

    dispatch(signup(data));
    AsyncStorage.setItem('RegisterMail', email);
    setPassword('');
    setEmail('');
    setName('');
    props.navigation.navigate('RegisterPin');
  };

  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.zwallet}> Zwallet </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.bgwallet}>
            <Text style={styles.zapp}> Sign Up </Text>
            <Text style={styles.txt}>
              Create your account to access Zwallet.
            </Text>
            <View style={styles.inputWrap}>
              <View style={styles.inputItem}>
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: 3,
                    left: -0.1,
                  }}>
                  <IconButton color="#444" icon="account-outline" />
                </View>
                <TextInput
                  style={{
                    paddingLeft: 35,
                    fontFamily: 'Nunito-Regular',
                    backgroundColor: 'white',
                  }}
                  placeholder="Enter your name"
                  autoCapitalize={'none'}
                  value={name}
                  // name={name}
                  label="name"
                  onChangeText={(text) => setName(text)}
                  onSubmitEditing={() => inputEmail.current.focus()}
                  returnKeyType="next"
                />
              </View>
              <View style={styles.inputItem}>
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: 3,
                    left: -0.1,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  <IconButton color="#444" icon="email-outline" />
                </View>
                <TextInput
                  style={{
                    paddingLeft: 35,
                    fontFamily: 'Nunito-Regular',
                    backgroundColor: 'white',
                  }}
                  placeholder="Enter your Email"
                  autoCapitalize={'none'}
                  ref={inputEmail}
                  value={email}
                  name={email}
                  label="Email"
                  onChangeText={(text) => setEmail(text)}
                  onSubmitEditing={() => inputPassword.current.focus()}
                  returnKeyType="next"
                />
              </View>
              <View style={styles.inputItem}>
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: 3,
                    left: -0.1,
                  }}>
                  <IconButton color="#444" icon="lock-outline" />
                </View>
                <TextInput
                  style={{
                    paddingLeft: 35,
                    fontFamily: 'Nunito-Regular',
                    backgroundColor: 'white',
                  }}
                  placeholder="Enter your Password"
                  autoCapitalize={'none'}
                  ref={inputPassword}
                  value={password}
                  name={password}
                  label="Password"
                  onChangeText={(text) => setPassword(text)}
                  onSubmitEditing={() => onRegister()}
                  secureTextEntry={hidePassword}
                  returnKeyType="send"
                />
                <View style={{position: 'absolute', right: 0}}>
                  <IconButton
                    onPress={() => setHidePassword(!hidePassword)}
                    color="#444"
                    icon={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <ScrollView style={styles.container}>
        <View style={styles.btnSubmit}>
          <View style={{padding: 7}}>
            <Button
              style={styles.btnlog}
              mode="contained"
              onPress={() => onRegister()}>
              Sign Up
            </Button>
          </View>
          <View style={{padding: 20, flex: 1, flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'rgba(58, 61, 66, 0.8)',
                fontSize: 16,
                marginBottom: 20,
              }}>
              Already have an account? Let’s
            </Text>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                color: '#6379F4',
                fontWeight: 'bold',
              }}
              onPress={() => props.navigation.navigate('Login')}>
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFCFF',
  },
  zwallet: {
    textAlign: 'center',
    fontSize: 26,
    color: '#6379F4',
    fontWeight: 'bold',
    marginTop: 30,
  },
  body: {
    display: 'flex',
  },
  bgwallet: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: 'white',
    height: 450,
    marginTop: 40,
    elevation: 20,
  },
  zapp: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3A3D42',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  txt: {
    fontFamily: 'Nunito-Regular',
    color: 'rgba(58, 61, 66, 0.6)',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  inputWrap: {
    padding: 20,
  },
  inputItem: {
    fontFamily: 'Nunito-Regular',
    padding: 5,
    marginBottom: 5,
    marginVertical: 5,
  },
  forgot: {
    fontFamily: 'Nunito-Regular',
    fontStyle: 'normal',
    color: 'rgba(58, 61, 66, 0.6)',
    position: 'absolute',
    left: 175,
    padding: 15,
    fontSize: 13,
  },
  btnSubmit: {
    padding: 15,
    backgroundColor: '#fff',
  },
  submited: {
    shadowColor: 'rgba(100, 87, 87, 0.05)',
    borderRadius: 12,
  },
  btnlog: {
    borderRadius: 12,
    padding: 7,
    backgroundColor: '#6379F4',
  },
});
export default Register;
