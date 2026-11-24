import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import kh from '../locales/kh/translation.json';

const STORAGE_KEY = 'tour-trip-language';
const getInitialLanguage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'kh') return stored;
  return 'en';
};

const language = getInitialLanguage();

const resources = { en: { translation: en }, kh: { translation: kh } };

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

const updateDocumentLanguage = (nextLanguage) => {
  const lang = nextLanguage === 'kh' ? 'km' : 'en';
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', nextLanguage);
};

updateDocumentLanguage(language);
i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
