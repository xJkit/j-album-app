import React, { useReducer, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import arrowBackImg from './assets/arrow_back.png';

const initialState = {
  isFetching: false,
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
    case actionTypes.TOGGLE_FETCHING:
      return { ...state, isFetching: !state.isFetching };
    case actionTypes.GET_ALBUM_INFO:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}

function AlbumDetailView(props) {
  const albumUID = props.navigation.getParam('id');
  const [state, dispatch] = useReducer(albumReducer, initialState);
  useEffect(() => {
    dispatch({ type: actionTypes.TOGGLE_FETCHING });
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
    <>
      <View style={{ flex: 1 }}>
        {!state.albumTitle && <Text>Loading</Text>}
        {!!state.albumTitle && <Text>{state.albumTitle}</Text>}
      </View>
    </>
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
