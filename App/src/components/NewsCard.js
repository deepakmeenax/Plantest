import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
const Width = Dimensions.get('window').width;

export default function NewsCard({ item }) {
  return (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.news_card}>
        <Image style={styles.cover_img} source={{ uri: item.urlToImage }} />
        <View style={styles.news_info}>
          <Text style={styles.news_title}>{item.title}</Text>
          <Text style={styles.news_disc}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  news_card: {
    width: Width * 0.9,
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 0.5,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 0,
    elevation: 3,
  },
  cover_img: {
    width: '100%',
    height: 100,
  },
  news_info: {
    padding: 10,
  },
  news_title: {
    fontFamily: 'Bold',
    fontSize: 15,
    textAlign: 'left',
  },
  news_disc: {
    textAlign: 'auto',
    fontSize: 15,
    marginTop: 5,
  },
});
