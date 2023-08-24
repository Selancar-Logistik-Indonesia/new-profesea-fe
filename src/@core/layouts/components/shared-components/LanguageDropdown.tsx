// ** React Import
import { useEffect, useState } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import localStorageKeys from 'src/configs/localstorage_keys'
import Router from 'next/router'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** Hook
  const { i18n } = useTranslation()

  // ** Vars
  const { layout } = settings

  const [templang, setTemplang] = useState()

  const handleLangItemClick = (lang: 'en' | 'id') => {
    localStorage.setItem(localStorageKeys.userLocale, lang);
    setTemplang(localStorage.user_locale)
    i18n.changeLanguage(lang)
    Router.push(Router.pathname, Router.pathname, { locale: lang });
  }

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)


  }, [i18n.language])

  return (
    <OptionsMenu
      icon={
        templang == 'en' ? (
          <Icon icon='emojione:flag-for-united-states' color='#ef6c00' fontSize={28} />
        ) : (
          <Icon icon='emojione:flag-for-indonesia' color='#ef6c00' fontSize={28} />
        )
      }
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      iconButtonProps={{ color: 'inherit', sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) } }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: 'Indonesia',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'id',
            onClick: () => {
              handleLangItemClick('id')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
