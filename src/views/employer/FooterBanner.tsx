import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const FooterBanner = ({ isMobile }: { isMobile: boolean }) => {
  const { t } = useTranslation()
  const {locale} = useRouter()

  return (
    <Box
      sx={{
        padding: isMobile ? '0px' :'0px 7.1rem 5.7rem 7.1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          backgroundImage: isMobile ? 'url("/images/footerBanner/banner-mobile.png")' : 'url("/images/footerBanner/footer-banner.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: {md:4},
          width:'100%',
          padding: {md:'0px', xs:'5.85rem 1.45rem'},
          height: isMobile ? '80vh' : ''
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: isMobile ? '' : 'linear-gradient(83.05deg, #000000 22.69%, rgba(0, 0, 0, 0) 83.58%)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            padding: isMobile ? '' : '4rem 3rem',
            gap: 4,
            borderRadius: {md:4},
            height:isMobile ? '100%' : '',
            justifyContent:isMobile ? 'flex-end' : ''
          }}
        >
          <Typography sx={{ fontSize: {md:32, xs:24}, color: '#FFFFFF', fontWeight: 700 }}>
            {t('employer_page.footer_banner_title')}
          </Typography>
          <Typography sx={{ fontSize:{md:20, xs:16}, color: '#FFFFFF', fontWeight: 400, '& br' : {display: isMobile ?  'none' : ''}}} dangerouslySetInnerHTML={{ __html: t('employer_page.footer_banner_detail') }}/>
          <Link href='/register/employer' locale={locale}>
          <Button
            variant='contained'
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: '#32497A',
              textTransform: 'none',
              backgroundColor: '#FFFFFF',
              width: {md:'fit-content', xs:'100%'},
              '&:hover':{
                color:'#FFFFFF',
              },
              borderRadius:'9px'
            }}
          >
            {t('employer_page.footer_banner_button')}
          </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default FooterBanner
