import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';

i18n.use(initReactI18next)
    .init({
        resources: {
            id: ns1,
            en: ns2
        },
        fallbackLng: "id",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;