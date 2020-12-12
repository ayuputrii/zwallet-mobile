import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {IconButton, Text, Card} from 'react-native-paper';
import {useSelector} from 'react-redux';

const PersonalContact = (props) => {
  const {data} = useSelector((state) => state.user);

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
                Personal Information
              </Text>
            </Text>
            <Text style={styles.txt}>
              We got your personal information from the sign up proccess. If you
              want to make changes on your information, contact our support.
            </Text>
            <View style={styles.inputWrap}>
              <Card
                style={{
                  borderRadius: 12,
                  height: 80,
                }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    color: '#7A7886',
                    marginLeft: 15,
                    marginTop: 10,
                  }}>
                  First Name
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
                      {data.name}
                    </Text>
                  </Text>
                </Card.Content>
              </Card>
            </View>
            <View style={styles.inputWrap}>
              <Card
                style={{
                  borderRadius: 12,
                  height: 80,
                }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    color: '#7A7886',
                    marginLeft: 15,
                    marginTop: 10,
                  }}>
                  Last Name
                </Text>
                <Card.Content>
                  {data ? (
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
                        {data.lastName}
                      </Text>
                    </Text>
                  ) : (
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
                        There is no last name
                      </Text>
                    </Text>
                  )}
                </Card.Content>
              </Card>
            </View>
            <View style={styles.inputWrap}>
              <Card
                style={{
                  borderRadius: 12,
                  height: 80,
                }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    color: '#7A7886',
                    marginLeft: 15,
                    marginTop: 10,
                  }}>
                  Veified E-mail
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
                      {data.email}
                    </Text>
                  </Text>
                </Card.Content>
              </Card>
            </View>
            <View style={styles.inputWrap}>
              <Card
                style={{
                  borderRadius: 12,
                  height: 80,
                }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    color: '#7A7886',
                    marginLeft: 15,
                    marginTop: 10,
                  }}>
                  Phone Number
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
                      marginRight: 20,
                      marginTop: 28,
                    }}
                    onPress={() => props.navigation.navigate('ManagePhone')}>
                    Manage
                  </Text>
                </View>
                <Card.Content>
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {data?.data ? (
                      <Text
                        style={{
                          color: '#4D4B57',
                          fontStyle: 'normal',
                          fontWeight: 'bold',
                          color: '#6379F4',
                        }}
                        onPress={() => props.navigation.navigate('AddPhone')}>
                        Add Phone Number
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#4D4B57',
                          fontStyle: 'normal',
                          fontWeight: 'bold',
                        }}>
                        + {splitPhone(data.phone)}
                      </Text>
                    )}
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
    padding: 12,
    marginBottom: 10,
    textAlign: 'left',
    fontStyle: 'normal',
  },
  inputWrap: {
    padding: 10,
    minHeight: 10,
  },
});
export default PersonalContact;
