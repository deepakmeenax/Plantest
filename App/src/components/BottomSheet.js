import React from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Height = Dimensions.get('window').height;

export default function BottomSheet({ isVisible, setVisible, i18n }) {
  const handleChange = async (lng) => {
    try {
      await AsyncStorage.setItem('language', lng);
      i18n.changeLanguage(lng);
      setVisible(false);
    } catch (error) {
      console.log(error);
      i18n.changeLanguage(lng);
      setVisible(false);
    }
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.model_view}
        onPress={() => {
          setVisible(false);
        }}>
        <View style={styles.bottom_sheet_view}>
          <View style={styles.options_row}>
            <View style={styles.option_view}>
              <TouchableOpacity
                onPress={() => handleChange('hi')}
                style={{ ...styles.option_box, backgroundColor: '#2470a0' }}>
                <Text style={styles.option_text}>अ इ</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option_view}>
              <TouchableOpacity
                onPress={() => handleChange('en')}
                style={{ ...styles.option_box, backgroundColor: '#22eaaa' }}>
                <Text style={styles.option_text}>Aa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  model_view: {
    flex: 1,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottom_sheet_view: {
    backgroundColor: 'white',
    height: Height * 0.25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  options_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option_view: {
    width: '50%',
    padding: 20,
  },
  option_box: {
    width: '100%',
    height: 100,
    backgroundColor: '#f7475b',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 15,
  },
  option_text: {
    fontSize: 25,
    fontFamily: 'Bold',
    color: '#4f4a4a',
    textAlign: 'center',
  },
});
