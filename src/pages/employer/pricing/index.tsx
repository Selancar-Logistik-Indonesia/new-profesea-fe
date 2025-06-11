import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
import PricingFaq from 'src/views/employer/pricing/PricingFaq'
import FooterView from 'src/views/landing-page/footerView'

const Main = () => {
  const { t } = useTranslation()
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const {locale} = useRouter()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          padding: { md: '48px 120px 75px 120px', xs: '24px' },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            backgroundImage: 'linear-gradient(180deg, #FAFAFA 2.44%, rgba(161, 191, 234, 0.66) 38.56%, #3777D6 86.63%)',
            zIndex: 0
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            backgroundColor: '#FAFAFA',
            zIndex: -1
          }
        }}
      >
        {/* header */}
        <Box
          sx={{
            padding: { md: '2.4rem', xs: '2.4rem 0px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography
            sx={{ fontSize: { md: 32, xs: 24 }, fontWeight: 700, color: '#404040' }}
            dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.pricing_header_1') }}
          />
          <Typography
            sx={{ fontSize: { md: 16, xs: 12 }, fontWeight: 400, color: '#5E5E5E', width: '70%' }}
            dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.pricing_header_2') }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* content */}
          <Box
            sx={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 2px 10px 0px #00000014',
              padding: { md: '24px 48px', xs: '.95rem' },
              gap: 4,
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              width:{md:'100%', lg:'90%'}

            }}
          >
            <Typography sx={{ fontSize: { md: 32, xs: '.9rem' }, fontWeight: 700, color: '#404040', display:{md:'block', xs:'none'} }}>
              Compare Plans
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' },
                alignItems: 'center',
                gap: { md: 4, xs: 6 }
              }}
            >
              {/* Basic */}
              <Box
                sx={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F0F0F0',
                  borderRadius: '12px',
                  boxShadow: '0px 2px 10px 0px #00000014',
                  flex: 1
                }}
              >
                <Box sx={{ borderBottom: '1px solid #E7E7E7', display: 'flex', flexDirection: 'column', gap: 3.9 }}>
                  <Box sx={{ padding: '.6rem', backgroundColor: '#FFFFFF', borderRadius: '12px 12px 0px 0px' }}>
                    <Typography sx={{ fontSize: '.6rem', fontWeight: 700, color: 'transparent', textAlign: 'center' }}>
                      a
                    </Typography>
                  </Box>
                  <Box sx={{ padding: '0px 16px 24px 16px', display: 'flex', flexDirection: 'column', gap: 3.9 }}>
                    <Typography sx={{ fontSize: '.95rem', fontWeight: 700, color: '#1F1F1F' }}>Basic</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1F1F1F' }}>Free</Typography>
                      <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#666666' }}>/month</Typography>
                    </Box>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 400, color: '#404040' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.basic.description') }}
                    />
                  </Box>
                </Box>
                <Box sx={{ padding: '.7rem' }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/red cross icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_1') }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/red cross icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_2') }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/red cross icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_3') }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_4') }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_5') }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Premium */}
              <Box
                sx={{
                  backgroundImage:
                    'linear-gradient(357.5deg, rgba(37, 97, 235, 0.18) 20.56%, rgba(150, 139, 235, 0.0396) 71.04%)',
                  border: '1px solid #F0F0F0',
                  borderRadius: '12px',
                  boxShadow: '0px 2px 10px 0px #00000014',
                  flex: 1
                }}
              >
                <Box sx={{ borderBottom: '1px solid #E7E7E7', display: 'flex', flexDirection: 'column', gap: 3.9 }}>
                  <Box
                    sx={{
                      padding: '.6rem',
                      backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                      borderRadius: '12px 12px 0px 0px'
                    }}
                  >
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#ffffff', textAlign: 'center' }}>
                      Best Value
                    </Typography>
                  </Box>
                  <Box sx={{ padding: '0px 16px 24px 16px', display: 'flex', flexDirection: 'column', gap: 3.9 }}>
                    <Typography sx={{ fontSize: '.95rem', fontWeight: 700, color: '#1F1F1F' }}>Plus</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1F1F1F' }}>Free</Typography>
                      <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#666666' }}>/month</Typography>
                    </Box>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 400, color: '#404040' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.plus.description') }}
                    />
                  </Box>
                </Box>
                <Box sx={{ padding: '.7rem' }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_1') }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_2') }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_3') }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_4') }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: '1rem 1.2rem', alignItems: 'center' }}
                  >
                    <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                    <Typography
                      sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}
                      dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.benefit_5') }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: '#666666' }}
                dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.pricing_small_note') }}
              />
            </Box>
          </Box>
          {/* box after content */}
          <Box
            sx={{
              backgroundImage: isMobile ? 'linear-gradient(359.61deg, #3777D6 13.42%, rgba(255, 255, 255, 0) 57.37%)' : 'linear-gradient(279.04deg, #3777D6 17.76%, rgba(255, 255, 255, 0) 77.73%)',
              padding: '32px 24px',
              border: '1px solid #F0F0F0',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: {md:'row', xs:'column'},
              justifyContent: 'space-between',
              alignItems: {md:'center', xs:''},
              width:{md:'100%', lg:'90%'},
              boxShadow: '0px 2px 10px 0px #00000014',
              gap:2
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: {md:20, xs:16}, fontWeight: 700, color: '#404040' }}
                dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.pricing_alert_title') }}
              />
              <Typography sx={{ fontSize: {md:14, xs:12}, fontWeight: 400, color: '#666666' }} dangerouslySetInnerHTML={{ __html: t('employer_page.pricing.pricing_alert_description') }} />
            </Box>

            <Link href='/register/employer' locale={locale}>
              <Button variant='contained' size='small' sx={{ textTransform: 'none' }}>
                {t('employer_page.pricing.pricing_alert_button')}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <Box sx={{width:{md:'75%', xs:'100%'}}}>
        <PricingFaq isMobile={isMobile} />
      </Box>
      <FooterView />
    </Box>
  )
}

Main.guestGuard = false
Main.authGuard = false
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main
