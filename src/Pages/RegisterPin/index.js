import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, ScrollView, View, TextInput} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {regPin} from '../../Redux/Action/Register';
import {useDispatch} from 'react-redux';

const RegisterPin = (props) => {
  const inputPin1 = React.useRef('');
  const inputPin2 = React.useRef('');
  const inputPin3 = React.useRef('');
  const inputPin4 = React.useRef('');
  const inputPin5 = React.useRef('');
  const [pin1, setPin1] = React.useState('');
  const [pin2, setPin2] = React.useState('');
  const [pin3, setPin3] = React.useState('');
  const [pin4, setPin4] = React.useState('');
  const [pin5, setPin5] = React.useState('');
  const [pin6, setPin6] = React.useState('');

  const dispatch = useDispatch();
  const pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;

  const handlePin = () => {
    AsyncStorage.getItem('RegisterMail').then((res) => {
      dispatch(
        regPin({
          email: res,
          pin: pin,
        }),
        setPin1(''),
        setPin2(''),
        setPin3(''),
        setPin4(''),
        setPin5(''),
        setPin6(''),
      );
      props.navigation.navigate('RegSuccess');
    });
  };
  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View>
          <Text style={styles.zwallet}> Zwallet </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.bgwallet}>
            <Text style={styles.zapp}> Create Security PIN </Text>
            <Text style={styles.txt}>
              Create a PIN that’s contain 6 digits number for {'\n'} security
              purpose in Zwallet.
            </Text>
            <View style={{padding: 10, marginTop: 20, flexDirection: 'row'}}>
              <TextInput
                style={{
                  height: 58,
                  width: 47,
                  fontSize: 25,
                  marginLeft: 10,
                  paddingLeft: 3,
                  backgroundColor: '#fff',
                  borderColor: 'rgba(58, 61, 66, 0.6)',
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#6379F4',
                }}
                onSubmitEditing={() => inputPin1.current.focus()}
                returnKeyType="next"
                value={pin1}
                onChangeText={(number) => setPin1(number)}
                keyboardType="number-pad"
                disabled={false}
                fontFamily="Nunito-Regular"
                textAlign="center"
                maxLength={1}></TextInput>
              <TextInput
                style={{
                  height: 58,
                  width: 47,
                  fontSize: 25,
                  marginLeft: 8,
                  paddingLeft: 3,
                  backgroundColor: '#fff',
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#6379F4',
                }}
                ref={inputPin1}
                onSubmitEditing={() => inputPin2.current.focus()}
                returnKeyType="next"
                value={pin2}
                onChangeText={(number) => setPin2(number)}
                keyboardType="number-pad"
                disabled={false}
                fontFamily="Nunito-Regular"
                textAlign="center"
                maxLength={1}></TextInput>
              <TextInput
                style={{
                  height: 58,
                  width: 47,
                  fontSize: 25,
                  marginLeft: 8,
                  paddingLeft: 3,
                  backgroundColor: '#fff',
                  borderColor: 'rgba(58, 61, 66, 0.6)',
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#6379F4',
                }}
                ref={inputPin2}
                onSubmitEditing={() => inputPin3.current.focus()}
                returnKeyType="next"
                value={pin3}
                onChangeText={(number) => setPin3(number)}
                keyboardType="number-pad"
                disabled={false}
                fontFamily="Nunito-Regular"
                textAlign="center"
                maxLength={1}></TextInput>
              <TextInput
                style={{
                  height: 58,
                  width: 47,
                  fontSize: 25,
                  marginLeft: 8,
                  paddingLeft: 3,
                  backgroundColor: '#fff',
                  borderColor: 'rgba(58, 61, 66, 0.6)',
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#6379F4',
                }}
                ref={inputPin3}
                onSubmitEditing={() => inputPin4.current.focus()}
                returnKeyType="next"
                value={pin4}
                onChangeText={(number) => setPin4(number)}
                keyboardType="number-pad"
                disabled={false}
                fontFamily="Nunito-Regular"
                textAlign="center"
                maxLength={1}></TextInput>
              <TextInput
                style={{
                  height: 58,
                  width: 47,
                  fontSize: 25,
                  marginLeft: 8,
                  paddingLeft: 3,
                  backgroundColor: '#fff',
                  borderColor: 'rgba(58, 61, 66, 0.6)',
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#6379F4',
                }}
                ref={inputPin4}
                onSubmitEditing={() => inputPin5.current.focus()}
                returnKeyType="next"
                value={pin5}
                onChangeText={(number) => setPin5(number)}
                keyboardType="number-pad"
                disabled={false}
                fontFamily="Nunito-Regular"
                textAlign="center"
                maxLength={1}></TextInput>
              <TextInput
                style={{
                  height: 58,
                  width: 47,
                  fontSize: 25,
                  marginLeft: 8,
                  paddingLeft: 3,
                  backgroundColor: '#fff',
                  borderColor: 'rgba(58, 61, 66, 0.6)',
                  borderWidth: 1,
                  borderRadius: 10,
                  color: '#6379F4',
                }}
                ref={inputPin5}
                returnKeyType="next"
                value={pin6}
                onChangeText={(number) => setPin6(number)}
                onSubmitEditing={() => handlePin()}
                keyboardType="number-pad"
                disabled={false}
                fontFamily="Nunito-Regular"
                textAlign="center"
                maxLength={1}></TextInput>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        <View style={{padding: 25, backgroundColor: '#fff'}}>
          <Button
            style={{
              marginBottom: 30,
              borderRadius: 12,
              padding: 7,
              backgroundColor: '#6379F4',
            }}
            mode="contained"
            onPress={() => handlePin()}>
            Continue
          </Button>
        </View>
      </View>
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
    height: 390,
    marginTop: 40,
    elevation: 20,
  },
  zapp: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3A3D42',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 40,
  },
  txt: {
    fontFamily: 'Nunito-Regular',
    color: 'rgba(58, 61, 66, 0.6)',
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: 20,
  },
  btnSubmit: {
    padding: 15,
    backgroundColor: '#fff',
  },
});
export default RegisterPin;
