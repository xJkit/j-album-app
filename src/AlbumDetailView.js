import React, { useReducer, useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import arrowBackImg from './assets/arrow_back.png';

const initialState = {
  isFetching: true,
  imgUrl: '', // photos.url,
  albumTitle: '', // albums.title
  albumName: '', // users.username
  singerName: '', // users.name
  website: '', // users.website
}

const actionTypes = {
  TOGGLE_FETCHING: 'TOGGLE_FETCHING',
  GET_ALBUM_INFO: 'GET_ALBUM_INFO',
};

const albumReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_ALBUM_INFO:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

function AlbumDetailView(props) {
  const albumUID = props.navigation.getParam('id');
  const [state, dispatch] = useReducer(albumReducer, initialState);
  const [isImageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const getAlbumInfo = async () => {
      const responses = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/photos/${albumUID}`),
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumUID}`),
        fetch(`https://jsonplaceholder.typicode.com/users/${albumUID}`),
      ]);
      const [photos, albums, users] = await Promise.all(responses.map(response => response.json()));
      dispatch({
        type: actionTypes.GET_ALBUM_INFO,
        payload: {
          isFetching: false,
          imgUrl: photos.url, // photos.url,
          albumTitle: albums.title,
          albumName: users.username,
          singerName: users.name,
          website: users.website,
        },
      });
    };
    getAlbumInfo();
  }, [albumUID]);
  return (
    <View style={{ flex: 1 }}>
      {(state.isFetching || !isImageLoaded) && <ActivityIndicator style={{ position: 'absolute', top: 16, left: '48%' }} />}
      {!state.isFetching && (
        <ScrollView>
          <Image
            source={{ url: state.imgUrl }}
            style={{ width: '100%', height: 300 }}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />
          {isImageLoaded && (
            <>
              <Text>{state.albumTitle}</Text>
              <Text>{state.albumName}</Text>
              <Text>{state.singerName}</Text>
              <Text>{state.website}</Text>
              <Icon name="rocket" size={30} />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

AlbumDetailView.navigationOptions = ({ navigation }) => {
  return {
    title: '專輯',
    headerBackImage: () => (
      <View style={{ flex: 1 }}>
        <Image
          source={arrowBackImg}
          resizeMode="contain"
          style={{ width: 16, height: '30%', marginLeft: 4 }}
        />
      </View>
    ),
  };
};

export default AlbumDetailView;
