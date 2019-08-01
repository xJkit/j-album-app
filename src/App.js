import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import instagramLogo from './assets/instagram_logo.png';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import AlbumDetailView from './AlbumDetailView';
import ListDetailView from './ListDetailView';

const useAlbums = quantity => {
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
};

function HomeScreen(props) {
  const albums = useAlbums(30);
  const isLoading = albums.length === 0;
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          {isLoading && (
            <Text style={{ color: 'white' }}>Fetching Albums...</Text>
          )}
          {!isLoading && (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {albums.map(album => (
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate('AlbumDetailView', {
                      id: album.id,
                    })
                  }
                  key={album.id}
                >
                  <Image
                    source={{ uri: album.thumbnailUrl }}
                    resizeMethod="auto"
                    resizeMode="cover"
                    style={{ width: '33%', height: 120 }}
                  />
                </TouchableWithoutFeedback>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: (
      <Image
        source={instagramLogo}
        style={{ height: '80%' }}
        resizeMode="contain"
      />
    ),
    headerLeft: (
      <Ionicons
        name="ios-camera"
        size={30}
        style={{ marginLeft: 12 }}
      />
    ),
    headerBackTitle: null,
  };
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AlbumDetailView: {
      screen: AlbumDetailView,
    },
    ListDetailView: {
      screen: ListDetailView,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: () => null,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

export default createAppContainer(TabNavigator);
