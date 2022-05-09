import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FS from 'expo-file-system';

export default function Result({ route }) {
  const { t, i18n } = useTranslation();
  const { imgPath } = route.params;

  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState(null);

  useEffect(() => {
    async function start() {
      try {
        setLoading(true);
        let uri = imgPath.replace('file://', '');
        const res = await FS.uploadAsync('http://192.168.229.254:5500/net/image/prediction/', uri, {
          headers: { 'content-type': 'image/png' },
          httpMethod: 'POST',
          uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
        });
        setData(JSON.parse(res.body));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: imgPath }} style={styles.img} />

        {loading ? (
          <ActivityIndicator style={styles.load} color='green' size={60} />
        ) : (
          <>
            <Text style={styles.title}>
              {t('result')} : {Data?.prediction}
            </Text>
            <Text style={styles.title2}>{t('disc')} : </Text>
            <Text style={styles.disc}>{Data?.description}</Text>
            <Text style={styles.title2}> {t('identify')} : </Text>
            <Text style={styles.disc}>{Data?.symptoms}</Text>
            <Text style={styles.title2}> {t('treatment')} : </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(Data?.source);
              }}>
              <Text style={styles.disc}>{Data?.source}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  img: {
    width: 280,
    height: 330,
    alignSelf: 'center',
    margin: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Bold',
    textAlign: 'center',
    margin: 10,
  },
  title2: {
    fontSize: 18,
    fontFamily: 'Bold',
    textAlign: 'left',
    marginTop: 15,
    marginLeft: 10,
  },
  disc: {
    fontSize: 18,
    marginHorizontal: 10,
    textAlign: 'left',
    marginVertical: 2,
  },
  load: {
    margin: 50,
  },
});
