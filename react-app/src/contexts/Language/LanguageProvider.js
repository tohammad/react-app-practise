import React, { useState, useEffect } from 'react';
import store from 'store';
import { registerLocale } from 'react-datepicker';
import { fr, de, it, es, ptBR, frCA } from 'date-fns/locale';
import ar from 'date-fns/locale/ar-SA';
import { setMomentLanguage } from '../../configs/DateConfig';
import { matchLanguage } from '../../configs/Languages/Languages';
import { history } from '../../routes/history';
// import Relationship from '../../services/Relationship';

let browserBestMatchLanguage;
if (navigator.languages && !store.get('TYS_LANGUAGE')) {
  navigator.languages.find((browserLanguage) => {
    browserBestMatchLanguage = matchLanguage(browserLanguage);
    return browserBestMatchLanguage;
  });
}
const cachedLanguage = () =>
  store.get('TYS_OVERRIDE_PREFERRED_LANGUAGE') ||
  store.get('TYS_LANGUAGE') ||
  browserBestMatchLanguage.value ||
  'en-US';
export const LanguageContext = React.createContext(cachedLanguage());
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(cachedLanguage());
  const [languageDirection, setLanguageDirection] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    // get locale (format en-US) from language (either en-US, English, english, or en)
    const localeFound = matchLanguage(language);
    const locale = localeFound.value.split('-')[0];
    setLanguageDirection(localeFound.langDirection);
    setIsLoading(true);
    registerLocale('fr-CA', frCA);
    registerLocale('fr', fr);
    registerLocale('de', de);
    registerLocale('pt-br', ptBR);
    registerLocale('ar', ar);
    registerLocale('it', it);
    registerLocale('es', es);
    store.set('TYS_LANGUAGE', localeFound.value);
    try {
      // TODO: Need to refactor updateUser Api call: Unneccessery calls Causing 401

      // Promise.all([
      //   // TODO: make async call to the backend to get language file
      //   ...(store.get('CURRENT_USER')
      //     ? [new Relationship().updateUser({preferredLanguage: localeFound.value })]
      //     : []),
      //   setMomentLanguage(locale),
      // ]).then(() => {
      //   if (
      //     !isInitialLoad ||
      //     (!store.get('TYS_OVERRIDE_PREFERRED_LANGUAGE') && store.get('TYS_LANGUAGE') !== 'en-US')
      //   ) {
      //     store.set('TYS_OVERRIDE_PREFERRED_LANGUAGE', localeFound.value);
      //     history.go();
      //   } else {
      //     setIsLoading(false);
      //     setIsInitialLoad(false);
      //   }
      // });
      setMomentLanguage(locale);
      if (
        !isInitialLoad ||
        (!store.get('TYS_OVERRIDE_PREFERRED_LANGUAGE') && store.get('TYS_LANGUAGE') !== 'en-US')
      ) {
        store.set('TYS_OVERRIDE_PREFERRED_LANGUAGE', localeFound.value);
        history.go();
      } else {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }, [language]);
  function setLanguageSafely(newLanguage, overwrite = false) {
    if (overwrite) {
      store.set('TYS_OVERRIDE_PREFERRED_LANGUAGE', newLanguage);
      setLanguage(newLanguage || cachedLanguage());
    } else if (!store.get('TYS_OVERRIDE_PREFERRED_LANGUAGE')) {
      setLanguage(newLanguage || cachedLanguage());
    }
  }
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: setLanguageSafely,
        isLoading,
        languageDirection,
      }}
    >
      {!isLoading && children}
    </LanguageContext.Provider>
  );
};
export default LanguageProvider;
