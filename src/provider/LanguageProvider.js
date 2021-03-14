import React from "react";
import i18n from "i18next";
import {transtationObject} from '../translations/translations'
import { initReactI18next, useTranslation } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(transtationObject);

export const SiteContext = React.createContext({})

export function LanguageProvider(props) {
  const { t } = useTranslation();
  const languageObject = {
    setLanguage: handleLanguage,
    i18: i18n,
    t: t,
  }

  function handleLanguage(e) {
    const language = e.target.id
    i18n.changeLanguage(language)
  } 

  return (
      <SiteContext.Provider value={languageObject}>
          {props.children}
      </SiteContext.Provider>
  )
}