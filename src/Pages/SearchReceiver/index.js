import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import {IconButton, Searchbar, Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {search, searchByName, getUserTransfer} from '../../Redux/Action/Search';
import style from '../../Helper';
import {imageURI} from '../../utils';
import {FlatList} from 'react-native-gesture-handler';

const SearchReceiver = (props) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const {data} = useSelector((s) => s.search);
  const {token} = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(search(token));
  }, []);

  const renderItem = ({item}) => {
    if (item.phone) {
      return (
        <View style={{padding: 2, marginTop: 10}}>
          <Card
            style={{
              borderRadius: 10,
              fontFamily: 'Nunito-Regular',
              height: 92,
            }}
            onPress={() => {
              dispatch(getUserTransfer(token, item.phone));
              props.navigation.navigate('Amount');
            }}>
            <Image
              style={{
                width: 60,
                height: 60,
                padding: 20,
                borderRadius: 10,
                marginLeft: 20,
                marginTop: 15,
              }}
              source={{uri: imageURI + item.photo}}
            />
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
                {item.name}
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
                {item ? `${item.phone}` : `0`}
              </Text>
            </View>
          </Card>
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
            <View
              style={{
                fontSize: 18,
                left: 55,
                marginTop: 20,
                top: 15,
                fontFamily: 'Nunito-Regular',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  color: '#4D4B57',
                }}>
                Find Receiver
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              position: 'relative',
              marginTop: 40,
              marginBottom: 20,
              padding: 10,
            }}>
            <Searchbar
              style={{
                borderRadius: 10,
                backgroundColor: 'rgba(53, 61, 66, 0.1)',
              }}
              placeholder="Search receiver here"
              placeholderTextColor="rgba(58, 61, 66, 0.4)"
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                dispatch(searchByName(token, text));
              }}
              returnKeyType="search"
              onSubmitEditing={() => dispatch(searchByName(token, query))}
            />
          </View>
        </View>
        <View style={{marginBottom: 25, paddingHorizontal: 16}}>
          <Text style={{fontWeight: 'bold', color: style.dark, fontSize: 18}}>
            Contacts
          </Text>
          <Text style={{color: '#8F8F8F', marginTop: 10}}>
            {data.filter((item) => item.phone).length} Contacts Found
          </Text>
        </View>
        <SafeAreaView style={{backgroundColor: style.background}}>
          <FlatList data={data} renderItem={renderItem} />
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default SearchReceiver;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFCFF',
  },
});
