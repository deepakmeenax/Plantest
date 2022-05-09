import i18next from 'i18next';
import {initReactI18next} from 'react-i18next'

import english from './english.json'
import hindi from './hindi.json'

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  resources: {
    en: english,
    hi: hindi,
  },
  react: {
    useSuspense: false,
  },
  fallbackLng: 'en',
});

export default i18next;