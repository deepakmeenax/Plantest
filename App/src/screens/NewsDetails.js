import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from '@expo/vector-icons';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

import { getOneCamp } from '../redux/actions/search';
import { regDonor } from '../redux/actions/register';

export default function CampDetail({ route }) {
  const [done, setDone] = useState(false);
  const { id } = route.params;

  const dispatch = useDispatch();

  const item = useSelector(state => state.search.detail);
  const loading = useSelector(state => state.search.loading);
  const error = useSelector(state => state.search.error);

  useEffect(() => {
    dispatch(getOneCamp({ id }));
  }, []);

  if (loading) {
    return (
      <View style={styles.search_Screen}>
        <Text style={styles.loading_text}>Loading ...</Text>
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.search_Screen}>
        <Text style={styles.loading_text}>Error</Text>
      </View>
    );
  } else if (item) {
    return (
      <SafeAreaView>
        <View style={styles.detail_con}>
          <Image
            source={require('../assets/images/blood-drive.jpg')}
            style={styles.cover_img}
          />

          <View style={styles.info_con}>
            <Text style={styles.info_name}>
              {item.camp_name ? item.camp_name.toUpperCase() : ''}
            </Text>
            <View style={styles.info_text_row}>
              <View style={styles.info_text_col}>
                <Text style={styles.info_main_text}>Timing</Text>
                <Text style={styles.info_second_text}>
                  {item.startDate ? item.startDate : null}
                </Text>
              </View>
              <View style={styles.info_text_col}>
                <Text style={styles.info_main_text}>Participant</Text>
                <Text style={styles.info_second_text}>
                  {item.participant ? item.participant.length : 0}
                </Text>
              </View>
            </View>
            <Text style={styles.info_location}>
              <Octicons name='location' size={20} color='tomato' />
              {'  '}
              {item.location.formattedAddress && item.location.formattedAddress}
            </Text>
            <Text style={styles.info_desc}> {item.desc ? item.desc : ''}</Text>
            <TouchableOpacity
              style={styles.bottom_btn}
              onPress={() => {
                dispatch(regDonor({ id }));
                setDone(true);
              }}
              disabled={done}
            >
              <Text style={styles.btn_text}>
                {done ? 'Well Done Registred' : 'Regiter as Donar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{ ...styles.search_Screen, backgroundColor: '#fff' }}>
        <Image
          style={styles.center_search_img}
          source={require('../assets/images/searchimg.png')}
        ></Image>
        <Text style={styles.center_text}>
          Found Nothing may be you should change your location.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detail_con: {
    flex: 1,
    backgroundColor: 'white',
  },
  cover_img: {
    position: 'relative',
    width: Width,
    height: Height * 0.4,
  },
  info_con: {
    position: 'absolute',
    top: Height * 0.4 - 15,
    width: Width,
    height: Height * 0.6 + 15,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  info_name: {
    fontFamily: 'Bold',
    fontSize: 15,
    textAlign: 'center',
  },
  info_text_row: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info_text_col: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  info_main_text: {
    textAlign: 'left',
    fontSize: 15,
    fontFamily: 'Medium',
  },
  info_second_text: {
    textAlign: 'center',
    fontSize: 12,
  },
  info_location: {
    fontFamily: 'Medium',
    fontSize: 15,
    textAlign: 'left',
    marginTop: 20,
  },
  info_desc: {
    fontFamily: 'Medium',
    fontSize: 10,
    textAlign: 'left',
    marginTop: 20,
  },
  bottom_btn: {
    marginBottom: 10,
    backgroundColor: '#ff1f5a',
    borderRadius: 10,
  },
  btn_text: {
    textAlign: 'center',
    padding: 15,
    color: '#fff',
    fontFamily: 'Bold',
    fontSize: 15,
  },
  search_Screen: {
    flex: 1,
    width: Width,
    height: Height,
  },
  loading_text: {
    textAlign: 'center',
    marginTop: Height * 0.4,
    fontSize: 20,
    fontFamily: 'Medium',
  },
  center_search_img: {
    width: 0.6 * Width,
    height: 200,
    alignSelf: 'center',
    marginTop: Height * 0.5 - 200,
  },
  center_text: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Bold',
    margin: 15,
  },
});
