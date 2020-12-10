import React, {useRef, useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  ToastAndroid,
  Keyboard,
  BackHandler,
} from 'react-native';
import style from '../../Helper';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {login} from '../../Redux/Action/Login';
import {useDispatch, useSelector} from 'react-redux';

const Login = (props) => {
  const {isLogin, error, isAdmin, isUser, device_token} = useSelector(
    (s) => s.auth,
  );
  const dispatch = useDispatch();
  const inputPassword = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [exitApp, setExitApp] = useState(0);
  const [width, setWidth] = useState(300);

  const onSubmit = async () => {
    dispatch(login({email, password, device_token}));
    if (isLogin && !isAdmin && isUser) {
      ToastAndroid.show(`Login Success ${data.name}`, ToastAndroid.SHORT);
    }

    if (isLogin && isAdmin && !isUser) {
      ToastAndroid.show(
        'Your account is admin please login on our web',
        ToastAndroid.LONG,
      );
    }

    if (error && !isLogin) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  const onChange = () => {
    if (email && password) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };

  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show('Tekan Kembali, untuk keluar.', ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      backHandler.remove();
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, [exitApp]);
  const _keyboardDidShow = () => {
    setWidth(100);
  };

  const _keyboardDidHide = () => {
    setWidth(300);
  };

  return (
    <>
      <StatusBar backgroundColor={style.primary} barStyle="dark-content" />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.zwallet}> Zwallet </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.bgwallet}>
            <Text style={styles.zapp}> Login </Text>
            <Text style={styles.txt}>
              Login to your existing account to access {'\n'}
              all the features in Zwallet
            </Text>
            <View style={styles.inputWrap}>
              <View style={styles.inputItem}>
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: 6,
                    left: -0.1,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  <IconButton color="#444" icon="email-outline" />
                </View>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    paddingLeft: 35,
                    fontFamily: 'Nunito-Regular',
                  }}
                  label="Email"
                  placeholder="Enter your Email"
                  autoCapitalize={'none'}
                  value={email}
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
                    top: 6,
                    left: -0.1,
                  }}>
                  <IconButton color="#444" icon="lock-outline" />
                </View>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    paddingLeft: 35,
                    fontFamily: 'Nunito-Regular',
                  }}
                  label="Paassword"
                  placeholder="Enter your Password"
                  autoCapitalize={'none'}
                  ref={inputPassword}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  onSubmitEditing={() => onSubmit()}
                  secureTextEntry={hidePassword}
                  returnKeyType="send"
                />
                <View style={{position: 'absolute', right: 0}}>
                  <IconButton
                    onPress={() => setHidePassword(!hidePassword)}
                    color="#444"
                    icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.forgot}>
                  <Text
                    style={{
                      color: '#3A3D42',
                      fontFamily: 'Nunito-Regular',
                    }}
                    onPress={() => props.navigation.navigate('ResetPassword')}>
                    Forgot Password ?
                  </Text>
                </Text>
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
              onPress={() => onSubmit()}>
              {' '}
              Login
            </Button>
          </View>
          <View style={{padding: 20, flex: 1, flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'rgba(58, 61, 66, 0.8)',
                textAlign: 'center',
                fontSize: 16,
              }}>
              Don't have an account? Let's
            </Text>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                color: '#6379F4',
                fontWeight: 'bold',
              }}
              onPress={() => props.navigation.navigate('Register')}>
              Sign Up
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
    height: 480,
    marginTop: 20,
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
    borderRadius: 5,
    backgroundColor: 'white',
  },
  forgot: {
    fontFamily: 'Nunito-Regular',
    fontStyle: 'normal',
    color: 'rgba(58, 61, 66, 0.6)',
    position: 'absolute',
    right: 0,
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
export default Login;
