import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import style from '../../Helper';
import Success from '../../Assets/icons/success.svg';

const RegSuccess = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={style.background} barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <ScrollView style={{height: '100%'}}>
            <View style={styles.containerTop}>
              <Text style={styles.logo}>Zwallet</Text>
            </View>
            <View style={styles.containerBottom}>
              <Success />
              <Text style={styles.title}>PIN Successfully Created</Text>
              <Text style={styles.description}>
                Your PIN was successfully created and you can now access all the
                features in Zwallet. Login to your new account and start
                exploring!
              </Text>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => navigation.replace('Login')}>
                <Text style={{color: '#FFFFFF', fontSize: 18}}>Login Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RegSuccess;

const styles = StyleSheet.create({
  containerTop: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: style.background,
    height: Dimensions.get('screen').width / 2,
  },
  logo: {
    fontSize: 26,
    color: style.primary,
    fontWeight: 'bold',
  },
  containerBottom: {
    backgroundColor: style.white,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 40,
    paddingHorizontal: 16,
    height: Dimensions.get('screen').height / 1.4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: 'rgba(58, 61, 66, 0.6)',
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 30,
    lineHeight: 28,
  },
  buttonPrimary: {
    alignItems: 'center',
    backgroundColor: style.primary,
    width: '90%',
    padding: 14,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 15,
  },
  buttonGrey: {
    backgroundColor: '#DADADA',
    alignItems: 'center',
    width: '90%',
    padding: 14,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 15,
  },
  forget: {
    color: '#3A3D42',
    fontSize: 14,
  },
  navigation: {
    color: 'rgba(58, 61, 66, 0.8)',
    textAlign: 'center',
    fontSize: 16,
  },
});
