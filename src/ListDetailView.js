import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

function ListDetailView(props) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 48 }}>List Detail View</Text>
    </View>
  )
}

ListDetailView.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('title');
  return {
    title,
    headerTintColor: 'black',
    headerBackImage: () => (
      <View style={{ flex: 1 }}>
        <Icon
          name="chevron-left"
          size={22}
        />
      </View>
    ),
  };
};


export default ListDetailView;
