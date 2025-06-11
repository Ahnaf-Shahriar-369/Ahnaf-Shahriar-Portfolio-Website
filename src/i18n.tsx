// Import core i18n library and its React integration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language JSON files
import en from './locales/en/translation.json';
import bn from './locales/bn/translation.json';

// Initialize i18n
i18n
  .use(initReactI18next) // Integrate with React
  .init({
    resources: {
      en: { translation: en },
      
      bn: { translation: bn }
    },
    fallbackLng: 'en', // Use English if current language not found
    interpolation: {
      escapeValue: false // React already protects from XSS
    }
  });

// Export the i18n instance to be used in the app
export default i18n;
