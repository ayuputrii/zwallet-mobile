import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {formFilled} from '../../Redux/Action/Transfer';
import NoteInput from '../../Components/inputBorderBottom';
import style from '../../Helper';
import {IconButton, Card} from 'react-native-paper';
import Edit from '../../Assets/icons/edit.svg';
import EditActive from '../../Assets/icons/edit-active.svg';
import {imageURI} from '../../utils';

const Amount = (props) => {
  const dispatch = useDispatch();
  const noteInput = useRef();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [noteActive, setNoteActive] = useState(false);
  const {userTransfer} = useSelector((s) => s.search);
  const {data} = useSelector((s) => s.user);

  const splitPhone = (phone) => {
    if (phone) {
      const newPhone = phone.split('').map((item, index) => {
        if (index === 2 || index === 6) {
          return item + '-';
        } else {
          return item;
        }
      });

      return newPhone;
    } else {
      return '';
    }
  };

  const onSubmit = () => {
    if (parseInt(amount) && parseInt(amount) <= data.balance) {
      dispatch(
        formFilled({
          amount: parseInt(amount),
          note,
          phone_receiver: userTransfer.phone,
        }),
      );
      props.navigation.navigate('Confirmation');
    } else {
      ToastAndroid.show('Invalid Amount', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={style.primary} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View>
          <View>
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
                  onPress={() => props.navigation.navigate('Home')}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  left: 55,
                  marginBottom: 20,
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
                  Transfer
                </Text>
              </Text>
              <View style={styles.label}>
                {data ? (
                  <Image
                    style={{
                      borderRadius: 10,
                      width: 60,
                      height: 60,
                      marginRight: 15,
                    }}
                    source={{uri: imageURI + data.photo}}
                  />
                ) : (
                  <Image
                    style={{
                      borderRadius: 10,
                      width: 60,
                      height: 60,
                      marginRight: 15,
                    }}
                    source={require('../../Assets/images/picture.png')}
                  />
                )}
                <View>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontSize: 16,
                      color: style.dark,
                      fontWeight: 'bold',
                    }}>
                    {userTransfer.name}
                  </Text>
                  <Text style={{color: style.darkMed, fontSize: 14}}>
                    +62 {splitPhone(userTransfer.phone)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor="#B5BDCC"
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                  style={{
                    fontSize: 42,
                    textAlign: 'center',
                    color: style.primary,
                    fontWeight: '800',
                    marginBottom: 25,
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => noteInput.current.focus()}
                />
                <Text
                  style={{
                    color: '#7C7895',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 40,
                  }}>
                  Rp{data.balance} Available
                </Text>
                <View
                  style={{
                    position: 'relative',
                    width: Dimensions.get('screen').width - 32,
                  }}>
                  <View style={{position: 'absolute', left: 0, top: 10}}>
                    {noteActive ? (
                      <EditActive width={24} height={24} />
                    ) : (
                      <Edit width={24} height={24} />
                    )}
                  </View>
                  <NoteInput
                    inputref={noteInput}
                    setActive={setNoteActive}
                    value={note}
                    onChangeText={(text) => setNote(text)}
                    placeholder="Add some notes"
                    placeholderTextColor="rgba(169, 169, 169, 0.8)"
                    returnKeyType="send"
                  />
                </View>
              </View>
              <RectButton
                onPress={onSubmit}
                style={amount ? styles.buttonPrimary : styles.buttonGrey}>
                <Text
                  style={
                    amount
                      ? {color: style.white, fontSize: 18}
                      : {color: style.darkGrey, fontSize: 18}
                  }>
                  Continue
                </Text>
              </RectButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Amount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFCFF',
  },
  label: {
    backgroundColor: '#FFFF',
    elevation: 2,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  buttonPrimary: {
    alignItems: 'center',
    backgroundColor: style.primary,
    width: Dimensions.get('screen').width - 32,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 15,
    marginTop: 40,
  },
  buttonGrey: {
    backgroundColor: '#DADADA',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 32,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 15,
    marginTop: 40,
  },
});
