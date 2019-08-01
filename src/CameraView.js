import React, { useRef } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';

function CameraView(props) {
  const camera = useRef(null);
  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={camera}
        style={{ flex: 1 }}
      />
    </View>
  );
}

export default CameraView;
