import React from 'react';
import {StyleSheet, ScrollView, View, StatusBar, Modal} from 'react-native';
import {IconButton, Text, Card, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  topup,
  chargeTopup20k,
  chargeTopup50k,
  chargeTopup100k,
} from '../../Redux/Action/Topup';
import style from '../../Helper';

const Topup = (props) => {
  const dispatch = useDispatch();
  const {data, token20k, token50k, token100k, loading} = useSelector(
    (s) => s.topup,
  );
  const {token} = useSelector((s) => s.auth);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    dispatch(topup(token));
  }, []);

  const selectedItem = () => {
    setModalVisible(true);
  };
  return (
    <>
      <StatusBar backgroundColor={style.primary} />

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
                onPress={() => props.navigation.navigate('Home')}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
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
                Top Up
              </Text>
            </Text>
            <View style={{padding: 15, marginTop: 35}}>
              <Card
                style={{
                  borderRadius: 10,
                  fontFamily: 'Nunito-Regular',
                  height: 92,
                }}>
                <SafeAreaView style={styles.historyContainer}>
                  <View>
                    <Card
                      style={{
                        backgroundColor: '#EBEEF2',
                        borderRadius: 12,
                        padding: 4,
                      }}
                      mode="contained">
                      <IconButton
                        color="#6379F4"
                        icon="plus"
                        onPress={() => selectedItem()}
                      />
                    </Card>
                  </View>
                </SafeAreaView>
                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}></View>
                        <View style={styles.inputWrap}>
                          <View style={styles.inputItem}>
                            <View style={{padding: 7}}>
                              <Button
                                style={{
                                  elevation: 10,
                                  borderRadius: 12,
                                }}
                                mode="contained"
                                onClick={() => window.snap.pay(token20k)}>
                                Charge 20k
                              </Button>
                            </View>
                            <View style={{padding: 7}}>
                              <Button
                                style={{
                                  elevation: 10,
                                  marginTop: 2,
                                  borderRadius: 12,
                                }}
                                mode="contained"
                                onClick={() => window.snap.pay(token50k)}>
                                Charge 50k
                              </Button>
                            </View>
                            <View style={{padding: 7}}>
                              <Button
                                style={{
                                  elevation: 10,
                                  marginTop: 2,
                                  borderRadius: 12,
                                }}
                                onClick={() => window.snap.pay(token20k)}
                                mode="contained"
                                onClick={() => window.snap.pay(token100k)}>
                                Charge 100k
                              </Button>
                            </View>
                            <View style={{padding: 7}}>
                              <Button
                                style={{
                                  elevation: 10,
                                  marginTop: 2,
                                  borderRadius: 12,
                                }}
                                mode="contained"
                                onPress={() => setModalVisible(false)}>
                                Close
                              </Button>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    marginLeft: 95,
                    marginTop: 18,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Nunito-Regular',
                      fontSize: 14,
                      color: '#4D4B57',
                    }}>
                    Virtual Account Number
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    marginTop: 48,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  <Text
                    style={{
                      marginLeft: 95,
                      fontSize: 16,
                      color: '#7A7886',
                      fontWeight: 'bold',
                    }}>
                    2389 081393877946
                  </Text>
                </View>
              </Card>
            </View>
            <Text style={styles.txtt}>
              We provide you virtual account number for top up via nearest ATM.
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                marginBottom: 20,
                top: 14,
                fontStyle: 'normal',
                fontFamily: 'Nunito-Regular',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#514F5B',
                }}>
                How to Top-Up
              </Text>
            </Text>
            <View style={{padding: 15}}>
              {loading ? (
                <View>
                  <Text>Loading ...</Text>
                </View>
              ) : (
                typeof data === 'object' &&
                data.map((item, index) => {
                  return (
                    <Card
                      style={{
                        borderRadius: 10,
                        height: 72,
                        marginBottom: 12,
                        elevation: 2,
                      }}
                      key={index}>
                      <SafeAreaView style={styles.historyContainer}>
                        <View>
                          <View
                            style={{fontWeight: 'bold'}}
                            onPress={() => selectedItem()}
                          />
                          <Text
                            style={{
                              marginLeft: 3,
                              color: '#6379F4',
                              fontSize: 16,
                              fontFamily: 'Nunito-Regular',
                            }}>
                            {index + 1}
                          </Text>
                        </View>
                      </SafeAreaView>
                      <View
                        style={{
                          position: 'absolute',
                          marginLeft: 70,
                          marginTop: 18,
                          fontWeight: 'normal',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Nunito-Regular',
                            fontSize: 12,
                            color: '#7A7886',
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </Card>
                  );
                })
              )}
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
    left: 2,
    padding: 10,
    textAlign: 'left',
    fontStyle: 'normal',
  },
  txtt: {
    fontFamily: 'Nunito-Regular',
    color: 'rgba(58, 61, 66, 0.6)',
    padding: 20,
    textAlign: 'center',
    fontStyle: 'normal',
  },
  txt1: {
    fontFamily: 'Nunito-Regular',
    color: 'rgba(58, 61, 66, 0.6)',
    padding: 20,
    textAlign: 'left',
    fontStyle: 'normal',
  },
  historyContainer: {
    left: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  inputWrap: {
    padding: 17,
  },
  centeredView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#FAFCFF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    height: 280,
    width: 240,
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 8,
  },
});
export default Topup;
