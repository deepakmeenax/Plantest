import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {
  let camera;

  const [CameraPermission, setCameraPermission] = useState(false);
  const [ImagePermission, setImagePermission] = useState(false);
  const [CameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const askCameraPermission = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(granted);
  };

  const askImagePermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setImagePermission(granted);
  };

  const selectImage = async () => {
    if (!ImagePermission) askImagePermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      navigation.navigate('Result', { imgPath: result.uri });
    }
  };

  const snapImage = async () => {
    const result = await camera.takePictureAsync();
    navigation.navigate('Result', { imgPath: result.uri });
  };

  useEffect(() => {
    async function start() {
      if (!(await Camera.getCameraPermissionsAsync()).granted) askCameraPermission();
      else setCameraPermission(true);
      if (!(await ImagePicker.getMediaLibraryPermissionsAsync()).granted) askImagePermission();
      else setImagePermission(true);
    }
    start();
  }, []);

  if (!CameraPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.camera_view}>
          <View style={styles.bottom_view}>
            <TouchableOpacity style={styles.button} onPress={() => selectImage()}>
              <Ionicons name='images' size={35} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Ionicons name='scan-circle-sharp' size={70} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Ionicons name='camera-reverse' size={40} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera_view}
        type={CameraType}
        ref={(r) => {
          camera = r;
        }}>
        <View style={styles.bottom_view}>
          <TouchableOpacity style={styles.button} onPress={() => selectImage()}>
            <Ionicons name='images' size={35} color='white' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => snapImage()}>
            <Ionicons name='scan-circle-sharp' size={70} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCameraType(
                CameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name='camera-reverse' size={40} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera_view: {
    width: '100%',
    height: '100%',
  },
  bottom_view: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000000',
    width: '100%',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});
