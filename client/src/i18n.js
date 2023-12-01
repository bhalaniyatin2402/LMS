import i18n from "i18next";
import Backend from "i18next-http-backend";
import languagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(Backend).use(languagedetector).use(initReactI18next).init({
  fallBackLng: "guj",
  debug: true,
});

export default i18n;
