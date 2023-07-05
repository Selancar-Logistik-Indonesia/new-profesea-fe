// ** React Imports
import React, { ReactNode } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'


import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'


type FormData = {
  companyName: string
  industryType: string
  country: string
  district: string
  city: string
  postalCode: string
  email: string
  code: string
  website: string
  phone: string
  address: string
  about: string
  usernamesosmed: string
}

const CompanyProfilePreview = () => {

  const {
  } = useForm<FormData>({
    mode: 'onBlur',
  })
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
    },
  ];

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container >
      <Grid xs={12} md={12} container sx={!hidden ? {
        p: 4,
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        marginBottom: '10px',
        marginLeft: '50px'

      } : {

      }}>
        <Grid md={2} xs={4} container justifyContent={'left'}>
          <img alt='logo' src='/images/avatar.png' style={{
            maxWidth: '100%',
            height: '120px',
            padding: 0,
            margin: 0
          }} 
          
          />

          

        </Grid>
        <Grid container md={10} xs={12} direction={'row'} justifyContent={'left'} alignContent={'left'} marginTop={'20px'}>
          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h5"  >PT Samudera Indonesia Maritim</Typography>
            <Box sx={{ marginTop: '20px' }} display='flex'>
              <Icon icon={'mdi:factory'} /> <Typography variant="body2" >Industries of Shipping Line</Typography>
              <Icon icon={'mdi:location'} /> <Typography variant="body2" >Jakarta, Indonesia 41361</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} container marginTop='50px' >
          <Typography variant="h5"  >About</Typography>
          <Typography variant="body2" >PT Samudera Indonesia Tbk adalah sebuah perusahaan logistik dan pelayaran yang berkantor pusat di Jakarta, Indonesia. Untuk mendukung kegiatan bisnisnya, hingga tahun 2022, perusahaan ini memiliki 150+ anak perusahaan, cabang, dan kantor yang tersebar di seantero Asia.</Typography>
        </Grid>
        <Grid xs={12} container marginTop='50px' >
          <Typography variant="h5"  >Galery</Typography>
        </Grid>
        <Grid item md={12}>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid xs={12} container marginTop='50px' >
          <Typography variant="h5"  >Social Media</Typography>
        </Grid>
        <Grid xs={12} container marginTop='50px' >
          <Box sx={{ marginTop: '20px' }} display='flex'>
            <Icon icon={'mdi:facebook'} /> <Typography variant="body2" >Samudera Indonesa</Typography>
            <Icon icon={'mdi:instagram'} /> <Typography variant="body2" >Samudera</Typography>
            <Icon icon={'mdi:linkedin'} /> <Typography variant="body2" >Samudera</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>

  )
}

CompanyProfilePreview.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

CompanyProfilePreview.guestGuard = true

export default CompanyProfilePreview
