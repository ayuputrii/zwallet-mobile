import React, {useEffect, useRef, useState} from 'react';
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
  TextInput,
} from 'react-native';
import {IconButton, Switch} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../Redux/Action/Login';
import style from '../../Helper';
import {
  userLogout,
  editUser,
  notification,
  editPhoto,
} from '../../Redux/Action/Users';
import {imageURI} from '../../utils';
import Back from '../../Assets/icons/arrow-left.svg';
import Edit from '../../Assets/icons/edit-profile.svg';
import {RectButton} from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-picker';

const Profile = (props) => {
  const {data, isNotification} = useSelector((s) => s.user);
  const [notif, setNotif] = useState(isNotification);
  const [name, setName] = useState(data.name);
  const [inputActive, setInputActive] = useState(false);
  const {token} = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const bs = useRef();
  const fall = new Animated.Value(1);

  useEffect(() => {
    dispatch(notification(notif));
  }, [notif, setNotif]);

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

  const takePhotoFromCamera = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
      },
      (response) => {
        console.log(response);
        const formData = new FormData();
        formData.append('photo', {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
        dispatch(editPhoto(formData, token));
      },
    );
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        console.log(response);
        const formData = new FormData();
        formData.append('photo', {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
        dispatch(editPhoto(formData, token));
      },
    );
  };

  const editName = () => {
    console.log(name);
    dispatch(editUser({name}, token));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <View style={{marginBottom: 40}}>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Choose From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar backgroundColor={style.primary} barStyle="light-content" />
      <SafeAreaView>
        <View>
          <ScrollView
            style={{height: '100%', backgroundColor: style.background}}>
            <View style={styles.top}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => props.navigation.goBack()}>
                <Back width={28} height={28} />
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
              <View style={{alignItems: 'center', marginBottom: 30}}>
                <View style={{paddingBottom: 15}}>
                  <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                    <Image
                      style={{
                        borderRadius: 10,
                        width: 80,
                        height: 80,
                        marginBottom: 4,
                      }}
                      source={{uri: imageURI + data.photo}}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 8,
                    }}>
                    <Edit width={11} height={11} />
                    <Text
                      style={{
                        color: '#7A7886',
                        marginLeft: 7,
                      }}>
                      Edit
                    </Text>
                  </View>
                </View>
                {inputActive ? (
                  <TextInput
                    style={{
                      fontWeight: 'bold',
                      color: style.dark,
                      fontSize: 24,
                    }}
                    value={name}
                    onChangeText={(name) => setName(name)}
                    onSubmitEditing={editName}
                  />
                ) : (
                  <TouchableOpacity onPress={() => setInputActive(true)}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: style.dark,
                        fontSize: 24,
                      }}>
                      {data.name} <Edit width={21} height={21} />
                    </Text>
                  </TouchableOpacity>
                )}
                <Text style={{color: style.darkMed, fontSize: 16}}>
                  + {splitPhone(data.phone)}
                </Text>
              </View>
              <View>
                <View style={styles.field}>
                  <Text
                    style={{
                      color: style.dark,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Personal Information
                  </Text>
                  <View style={{position: 'absolute', right: 6, marginTop: 3}}>
                    <IconButton
                      color="#444"
                      icon="arrow-right"
                      onPress={() =>
                        props.navigation.navigate('PersonalContact')
                      }
                    />
                  </View>
                </View>
                <View style={styles.field}>
                  <Text
                    style={{
                      color: style.dark,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Change Password
                  </Text>
                  <View style={{position: 'absolute', right: 6, marginTop: 3}}>
                    <IconButton
                      onPress={() =>
                        props.navigation.navigate('ChangePassword')
                      }
                      color="#444"
                      icon="arrow-right"
                    />
                  </View>
                </View>
                <View
                  onPress={() => navigation.navigate('ChangePin')}
                  style={styles.field}>
                  <Text
                    style={{
                      color: style.dark,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Change PIN
                  </Text>
                  <View style={{position: 'absolute', right: 6, marginTop: 3}}>
                    <IconButton
                      onPress={() => props.navigation.navigate('ChangePin')}
                      color="#444"
                      icon="arrow-right"
                    />
                  </View>
                </View>
                <View style={styles.field}>
                  <Text
                    style={{
                      color: style.dark,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Notification
                  </Text>
                  <Switch
                    trackColor={{
                      true: '#6379F4',
                      false: 'rgba(169, 169, 169, 0.4)',
                    }}
                    thumbColor="#FFFFFF"
                    value={isNotification}
                    onValueChange={setNotif}
                  />
                </View>
                <RectButton onPress={onLogout} style={styles.field}>
                  <Text
                    style={{
                      color: style.dark,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Logout
                  </Text>
                </RectButton>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <BottomSheet
        ref={bs}
        snapPoints={[360, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction
        enabledContentGestureInteraction={false}
        enabledContentTapInteraction
        renderHeader={renderHeader}
        renderContent={renderContent}
      />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  inputWrap: {
    padding: 17,
  },
  top: {
    paddingTop: StatusBar.currentHeight * 1.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  field: {
    backgroundColor: '#E5E8ED',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 32,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: style.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
