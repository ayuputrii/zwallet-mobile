import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {IconButton} from 'react-native-paper';

import {RectButton} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {checkPin, editUser} from '../../Redux/Action/Users';
import style from '../../Helper';import SmoothPin from 'react-native-smooth-pincode-input';

const ChangePin = (props) => {
  const pinInput = useRef();
  const [pin, setPin] = useState('');
  const [isFull, setFull] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isFullNew, setFullNew] = useState(false);
  const dispatch = useDispatch();
  const {token} = useSelector((s) => s.auth);
  const {pinCheck, checkedPin, isEditSuccess} = useSelector(
    (s) => s.user,
  );

  const onSubmit = () => {
    if (isFull) {
      dispatch(checkPin({pin}, token));
    } else {
      ToastAndroid.show('PIN must be Fulfilled', ToastAndroid.SHORT);
    }
  };

  const pinChange = () => {
    if (isFullNew) {
      dispatch(
        editUser(
          {
            pin: newPin,
          },
          token,
        ),
      );
      if (isEditSuccess) {
        props.navigation.navigate('Profile');
      }
    } else {
      ToastAndroid.show('PIN must be Fulfilled', ToastAndroid.SHORT);
    }
  };

  if (checkedPin) {
    return (
      <>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          <View>
            <View
              style={{
                position: 'absolute',
                zIndex: 10,
                top: 27,
                left: 5,
              }}>
              <IconButton
                color="#4D4B57"
                icon="arrow-left"
                onPress={() => props.navigation.navigate('Profile')}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                left: 55,
                marginTop: 20,
                top: 15,
                fontFamily: 'Nunito-Regular',
              }}>
              <Text
                style={{
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  color: '#4D4B57',
                }}>
                Enter Your PIN
              </Text>
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 16,
              height: Dimensions.get('screen').height / 1.5,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: style.darkMed,
                  marginTop: 40,
                  marginBottom: 50,
                  lineHeight: 27,
                }}>
                Type your new 6 digits security PIN to use in Zwallet.
              </Text>
              <View>
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
                  cellSpacing={10}
                  cellSize={55}
                  value={newPin}
                  onTextChange={(pin) => {
                    setNewPin(pin);
                    pin.length < 6 ? setFullNew(false) : setFullNew(true);
                  }}
                  onFulfill={() => setFullNew(true)}
                  onBackspace={() => setFullNew(false)}
                />
              </View>
            </View>
            <RectButton
              onPress={pinChange}
              style={isFullNew ? styles.buttonPrimary : styles.buttonGrey}>
              <Text
                style={{
                  color: isFullNew ? style.white : style.darkGrey,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Change PIN
              </Text>
            </RectButton>
          </View>
        </ScrollView>
      </>
    );
  } else {
    return (
      <>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          <View>
            <View
              style={{
                position: 'absolute',
                zIndex: 10,
                top: 27,
                left: 5,
              }}>
              <IconButton
                color="#4D4B57"
                icon="arrow-left"
                onPress={() => props.navigation.navigate('Profile')}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                left: 55,
                marginTop: 20,
                top: 15,
                fontFamily: 'Nunito-Regular',
              }}>
              <Text
                style={{
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  color: '#4D4B57',
                }}>
                Enter Your PIN
              </Text>
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 16,
              height: Dimensions.get('screen').height / 1.5,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: style.darkMed,
                  marginTop: 40,
                  marginBottom: 50,
                  lineHeight: 27,
                }}>
                Enter your current 6 digits Zwallet PIN below to continue to the
                next steps.
              </Text>
              <View>
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
                  cellSpacing={10}
                  cellSize={55}
                  value={pin}
                  onTextChange={(pin) => {
                    setPin(pin);
                    pin.length < 6 ? setFull(false) : setFull(true);
                  }}
                  onFulfill={() => setFull(true)}
                  onBackspace={() => setFull(false)}
                />
              </View>
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: style.error,
                fontSize: 16,
              }}>
              {pinCheck}
            </Text>
            <RectButton
              onPress={onSubmit}
              style={isFull ? styles.buttonPrimary : styles.buttonGrey}>
              <Text
                style={{
                  color: isFull ? style.white : style.darkGrey,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Confirm
              </Text>
            </RectButton>
          </View>
        </ScrollView>
      </>
    );
  }
};

export default ChangePin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFCFF',
  },
  buttonPrimary: {
    alignItems: 'center',
    backgroundColor: style.primary,
    width: Dimensions.get('screen').width - 32,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 15,
    marginTop: 10,
  },
  buttonGrey: {
    backgroundColor: '#DADADA',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 32,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 15,
    marginTop: 10,
  },
});
