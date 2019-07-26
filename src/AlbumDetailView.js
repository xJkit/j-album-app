import React from 'react';
import { View, Text, Image } from 'react-native';
import arrowBackImg from './assets/arrow_back.png';

function AlbumDetailView(props) {
  const albumUID = props.navigation.getParam('id');
  console.log(`album unique id: ${albumUID}`);
  return (
    <>
      <View>
        <Text>Album Detail View</Text>
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
