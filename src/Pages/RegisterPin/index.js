import React, {useRef, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, ScrollView, View, TextInput} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {regPin} from '../../Redux/Action/Register';
import {useDispatch} from 'react-redux';
import style from '../../Helper';
import SmoothPin from 'react-native-smooth-pincode-input';

const RegisterPin = (props) => {
  const pinInput = useRef();
  const [pin, setPin] = useState('');
  const [isFull, setFull] = useState(false);

  const dispatch = useDispatch();

  const handlePin = () => {
    AsyncStorage.getItem('RegisterMail').then((res) => {
      dispatch(
        regPin({
          email: res,
          pin: pin,
        }),
        setPin(''),
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
              <SmoothPin
                ref={pinInput}
                codeLength={6}
                placeholder={
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(169, 169, 169, 0.6)',
                      width: '60%',
                      height: '80%',
                    }}></View>
                }
                cellStyle={{
                  borderRadius: 10,
                  borderColor: isFull
                    ? style.primary
                    : 'rgba(169, 169, 169, 0.6)',
                  borderWidth: 1,
                  backgroundColor: '#FFFFFF',
                }}
                cellStyleFocused={{
                  borderColor: style.primary,
                }}
                textStyle={{
                  color: style.dark,
                  fontSize: 24,
                  fontWeight: 'bold',
                }}
                cellSpacing={4}
                cellSize={52}
                value={pin}
                onTextChange={(pin) => {
                  setPin(pin);
                  pin.length < 6 ? setFull(false) : setFull(true);
                }}
                onBackspace={() => setFull(false)}
              />
            </View>
          </View>
        </View>
        <View></View>
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
