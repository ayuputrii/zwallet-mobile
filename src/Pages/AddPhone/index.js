import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {editUser} from '../../Redux/Action/Users';
import style from '../../Helper';

const AddPhone = (props) => {
  const [phone, setPhone] = React.useState('');
  const dispatch = useDispatch();
  const {data, isEditFailed} = useSelector((state) => state.user);
  const {token} = useSelector((state) => state.auth);

  const onSubmit = () => {
    dispatch(editUser({phone}, token));
    if (isEditFailed) {
      ToastAndroid.show('Phone already exist', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Phone Success', ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <StatusBar backgroundColor={style.primary} barStyle="light-content" />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
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
                onPress={() => props.navigation.navigate('PersonalContact')}
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
                Add Phone Number
              </Text>
            </Text>
            <Text style={styles.txt}>
              Add at least one phone number for the transfer {`\n`} ID so you
              can start transfering your money to another user.
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
                  <IconButton color="#444" icon="phone" />
                </View>
                <TextInput
                  style={{
                    backgroundColor: '#FAFCFF',
                    paddingLeft: 35,
                    fontFamily: 'Nunito-Regular',
                  }}
                  autoCapitalize={'none'}
                  value={phone}
                  onChangeText={(numpad) => setPhone(numpad)}
                  keyboardType="number-pad"
                  disabled={false}
                  onSubmitEditing={() => onSubmit()}
                  returnKeyType="send"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        <View style={{padding: 29}}>
          <Button
            style={{
              borderRadius: 10,
              padding: 5,

              backgroundColor: '#6379F4',
            }}
            mode="contained"
            onPress={() => onSubmit()}>
            {/* // onPress={() => props.navigation.navigate('ManagePhone')}>  */}
            Submit
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
  },
  zapp: {
    textAlign: 'left',
    fontSize: 24,
    color: '#3A3D42',
    fontWeight: 'bold',
  },
  txt: {
    fontFamily: 'Nunito-Regular',
    color: 'rgba(58, 61, 66, 0.6)',
    marginTop: 40,
    padding: 10,
    textAlign: 'center',
    fontStyle: 'normal',
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
  },
  forgot: {
    fontStyle: 'normal',
    color: '#3A3D42',
    color: 'rgba(58, 61, 66, 0.6)',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 10,
    right: 25,
  },
  btnSubmit: {
    marginTop: 90,
    padding: 15,
    backgroundColor: '#fff',
  },
  submited: {
    shadowColor: 'rgba(100, 87, 87, 0.05)',
    borderRadius: 12,
  },
});
export default AddPhone;
