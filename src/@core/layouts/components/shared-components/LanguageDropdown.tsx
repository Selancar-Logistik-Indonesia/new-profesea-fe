// ** React Import
import { useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import localStorageKeys from 'src/configs/localstorage_keys'
import Router from 'next/router'
import { usePathname } from 'next/navigation'
import { Box } from '@mui/system'
import { MenuItem, styled, TextField } from '@mui/material'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
  navVisible?: boolean
}

const CustomSelectLanguage = styled(TextField)({
  '& .css-1xr5nzd-MuiInputBase-root-MuiInput-root:before': {
    borderBottom: 'none !important'
  },
  '& .css-haay1k-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-haay1k-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-haay1k-MuiSelect-select-MuiInputBase-input-MuiInput-input':
    {
      padding: '5px'
    },
  '& .css-14bq0fo-MuiSvgIcon-root-MuiSelect-icon': {
    top: 'calc(50% - 0.8em)'
  }
})

const LanguageDropdown = ({ settings, saveSettings, navVisible = false }: Props) => {
  // ** Hook
  const { i18n } = useTranslation()

  const pathname = usePathname()

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
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: navVisible ? '100%' : null }}>
        <Icon icon='ph:globe-simple' color='black' fontSize={18} />
        {/* <TextField id='select-language' select variant='standard' /> */}
        <CustomSelectLanguage
          sx={{ width: '100%' }}
          id='select-language'
          select
          variant='standard'
          size='small'
          defaultValue={i18n.language}
          onChange={e => {
            handleLangItemClick(e.target.value)
            saveSettings({ ...settings, direction: 'ltr' })
          }}
        >
          <MenuItem value={'id'}>Indonesia</MenuItem>
          <MenuItem value={'en'}>English</MenuItem>
        </CustomSelectLanguage>
      </Box>
    </>
  )
}

export default LanguageDropdown
