import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import style from '../../Helper';
import {imageURI} from '../../utils';
import {IconButton, Card} from 'react-native-paper';
import Income from '../../Assets/icons/arrow-down.svg';
import Expense from '../../Assets/icons/arrow-up.svg';

const Transaction = (props) => {
  const {data} = useSelector((s) => s.user);
  const {dataAll} = useSelector((s) => s.history);

  const handleGraph = (stats) => {
    let income = 0;
    let expense = 0;
    dataAll.forEach((item) => {
      if (item.receiver === data.name || item.name) {
        income += item.amount;
      } else {
        expense += item.amount;
      }
    });

    if (stats === 'income') {
      return income;
    } else {
      return expense;
    }
  };
  const renderItem = ({item, index}) => {
    if (index < 4 && !item.name) {
      return (
        <View key={index} style={styles.card}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              style={{borderRadius: 10, width: 52, height: 52, marginRight: 20}}
              source={{uri: imageURI + data.photo}}
            />
            <View style={{justifyContent: 'space-between'}}>
              <Text>
                {item.receiver === data.name ? item.sender : item.receiver}
              </Text>
              <Text>Transfer</Text>
            </View>
          </View>
          <Text
            style={
              item.receiver === data.name ? {color: 'green'} : {color: 'red'}
            }>
            {item.receiver === data.name ? '+' : '-'}
            {item.amount}
          </Text>
        </View>
      );
    } else if (index < 4 && item.name) {
      return (
        <View key={index} style={styles.card}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              style={{borderRadius: 10, width: 52, height: 52, marginRight: 20}}
              source={require('../../Assets/images/logo-topup.png')}
            />
            <View style={{justifyContent: 'space-between'}}>
              <Text>Charge</Text>
              <Text>Top Up</Text>
            </View>
          </View>
          <Text style={{color: 'green'}}>+{item.amount}</Text>
        </View>
      );
    }
  };

  return (
    <>
      <StatusBar backgroundColor={style.primary} barStyle="light-content" />
      <SafeAreaView>
        <View>
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="always">
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
                  Transaction
                </Text>
              </Text>
              <Card.Content>
                <View style={styles.label}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 30,
                      marginTop: 5,
                    }}>
                    <Income />
                    <View style={styles.amount}>
                      <Text style={styles.stats}>Income</Text>
                      <Text style={styles.total}>
                        Rp{handleGraph('income')}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      marginRight: 50,
                    }}>
                    <Expense />
                    <View style={styles.amount}>
                      <Text style={styles.stats}>Expense</Text>
                      <Text style={styles.total}>
                        Rp{handleGraph('expense')}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </View>
            <View style={{paddingHorizontal: 16}}>
              <Text
                style={{color: style.title, fontSize: 18, fontWeight: 'bold'}}>
                In This Week
              </Text>
              <VerticalBarGraph
                data={[20, 45, 28, 80, 99, 43, 50]}
                labels={['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thue', 'Fri']}
                width={Dimensions.get('window').width}
                height={300}
                barRadius={8}
                barWidthPercentage={0.4}
                barColor="#6379F4"
                baseConfig={{
                  hasXAxisBackgroundLines: false,
                  xAxisLabelStyle: {
                    position: 'right',
                  },
                }}
                style={{
                  padding: 2,
                  paddingTop: 30,
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={styles.bottom}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                  marginBottom: 25,
                }}>
                <Text
                  style={{
                    color: style.title,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Transaction History
                </Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('History')}>
                  <Text style={{color: style.primary}}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={dataAll}
                keyExtractor={({item, index}) => index}
                renderItem={renderItem}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  bottom: {
    paddingVertical: 30,
  },
  button: {
    padding: 16,
    backgroundColor: style.grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  card: {
    backgroundColor: style.white,
    marginHorizontal: 0,
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  label: {
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#6379F4',
    fontFamily: 'Nunito-Regular',
    color: '#D0D0D0',
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  panelLabel: {
    justifyContent: 'center',
  },
  amount: {
    marginLeft: 10,
    justifyContent: 'space-around',
    height: 50,
  },
  stats: {
    marginLeft: 0,
    color: '#D0D0D0',
    fontSize: 16,
  },
  total: {
    marginLeft: 0,
    color: '#F1F1F1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
