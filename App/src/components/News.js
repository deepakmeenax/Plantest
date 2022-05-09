import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import NewsCard from './NewsCard';

export default function News() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function start() {
      try {
        setLoading(true);
        const responce = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=115990132dfb42cfb4c3a51b8dbdaea7`
        );
        setNews(responce.data.articles);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setNews([]);
        setLoading(false);
      }
    }
    start();
  }, []);

  if (loading)
    return (
      <View style={styles.news_col}>
        <ActivityIndicator style={styles.load} color={'green'} size={50} />
      </View>
    );

  return (
    <View style={styles.news_col}>
      <Text style={styles.title}>{t('news')}</Text>
      {news.length > 0 ? (
        news.map((item, index) => {
          return <NewsCard item={item} key={index} />;
        })
      ) : (
        <Text style={styles.no_news_text}>{t('snnf')}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  news_col: {
    marginVertical: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  no_news_text: {
    fontSize: 15,
    marginTop: 100,
    textAlign: 'center',
  },
  load: {
    marginTop: 100,
  },
  title: {
    marginHorizontal: 10,
    fontSize: 18,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Bold',
  },
});
