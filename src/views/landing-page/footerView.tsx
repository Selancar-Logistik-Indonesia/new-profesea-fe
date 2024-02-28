import { Box, Grid, IconButton, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))
const FooterView = () => {
  const { t } = useTranslation()

  return (
    <Grid
      sx={{ backgroundColor: '#f4f4f4', backgroundSize: 'cover', maxWidth: { xs: '100%' }, px: { xs: 5, md: 10 } }}
      pt={5}
      pb={5}
      container
      id='footer'
    >
      <Grid xs={12} md={3.5} item sx={{ mt: { xs: 7 } }}>
        <Grid container>
          <Grid item xs={12} textAlign={'left'} justifyItems='flex-end'>
            <Box
              component='img'
              sx={{ width: 125 }}
              alt='The Profesea logo'
              title='Profesea'
              src='/images/logosamudera.png'
            />
            <Typography variant='body1' style={{ color: '#101820' }} mt={2} maxWidth='65%'>
              {t('landing_footer_title')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={0.5} sx={{ px: { md: 10 } }}></Grid>
      <Grid item xs={12} md={4.5} sx={{ px: { md: 12 } }}>
        <Grid container mt={6}>
          <Grid item md={6} xs={6}>
            <Typography sx={{ mb: 2 }} color={'#ef6c00'} fontSize={16}>
              {' '}
              {t('landing_footer_menu_1')}
            </Typography>
            <LinkStyled href={'/term'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                {t('landing_footer_menu_3')}
              </Typography>
            </LinkStyled>
            <LinkStyled href={'/privacy'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                {t('landing_footer_menu_4')}
              </Typography>
            </LinkStyled>
            <LinkStyled href={'/faqs'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                {t('landing_footer_menu_5')}
              </Typography>
            </LinkStyled>
          </Grid>
          <Grid item md={4} xs={6} alignContent={'left'}>
            <Typography sx={{ mb: 0 }} color={'#ef6c00'} fontSize={16}>
              {t('landing_footer_menu_2')}
            </Typography>
            <LinkStyled href={'/'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                {t('landing_footer_menu_6')}
              </Typography>
            </LinkStyled>
            <LinkStyled href={'/landingpage-recruiter'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                {t('landing_footer_menu_7')}
              </Typography>
            </LinkStyled>
            <LinkStyled href={'/landingpage-trainer'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                {t('landing_footer_menu_8')}
              </Typography>
            </LinkStyled>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} md={3} item sx={{ px: { md: 10 } }}>
        <Grid container>
          <Grid item mt={5}>
            <Typography mt={2} fontSize={16} color={'#ef6c00'}>
              {t('landing_footer_menu_9')}
            </Typography>
            <IconButton href='https://www.facebook.com/profesea.id' target='_blank'>
              <FontAwesomeIcon icon={faFacebook} color='#101820' />
            </IconButton>
            <IconButton href='https://www.instagram.com/profesea_id' target='_blank'>
              <FontAwesomeIcon icon={faInstagram} color='#101820' />
            </IconButton>
            <IconButton href='https://www.linkedin.com/company/profesea-indonesia/' target='_blank'>
              <FontAwesomeIcon icon={faLinkedin} color='#101820' />
            </IconButton>
            <IconButton href='https://www.tiktok.com/@profesea_id' target='_blank'>
              <FontAwesomeIcon icon={faTiktok} color='#101820' />
            </IconButton>
          </Grid>
          {/* <Grid item xs={12} textAlign={'left'} justifyItems='flex-end'>
            <Typography mt={1} variant='body1' color={'#101820'}>
              Jl. Letjen S. Parman Kav. 35 <br></br>Palmerah, Jakarta Barat,
              <br></br>DKI Jakarta, 11480
            </Typography>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid xs={12} md={12} item sx={{ mt: { xs: 7 } }}>
        <Typography color='#101820' align='center'>
          &copy; 2023 PT Selancar Logistik Indonesia. All Rights Reserved. Profesea
        </Typography>
      </Grid>
    </Grid>
  )
}

export default FooterView
