import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet from '../components/BottomSheet';
import WeatherCard from '../components/WeatherCard';
import News from '../components/News';

export default function Home({ navigation }) {
  const { t, i18n } = useTranslation();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    async function start() {
      try {
        const lng = await AsyncStorage.getItem('language');
        if (lng !== null) {
          i18n.changeLanguage(lng);
        } else {
          i18n.changeLanguage('en');
        }
      } catch (e) {
        console.log(e);
      }
    }
    start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#fff' animated={true} />
      <View style={styles.header}>
        <View style={styles.header_title}>
          <Text style={styles.header_title_text}>Plant Test</Text>
        </View>
        <TouchableOpacity
          style={styles.lng_button}
          onPress={() => setVisible(true)}
          activeOpacity={0.5}>
          <Text style={styles.lng_text}>
            <AntDesign name='earth' size={15} /> {t('lng')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WeatherCard />
        <News />
      </ScrollView>
      <BottomSheet setVisible={setVisible} isVisible={isVisible} i18n={i18n} />
      <TouchableOpacity
        style={styles.scan_btn}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.scan_text}>{t('scan')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  header_title_text: {
    fontSize: 20,
    color: '#1a936f',
    fontFamily: 'Bold',
  },
  lng_button: {
    padding: 2,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  lng_text: {
    fontSize: 16,
    color: 'black',
  },
  scan_btn: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007065',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  scan_text: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'Bold',
  },
});
