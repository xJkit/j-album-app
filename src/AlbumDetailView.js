import React, { useReducer, useEffect, useState } from 'react';
import {
  Animated,
  Modal,
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
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

class Menu extends React.Component {
  state = {
    paddingBottom: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(
      // Animate value over time
      this.state.paddingBottom, // The value to drive
      {
        toValue: 64, // Animate to final value of 1
        easing: Easing.linear,
        duration: 150
      },
    ).start(); // Start the animation
  }

  render() {
    return (
      <Animated.View
        animation="slideInDown"
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          paddingBottom: this.state.paddingBottom,
        }}
      >
        <Button
          onPress={() => this.props.setModalOpen(false)}
          title="關閉"
          type="solid"
          buttonStyle={{
            backgroundColor: 'white',
          }}
          titleStyle={{ color: 'red' }}
        />
      </Animated.View>
    );
  }
}


function AlbumDetailView(props) {
  const albumUID = props.navigation.getParam('id');
  const [state, dispatch] = useReducer(albumReducer, initialState);
  const [isModalOpen, setModalOpen] = useState(false);
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
      <Modal
        animationType="fade"
        visible={isModalOpen}
        transparent={true}
      >
        <Menu setModalOpen={setModalOpen} />
      </Modal>
      {(state.isFetching || !isImageLoaded) && <ActivityIndicator style={{ position: 'absolute', top: 16, left: '48%' }} />}
      {
        !state.isFetching && (
          <ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4, paddingBottom: 4 }}>
              <Avatar
                rounded
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
              <Text style={{ marginLeft: 8 }}>{state.singerName}</Text>
              <TouchableOpacity
                style={{ marginLeft: 'auto', marginRight: 8 }}
                onPress={() => setModalOpen(true)}
              >
                <Icon
                  name="more-horizontal"
                  size={22}
                />
              </TouchableOpacity>
            </View>
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
                <Text>{state.website}</Text>
              </>
            )}
          </ScrollView>
        )
      }
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
