import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from './Redux/Action/Users';
import {deviceToken} from './Redux/Action/Login';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SplashScreen from 'react-native-splash-screen';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import ManagePhone from './Pages/ManagePhone';
import SearchReceiver from './Pages/SearchReceiver';
import Topup from './Pages/Topup';
import Amount from './Pages/Amount';
import Confirmation from './Pages/Confirmation';
import PinConfirmation from './Pages/PinConfirmation';
import StatusConfirm from './Pages/StatusConfirm';
import PersonalContact from './Pages/PersonalContact';
import AddPhone from './Pages/AddPhone';
import ChangePassword from './Pages/ChangePassword';
import ChangePin from './Pages/ChangePin';
import History from './Pages/History';
import DetailTransaction from './Pages/DetailTransaction';
import Notification from './Pages/Notification';
import ResgisterPin from './Pages/RegisterPin';
import RegSuccess from './Pages/RegSuccess';
import ResetPassword from './Pages/ResetPassword';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();
  const {token, isLogin, isUser} = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(initialRoute);
        }
        setLoading(false);
      });

    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
        if (!isLogin) {
          dispatch(deviceToken(token));
        }
      });
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }

    SplashScreen.hide();
  }, [token]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLogin && token && isUser ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="History"
            component={History}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailTransaction"
            component={DetailTransaction}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SearchReceiver"
            component={SearchReceiver}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Amount"
            component={Amount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PinConfirmation"
            component={PinConfirmation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StatusConfirm"
            component={StatusConfirm}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Topup"
            component={Topup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PersonalContact"
            component={PersonalContact}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ManagePhone"
            component={ManagePhone}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddPhone"
            component={AddPhone}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePin"
            component={ChangePin}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterPin"
            component={ResgisterPin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegSuccess"
            component={RegSuccess}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
