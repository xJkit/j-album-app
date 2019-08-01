import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

function CameraView(props) {
  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        style={{ flex: 1 }}
      >
        {({ camera, status }) => {
          if (status !== 'READY') {
            return (
              <Text style={{ color: 'black' }}>請打開相機</Text>
            );
          }
          return (
            <>
              <TouchableOpacity onPress={() => this.takePicture(camera)}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </>
          )
        }}
      </RNCamera>
    </View>
  );
}

export default CameraView;
