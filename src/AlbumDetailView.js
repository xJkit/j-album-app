import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import arrowBackImg from './assets/arrow_back.png';

function AlbumDetailView(props) {
  const albumUID = props.navigation.getParam('id');
  const [title, setTitle] = useState('');
  useEffect(() => {
    const getAlbum = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${albumUID}`
      );
      const data = await response.json();
      setTitle(data.title);
    };
    getAlbum();
  }, [albumUID]);

  console.log(title);
  return (
    <>
      <View style={{ flex: 1 }}>
        {!title && <Text>Loading</Text>}
        {!!title && <Text>{title}</Text>}
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
