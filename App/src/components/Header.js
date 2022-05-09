import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.header_row}>
          <TouchableOpacity
            style={styles.header_left}
            // onPress={() => navigation.navigate('Location')}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={styles.locationtxt}
            >
              <Octicons name='location' size={20} color='tomato' />
              {'  '}
              Agri Helper
            </Text>
          </TouchableOpacity>
          <View style={styles.header_right}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}
              style={styles.profile_box}
            >
              {1 ? (
                <View style={styles.profile_img_back}>
                  <Image
                    style={styles.profile_img}
                    source={require('../assets/images/sofa.png')}
                  ></Image>
                </View>
              ) : (
                <AntDesign name='user' size={30} color='tomato' />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#ffffff',
    paddingVertical: 5,
  },
  header_row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: windowHeight * 0.08,
    justifyContent: 'space-between',
  },
  header_left: {
    width: windowWidth * 0.6,
  },
  locationtxt: {
    fontSize: 15,
    fontFamily: 'Bold',
  },
  profile_box: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile_img: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  profile_img_back: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#ff1f5a',
  },
});
