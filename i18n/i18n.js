const config = `import i18n from 'i18next';

import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  nsSeparator: '|',
});

export default i18n;
`

module.exports = config;
