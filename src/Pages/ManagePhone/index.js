import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {IconButton, Text, Card} from 'react-native-paper';
import {editUser} from '../../Redux/Action/Users';
import {useDispatch, useSelector} from 'react-redux';

const ManagePhone = (props) => {
  const dispatch = useDispatch();
  const {data} = useSelector((s) => s.user);
  const {token} = useSelector((s) => s.auth);

  const onDelete = () => {
    dispatch(editUser({phone: null}, token));
  };

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

  return (
    <>
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
                Manage Phone Number
              </Text>
            </Text>
            <Text style={styles.txt}>
              You can only delete the phone number and then you must add another
              phone number.
            </Text>
            <View style={styles.inputWrap}>
              <Card
                style={{
                  borderRadius: 12,
                  height: 80,
                }}>
                <View style={{position: 'absolute', right: 30, marginTop: 18}}>
                  <IconButton
                    color="red"
                    icon="plus"
                    onPress={() => props.navigation.navigate('AddPhone')}
                  />
                </View>
                <View style={{position: 'absolute', right: 0, marginTop: 18}}>
                  <IconButton
                    color="#BBBBBE"
                    icon="delete-outline"
                    onPress={() => onDelete()}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    color: '#7A7886',
                    marginLeft: 15,
                    marginTop: 10,
                  }}>
                  Primary
                </Text>
                <Card.Content>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    <Text
                      style={{
                        color: '#4D4B57',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                      }}>
                      +62 {splitPhone(data.phone)}
                    </Text>
                  </Text>
                </Card.Content>
              </Card>
            </View>
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
  body: {
    display: 'flex',
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
});
export default ManagePhone;
