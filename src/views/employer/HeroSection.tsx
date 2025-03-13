import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Lottie from 'lottie-react'


const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 9.7,
        backgroundImage: 'linear-gradient(to right, #0049C6, #CDF4FF)',
        padding: '0px 7.1rem',
        height:'90vh'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 7 }}>
        <Typography
          // variant='h2'
          sx={{ fontSize: 32, fontWeight: 700, color: '#FFFFFF' }}
          dangerouslySetInnerHTML={{ __html: t('employer_page.hero_1') }}
        />
        <Typography
          variant='body2'
          sx={{ fontSize: '.95rem !important', fontWeight: 400, color: '#FFFFFF' }}
          dangerouslySetInnerHTML={{ __html: t('employer_page.hero_2') }}
        />
        <Button
          variant='contained'
          size='small'
          sx={{
            fontSize: '.95rem',
            fontWeight: 400,
            color: '#FAFAFA',
            padding: '.5rem .7rem',
            width: '50%',
            textTransform: 'none',
            borderRadius:'9px !important'
          }}
        >
          {t('employer_page.hero_button')}
        </Button>
      </Box>

      <Box sx={{width:'50%'}}>
        <Lottie animationData={require('/public/animated-images/smooth2.json')} />
      </Box>
    </Box>
  )
}

export default HeroSection
