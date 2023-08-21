import { Box, Grid, IconButton, Typography, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import Link from "next/link";

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))
const FooterView = () => {

  const { t } = useTranslation();

  return (
    <Grid
      sx={{ backgroundColor: '#f4f4f4', backgroundSize: 'cover', px: { xs: 5, md: 10 } }}
      pt={5}
      pb={5}
      container
      id='footer'
    >
      <Grid xs={12} md={4} item sx={{ mt: { xs: 7 } }}>
        <Grid container>
          <Grid item xs={12} textAlign={'left'} justifyItems='flex-end'>
            <Box
              component='img'
              sx={{ width: 150 }}
              alt='The Profesea logo'
              title='Profesea'
              src='/images/logosamudera.png'
            />
            <Typography variant='body1' style={{ color: '#101820' }} mt={5}>
              {t('landing_footer_title')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5} sx={{ px: { md: 10 } }}>
        <Grid container mt={6}>
          <Grid item md={4} xs={6}>
            <Typography sx={{ mb: 2 }} color={'#ef6c00'} fontSize={16}>
              {' '}
              Company
            </Typography>
            <Typography mt={1.7} variant='body1' color={'#101820'}>
              Terms Of Service
            </Typography>
            <LinkStyled href={'/privacy'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                Privacy Policy
              </Typography>
            </LinkStyled>
            <Typography mt={1.7} variant='body1' color={'#101820'}>
              FAQ
            </Typography>
          </Grid>
          <Grid item md={4} xs={6} alignContent={'left'}>
            <Typography sx={{ mb: 0 }} color={'#ef6c00'} fontSize={16}>
              Platform
            </Typography>
            <LinkStyled href={'/'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                Seafarer
              </Typography>
            </LinkStyled>
            <LinkStyled href={'/landingpage-recruiter'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                Recruiter
              </Typography>
            </LinkStyled>
            <LinkStyled href={'/landingpage-trainer'}>
              <Typography mt={1.7} variant='body1' color={'#101820'}>
                Trainer
              </Typography>
            </LinkStyled>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} md={3} item sx={{ px: { md: 10 } }}>
        <Grid container>
          <Grid item mt={5}>
            <Typography mt={2} fontSize={16} color={'#ef6c00'}>
              Our Social Media
            </Typography>
            <IconButton>
              <FontAwesomeIcon icon={faFacebook} color='#101820' />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faInstagram} color='#101820' />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faLinkedin} color='#101820' />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faTwitter} color='#101820' />
            </IconButton>
          </Grid>
          <Grid item xs={12} textAlign={'left'} justifyItems='flex-end'>
            <Typography mt={1} variant='body1' color={'#101820'}>
              Jl. Letjen S. Parman Kav. 35 <br></br>Palmerah, Jakarta Barat,
              <br></br>DKI Jakarta, 11480
            </Typography>
          </Grid>
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

export default FooterView;