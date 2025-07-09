import { Icon } from '@iconify/react'
import { Menu, MenuItem, Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import localStorageKeys from 'src/configs/localstorage_keys'
import { Settings } from 'src/@core/context/settingsContext'
import Router from 'next/router'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const LanguageDropdownMobile = ({ settings, saveSettings }: Props) => {
  const { i18n } = useTranslation()

  const pathname = usePathname()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLangItemClick = (lang: string) => {
    localStorage.setItem(localStorageKeys.userLocale, lang)
    i18n.changeLanguage(lang)
    Router.push(pathname, pathname, { locale: lang })
  }

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleClick}>
        <Icon icon='ph:globe-simple' color='black' fontSize={24} />
      </Box>
      <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          selected={i18n.language === 'id'}
          onClick={() => {
            handleLangItemClick('id')
            saveSettings({ ...settings, direction: 'ltr' })
          }}
        >
          Indonesia
        </MenuItem>
        <MenuItem
          selected={i18n.language === 'en'}
          onClick={() => {
            handleLangItemClick('en')
            saveSettings({ ...settings, direction: 'ltr' })
          }}
        >
          English
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default LanguageDropdownMobile
