import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";
import translationEng from "./locales/en/translation.json";
import translationFi from "./locales/fi/translation.json";
import { initReactI18next } from "react-i18next";
import cookie from 'js-cookie';
import { COOKIES, COOKIES_SECURE } from "./Utils/constants.js";
import { getLanguageByLocalization, getLanguage } from "./Utils/localization.js";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: false,
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    resources: {
      en: translationEng,
      fi: translationFi
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    react: {
      wait: true
    }
  });

if(cookie.get(COOKIES.language)){
  const localization = getLanguage(cookie.get(COOKIES.language));
  i18n.changeLanguage(localization.lang);
}else{
  // set language by localization if settings not found from cookies
  const localization = getLanguageByLocalization();

  // set language as default to cookie settings
  cookie.set(COOKIES.language, localization.lang, { path: '/', secure: COOKIES_SECURE, expires: 5000, 'samesite': 'strict'});

  // change the systems language
  i18n.changeLanguage(localization.lang);
}

export default i18n;