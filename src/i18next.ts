import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';
import localStorageKeys from "./configs/localstorage_keys";
import LanguageDetector from 'i18next-browser-languagedetector';
// import { lookup } from "dns";


i18n.use(initReactI18next)
    .init({
        resources: {
            id: ns1,
            en: ns2
        },
        interpolation: {
            escapeValue: false
        },
    });

i18n.use(LanguageDetector).init({
        detection: {
            order: ['localStorage', 'htmlTag', 'navigator','querystring'],
            lookupLocalStorage: localStorageKeys.userLocale,
            lookupQuerystring: 'lng',
            caches: ['localStorage'],
        },
      });


export default i18n;