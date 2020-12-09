import React from 'react';
import {StyleSheet, ScrollView, View, TextInput, Linking} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {RegisterPassword} from '../../Redux/Action/Register';

const ResetPassword = (props) => {
  const inputPassword = React.useRef();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      RegisterPassword({
        email: email,
        password: password,
      }),
      setPassword(''),
      setEmail(''),
    );
    props.navigation.navigate('Login');
  };

  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.zwallet}> Zwallet </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.bgwallet}>
            <Text style={styles.zapp}> Reset Password </Text>
            <Text style={styles.txt}>
              Enter your Zwallet e-mail so we can send {'\n'}
              you a password reset link.
            </Text>
            <View style={styles.inputWrap}>
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
                  style={{paddingLeft: 35, fontFamily: 'Nunito-Regular'}}
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
                    top: 3,
                    left: -0.1,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  <IconButton color="#444" icon="lock-outline" />
                </View>
                <TextInput
                  style={{paddingLeft: 35, fontFamily: 'Nunito-Regular'}}
                  placeholder="Enter your Email"
                  autoCapitalize={'none'}
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
              disabled={loading}
              loading={loading}
              onPress={() => onSubmit()}>
              {/* onPress={() => props.navigation.navigate('Login')}> */}
              Confirm
            </Button>
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
    marginTop: 70,
  },
  body: {
    display: 'flex',
  },
  bgwallet: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: 'white',
    marginTop: 50,
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
    borderBottomColor: 'rgba(169, 169, 169, 0.6)',
    borderBottomWidth: 2,
    marginVertical: 5,
    borderRadius: 5,
  },
  btnSubmit: {
    marginTop: 40,
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
export default ResetPassword;
