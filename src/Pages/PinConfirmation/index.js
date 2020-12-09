import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {RectButton} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {transfer} from '../../Redux/Action/Transfer';
import style from '../../Helper';
import SmoothPin from 'react-native-smooth-pincode-input';

const PinConfirmation = (props) => {
  const pinInput = useRef();
  const [pin, setPin] = useState('');
  const [isFull, setFull] = useState(false);
  const dispatch = useDispatch();
  const {dataTransfer, messagePIN, isSuccess, isFailed} = useSelector(
    (s) => s.transfer,
  );
  const {userTransfer} = useSelector((s) => s.search);
  const {data} = useSelector((s) => s.user);
  const {token} = useSelector((s) => s.auth);

  useEffect(() => {
    if (isSuccess || (isFailed && !messagePIN)) {
      ToastAndroid.show(
        `Transfer ${isSuccess ? 'Success' : 'Failed'}`,
        ToastAndroid.SHORT,
      );
      props.navigation.replace('StatusConfirm');
    }
  }, [isSuccess, isFailed]);

  const checkPin = (pin) => {
    setFull(true);
  };

  const onSubmit = () => {
    if (isFull) {
      dispatch(
        transfer(
          token,
          {
            ...dataTransfer,
            pin,
            sender: data.name,
            photo_sender: data.photo,
            device_token: userTransfer.device_token,
          },
          userTransfer.balance,
        ),
      );
    } else {
      ToastAndroid.show('PIN must be Fulfilled', ToastAndroid.SHORT);
    }

    if (isFailed && messagePIN && !isSuccess) {
      pinInput.current.shake();
      ToastAndroid.show(messagePIN, ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={style.primary} />
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
              Enter PIN to Transfer
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
              Enter your 6 digits PIN for confirmation to continue transferring
              money.
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
                onFulfill={checkPin}
                onBackspace={() => setFull(false)}
              />
            </View>
          </View>
          <RectButton
            onPress={onSubmit}
            style={isFull ? styles.buttonPrimary : styles.buttonGrey}>
            <Text
              style={{
                color: isFull ? style.white : style.darkGrey,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Transfer Now
            </Text>
          </RectButton>
        </View>
      </ScrollView>
    </>
  );
};

export default PinConfirmation;

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
