import React from 'react';
import {StyleSheet, ScrollView, View, Image, StatusBar} from 'react-native';
import {IconButton, Text, Card, Paragraph} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getHistory} from '../../Redux/Action/History';
import {userLogout} from '../../Redux/Action/Users';
import {logout} from '../../Redux/Action/Login';
import {imageURI} from '../../utils';
import style from '../../Helper';

const Home = (props) => {
  const dispatch = useDispatch();
  const {token} = useSelector((s) => s.auth);
  const {data, loading} = useSelector((s) => s.user);
  const {dataAll} = useSelector((s) => s.history);

  React.useEffect(() => {
    dispatch(getHistory(token));
  }, []);

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

  const onLogout = () => {
    dispatch(logout());
    dispatch(userLogout());
  };

  return (
    <>
      <StatusBar backgroundColor={style.primary} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View>
          <View>
            <View style={{padding: 20, flex: 1, flexDirection: 'row'}}>
              {data ? (
                <Image
                  style={{
                    marginTop: 15,
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                  }}
                  source={{uri: imageURI + data.photo}}
                />
              ) : (
                <Image
                  style={{
                    marginTop: 15,
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                  }}
                  source={require('../../Assets/images/picture.png')}
                />
              )}
              <Text
                style={{
                  fontSize: 16,
                  left: 20,
                  top: 15,
                  fontFamily: 'Nunito-Regular',
                  color: '#444',
                }}>
                Hello, {'\n'}
                <Text
                  style={{
                    fontSize: 18,
                    left: 2,
                    fontFamily: 'Nunito-Regular',
                    color: '#646464',
                  }}>
                  <Text
                    style={{
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                    }}
                    onPress={() => props.navigation.navigate('Profile')}>
                    {data ? data.name : 'Please input name'}
                  </Text>
                </Text>
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                padding: 44,
                right: 0,
              }}>
              <IconButton
                style={{
                  marginTop: 46,
                  position: 'absolute',
                  left: 30,
                }}
                color="#4D4B57"
                icon="bell-outline"
                onPress={() =>
                  props.navigation.navigate('Notification')
                }></IconButton>
            </View>

            <View style={styles.inputWrap}>
              <Card
                style={{
                  borderRadius: 16,
                  backgroundColor: '#6379F4',
                }}
                onPress={() => props.navigation.navigate('DetailTransaction')}>
                <Card.Content>
                  <Paragraph
                    style={{
                      left: 10,
                      color: '#D0D0D0',
                      fontFamily: 'Nunito-Regular',
                    }}>
                    Balance
                  </Paragraph>
                  {data ? (
                    <Text
                      style={{
                        fontSize: 20,
                        padding: 10,
                        color: '#FFFFFF',
                        fontFamily: 'Nunito-Regular',
                      }}>
                      <Text
                        style={{
                          marginLeft: 10,
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                        }}>
                        Rp. {data.balance}
                      </Text>
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 20,
                        padding: 10,
                        color: '#FFFFFF',
                        fontFamily: 'Nunito-Regular',
                      }}>
                      <Text
                        style={{
                          marginLeft: 10,
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                        }}>
                        0
                      </Text>
                    </Text>
                  )}
                  {data ? (
                    <Paragraph
                      style={{
                        left: 10,
                        marginTop: 10,
                        color: '#D0D0D0',
                        fontFamily: 'Nunito-Regular',
                      }}>
                      +62 {splitPhone(data.phone)}
                    </Paragraph>
                  ) : (
                    <Paragraph
                      style={{
                        left: 10,
                        color: '#D0D0D0',
                        fontFamily: 'Nunito-Regular',
                      }}>
                      Phone Not Detected!
                    </Paragraph>
                  )}
                </Card.Content>
              </Card>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Card
                  style={{
                    width: 148,
                    height: 48,
                    marginTop: 20,
                    borderRadius: 12,
                    backgroundColor: '#E5E8ED',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      left: 20,
                    }}>
                    <IconButton
                      color="#608DE2"
                      icon="arrow-up"
                      onPress={() =>
                        props.navigation.navigate('SearchReceiver')
                      }
                    />
                  </View>
                  <Text
                    style={{
                      position: 'absolute',
                      marginTop: 12,
                      left: 62,
                      fontWeight: 'bold',
                      color: '#514F5B',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                      }}
                      onPress={() => props.navigation.navigate('Amount')}>
                      Transfer
                    </Text>
                  </Text>
                </Card>
                <Card
                  style={{
                    height: 48,
                    marginTop: 20,
                    borderRadius: 12,
                    marginLeft: 30,
                    flex: 1,
                    backgroundColor: '#E5E8ED',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      left: 20,
                    }}>
                    <IconButton
                      color="#608DE2"
                      icon="plus"
                      onPress={() =>
                        props.navigation.navigate('Topup')
                      }></IconButton>
                  </View>
                  <Text
                    style={{
                      position: 'absolute',
                      marginTop: 12,
                      left: 62,
                      fontWeight: 'bold',
                      color: '#514F5B',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                      }}>
                      Top Up
                    </Text>
                  </Text>
                </Card>
              </View>
              <View>
                <View
                  style={{
                    marginTop: 40,
                    color: '#514F5B',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    <Text
                      style={{
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                      }}>
                      Transaction History
                    </Text>
                  </Text>
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                    }}>
                    <Text
                      style={{
                        color: '#6379F4',
                        fontFamily: 'Nunito-Regular',
                      }}
                      onPress={() => props.navigation.navigate('History')}>
                      See all
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {loading ? (
            <View>
              <Text>Loading ...</Text>
            </View>
          ) : (
            typeof dataAll === 'object' &&
            dataAll.map((item) => {
              return (
                <View style={{padding: 2, marginTop: 12}}>
                  <Card
                    style={{
                      borderRadius: 10,
                      fontFamily: 'Nunito-Regular',
                      height: 92,
                    }}>
                    {data ? (
                      <Image
                        style={{
                          marginTop: 15,
                          width: 60,
                          height: 60,
                          marginLeft: 20,
                          borderRadius: 10,
                        }}
                        source={{uri: imageURI + data.photo}}
                      />
                    ) : (
                      <Image
                        style={{
                          padding: 10,
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
                        {item.receiver === data.name
                          ? item.sender
                          : item.receiver}
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
                          color: '#514F5B',
                        }}>
                        {item.receiver === data.name
                          ? item.sender
                          : item.receiver}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        right: 20,
                      }}>
                      <Text
                        style={{
                          marginTop: 36,
                          color: '#1EC15F',
                          fontWeight: 'bold',
                        }}>
                        {item.receiver === data.name ? '+' : '-'}
                        {item.amount}
                      </Text>
                    </View>
                  </Card>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </>
  );
};
// const Home = (props) => {
//   return (
//     <Drawer.Navigator
//       drawerContentOptions={{
//         activeBackgroundColor: '#6379F4',
//         inactiveBackgroundColor: '#fff',
//         activeTintColor: '#fff',
//       }}
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       drawerType="back"
//       initialRouteName="Home"
//       overlayColor="#ffffff22">
//       <Drawer.Screen name="Home" component={Welcome} />
//     </Drawer.Navigator>
//   );
// };

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  body: {
    backgroundColor: '#FFFF',
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
    padding: 15,
  },
});
