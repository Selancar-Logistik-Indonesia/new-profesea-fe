import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Lottie from 'lottie-react'
import Link from 'next/link'
import { useRouter } from 'next/router'


const HeroSection = () => {
  const { t } = useTranslation()

  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const {locale} = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse':'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 4.8 : 9.7,
        backgroundImage: 'linear-gradient(to right, #0049C6, #CDF4FF)',
        padding: isMobile ? '2.85rem 1.45rem' : '0px 7.1rem',
        // height:'90vh'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 7 }}>
        <Typography
          // variant='h2'
          sx={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#FFFFFF', textAlign: isMobile ? 'center' : '', width:'100%' }}
          dangerouslySetInnerHTML={{ __html: t('employer_page.hero_1') }}
        />
        <Typography
          variant='body2'
          sx={{ fontSize: isMobile ? 16 : '.95rem !important', fontWeight: 400, color: '#FFFFFF', textAlign: isMobile ? 'center' : '', '& br' : {
            display: isMobile ?  'none' : ''
          } }}
          dangerouslySetInnerHTML={{ __html: t('employer_page.hero_2') }}
        />
        <Link href='/register/employer' locale={locale}>
        <Button
          variant='contained'
          size='small'
          sx={{
            fontSize: '.95rem',
            fontWeight: 400,
            color: '#FAFAFA',
            padding: '.5rem .7rem',
            width: isMobile ? '100%' : '50%',
            textTransform: 'none',
            borderRadius:'9px !important',
            whiteSpace:'nowrap'
          }}
        >
          {t('employer_page.hero_button')}
        </Button>
        </Link>
      </Box>

      <Box sx={{width:isMobile ? '100%':'50%'}}>
        <Lottie animationData={isMobile ? require('/public/animated-images/hero_mobile.json') : require('/public/animated-images/smooth2.json')} />
      </Box>
    </Box>
  )
}

export default HeroSection
