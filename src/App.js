/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect, useState, useRef } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import instagramLogo from './assets/instagram_logo.png';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

function useAlbums(quantity) {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos'
      );
      const albumResponses = await response.json();
      setAlbums(albumResponses);
    };
    getData();
  }, []);
  return albums.slice(0, quantity);
}

const HomeScreen = () => {
  const albums = useAlbums(30);
  const isLoading = albums.length === 0;
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image
          source={instagramLogo}
          style={{ height: '60%' }}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {isLoading && (
            <Text style={{ color: 'white' }}>Fetching Albums...</Text>
          )}
          {!isLoading && (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {albums.map(album => (
                <Image
                  key={album.id}
                  source={{ uri: album.thumbnailUrl }}
                  resizeMethod="auto"
                  resizeMode="cover"
                  style={{ width: '33%', height: 120 }}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    height: 72,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
