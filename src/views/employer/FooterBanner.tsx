import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

const FooterBanner = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        padding: '0px 7.1rem 5.7rem 7.1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          backgroundImage: 'url("/images/footerBanner/footer_banner.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: 4,
          width:'100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(83.05deg, #000000 22.69%, rgba(0, 0, 0, 0) 83.58%)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            padding: '4rem 3rem',
            gap: 4,
            borderRadius: 4
          }}
        >
          <Typography sx={{ fontSize: 32, color: '#FFFFFF', fontWeight: 700 }}>
            {t('employer_page.footer_banner_title')}
          </Typography>
          <Typography sx={{ fontSize: 20, color: '#FFFFFF', fontWeight: 400}} dangerouslySetInnerHTML={{ __html: t('employer_page.footer_banner_detail') }}/>
          <Button
            variant='contained'
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: '#32497A',
              textTransform: 'none',
              backgroundColor: '#FFFFFF',
              width: 'fit-content',
              '&:hover':{
                color:'#FFFFFF',
              }
            }}
          >
            {t('employer_page.footer_banner_button')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default FooterBanner
