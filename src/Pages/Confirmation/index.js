import React from 'react';
import {StyleSheet, ScrollView, View, Image} from 'react-native';
import {Button, IconButton, Text, Card} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {imageURI} from '../../utils';
import moment from 'moment';

const Confirmation = (props) => {
  const {userTransfer} = useSelector((s) => s.search);
  const {data} = useSelector((s) => s.user);
  const {dataTransfer} = useSelector((s) => s.transfer);

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
                onPress={() => props.navigation.navigate('Amount')}
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
                Confirmation
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                marginTop: 30,
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
                Transfer To
              </Text>
            </Text>
            <View style={{padding: 15, marginTop: 10}}>
              <Card
                style={{
                  borderRadius: 10,
                  fontFamily: 'Nunito-Regular',
                  height: 92,
                }}>
                {userTransfer ? (
                  <Image
                    style={{
                      borderRadius: 10,
                      width: 52,
                      height: 52,
                      marginRight: 15,
                    }}
                    source={{uri: imageURI + userTransfer.photo}}
                  />
                ) : (
                  <Image
                    style={{
                      padding: 20,
                      width: 60,
                      height: 60,
                      marginLeft: 20,
                      marginTop: 15,
                    }}
                    source={require('../../Assets/images/picture.png')}
                  />
                )}
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <Text
                    style={{
                      marginLeft: 100,
                      marginTop: 15,
                      fontSize: 16,
                      color: '#4D4B57',
                      fontWeight: 'bold',
                    }}>
                    {userTransfer.name}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    fontWeight: 'normal',
                    marginTop: 50,
                    marginLeft: 100,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Nunito-Regular',
                      fontSize: 14,
                      color: '#7A7886',
                    }}>
                    +62 {splitPhone(userTransfer.phone)}
                  </Text>
                </View>
              </Card>
            </View>
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
                Details
              </Text>
            </Text>
            <View style={{padding: 15}}>
              <Card
                style={{
                  borderRadius: 10,
                  fontFamily: 'Nunito-Regular',
                  height: 92,
                }}>
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <Text
                    style={{
                      position: 'absolute',
                      fontWeight: 'normal',
                      marginTop: 15,
                      marginLeft: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 16,
                        color: '#7A7886',
                      }}>
                      Amount
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    marginLeft: 15,
                    marginTop: 45,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#514F5B',
                    }}>
                    Rp{dataTransfer.amount}
                  </Text>
                </View>
              </Card>
            </View>
            <View style={{padding: 15}}>
              <Card
                style={{
                  borderRadius: 10,
                  fontFamily: 'Nunito-Regular',
                  height: 92,
                }}>
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <Text
                    style={{
                      position: 'absolute',
                      fontWeight: 'normal',
                      marginTop: 15,
                      marginLeft: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 16,
                        color: '#7A7886',
                      }}>
                      Balance Left
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    marginLeft: 15,
                    marginTop: 45,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#514F5B',
                    }}>
                    {data.balance - dataTransfer.amount}
                  </Text>
                </View>
              </Card>
            </View>
            <View style={{padding: 15}}>
              <Card
                style={{
                  borderRadius: 10,
                  fontFamily: 'Nunito-Regular',
                  height: 92,
                }}>
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <Text
                    style={{
                      position: 'absolute',
                      fontWeight: 'normal',
                      marginTop: 15,
                      marginLeft: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 16,
                        color: '#7A7886',
                      }}>
                      Date & Time
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    marginLeft: 15,
                    marginTop: 45,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#514F5B',
                    }}>
                    {moment().format('LL', 'LT')}
                  </Text>
                </View>
              </Card>
            </View>
            <View style={{padding: 15}}>
              <Card
                style={{
                  borderRadius: 10,
                  fontFamily: 'Nunito-Regular',
                  height: 92,
                }}>
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <Text
                    style={{
                      position: 'absolute',
                      fontWeight: 'normal',
                      marginTop: 15,
                      marginLeft: 15,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 16,
                        color: '#7A7886',
                      }}>
                      Notes
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    marginLeft: 15,
                    marginTop: 45,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#514F5B',
                    }}>
                    {dataTransfer.note}
                  </Text>
                </View>
              </Card>
            </View>
          </View>
        </View>
        <View style={styles.btnSubmit}>
          <View style={{padding: 10}}>
            <Button
              style={{
                borderRadius: 12,
                padding: 10,
                backgroundColor: '#6379F4',
              }}
              mode="contained"
              onPress={() => props.navigation.navigate('PinConfirmation')}>
              Continue
            </Button>
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
  txt1: {
    fontFamily: 'Nunito-Regular',
    color: 'rgba(58, 61, 66, 0.6)',
    padding: 20,
    textAlign: 'left',
    fontStyle: 'normal',
  },
  historyContainer: {
    left: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90,
    marginBottom: 20,
  },
  btnSubmit: {
    padding: 15,
    backgroundColor: '#FAFCFF',
  },
});
export default Confirmation;
