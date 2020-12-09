import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {getHistoryToday, getHistoryByWeek} from '../../Redux/Action/History';
import style from '../../Helper';
import {IconButton} from 'react-native-paper';
import Income from '../../Assets/icons/arrow-down.svg';
import Expense from '../../Assets/icons/arrow-up.svg';

const Notification = (props) => {
  const dispatch = useDispatch();
  const {data} = useSelector((S) => S.user);
  const {token} = useSelector((S) => S.auth);
  const {dataToday, dataWeek} = useSelector((S) => S.history);

  useEffect(() => {
    dispatch(getHistoryToday(token));
    dispatch(getHistoryByWeek(token));
  }, []);

  const renderItems = ({item, index}) => {
    if (!item.name) {
      return (
        <View key={index} style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            {item.receiver === data.name ? <Income /> : <Expense />}
            <View style={{justifyContent: 'space-between'}}>
              <Text>
                {item.receiver === data.name
                  ? `Transfered from ${item.sender}`
                  : `Transfered to ${item.receiver}`}
              </Text>
              <Text>{item.amount}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View key={index} style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <Income />
            <View style={{justifyContent: 'space-between'}}>
              <Text>Top up from Bank</Text>
              <Text>{item.amount}</Text>
            </View>
          </View>
        </View>
      );
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
                  History
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: 16, marginTop: 40, fontSize: 20}}>
          <Text>Today</Text>
          <FlatList data={dataToday} renderItem={renderItems} />
        </View>
        <View style={{paddingHorizontal: 16, marginTop: 20}}>
          <Text>This Week</Text>
          <FlatList data={dataWeek} renderItem={renderItems} />
        </View>
      </ScrollView>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginTop: 2,
    elevation: 4,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: style.darkMed,
    fontSize: 16,
    marginBottom: 10,
  },
  value: {
    color: style.title,
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: style.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },
  buttonActive: {
    backgroundColor: style.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },
});
