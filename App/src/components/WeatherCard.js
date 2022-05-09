import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';
import axios from 'axios';

const Width = Dimensions.get('window').width;

export default function WeatherCard() {
  const { t, i18n } = useTranslation();

  const [weather, setWeather] = useState({
    temperature: 11.2,
    time: '2022-04-22T02:00',
    weathercode: 0,
    winddirection: 11,
    windspeed: 2.4,
  });
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(false);
  // const [address, setAddress] = useState('Ahmamau');

  const fetchdata = async (loc) => {
    try {
      const responce = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${loc.coords.latitude}&longitude=${loc.coords.longitude}&daily=weathercode,sunset,precipitation_sum,windspeed_10m_max&current_weather=true&timezone=Asia%2FSingapore`
      );
      setWeather(responce.data.current_weather);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setWeather(dummy);
      setLoading(false);
    }
  };

  const askPermission = async () => {
    let { granted } = await Location.getForegroundPermissionsAsync();
    setPermission(granted);
  };

  function decideImage(code) {
    if (code <= 1) {
      return require('../assets/images/sun2.png');
    } else if (code > 1 && code <= 3) {
      return require('../assets/images/cloud.png');
    } else {
      return require('../assets/images/rain.png');
    }
  }

  useEffect(() => {
    async function start() {
      setLoading(true);
      let { granted } = await Location.getForegroundPermissionsAsync();
      setPermission(granted);
      if (granted) {
        let loc = await Location.getCurrentPositionAsync({});
        await fetchdata(loc);
      } else {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        setPermission(granted);
        if (granted) {
          let loc = await Location.getCurrentPositionAsync({});
          await fetchdata(loc);
        } else {
          setWeather(dummy);
        }
      }
      setLoading(false);
    }
    start();
  }, []);

  return (
    <View style={styles.card_view}>
      <View style={styles.card_row}>
        <View style={styles.text_col}>
          {/* <Text style={styles.sub_text}>{address}</Text> */}
          <Text style={styles.main_text}> {weather.temperature} °C</Text>
          <Text style={styles.sub_text}>
            {t('wind')} {weather.windspeed} km/h
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator style={styles.load} color='green' size={50} />
        ) : (
          <Image source={decideImage(weather?.weathercode)} style={styles.weather_img} />
        )}
      </View>

      <View style={styles.hr_line} />

      {permission ? (
        <View style={styles.card_row}>
          <Text style={styles.sub_text}>{t('day_Prediction_1')}</Text>
          <Text style={styles.sub_text}>
            0% <FontAwesome5 name='cloud-rain' size={15} color='black' />
          </Text>
        </View>
      ) : (
        <View style={styles.bottom_view}>
          <Text style={styles.allow_text}>{t('allow')}</Text>
          <TouchableOpacity onPress={() => askPermission()}>
            <Text style={styles.btn_text}>{t('allow2')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card_view: {
    width: Width * 0.91,
    flexDirection: 'column',
    backgroundColor: '#c5e3f6',
    borderColor: '#ddd',
    borderWidth: 0.3,
    elevation: 2,
    borderRadius: 7,
    marginVertical: 15,
  },
  card_row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text_col: {
    flexDirection: 'column',
  },
  main_text: {
    fontSize: 28,
    fontFamily: 'Bold',
    color: '#4f4a4a',
    textAlign: 'left',
  },
  sub_text: {
    fontSize: 15,
    color: '#4f4a4a',
    textAlign: 'left',
    marginVertical: 2,
  },
  hr_line: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
  },
  weather_img: {
    width: 70,
    height: 70,
  },
  bottom_view: {
    backgroundColor: '#88d498',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 15,
  },
  allow_text: {
    width: '70%',
  },
  btn_text: {
    fontSize: 16,
    color: 'green',
  },
  load: {
    marginVertical: 10,
  },
});
