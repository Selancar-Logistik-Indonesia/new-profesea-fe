import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
// import { useTranslation } from 'react-i18next'

const CardList = (props: { title: string; img: string; description: string }) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))
  const { title, img, description } = props

  return (
    <Grid
      item
      xs={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: 'cover',
          width: '225px',
          aspectRatio: 1
        }}
      />
      <Typography align={'center'} fontSize={24} fontWeight={700} my={3}>
        {title}
      </Typography>
      <Typography
        fontSize={20}
        align={isXs ? 'left' : 'center'}
        sx={{ width: { md: 200, lg: 300 }, mt: { xs: 2, md: 0 } }}
      >
        {description}
      </Typography>
    </Grid>
  )
}

const sectionTwo = () => {
  // const { t } = useTranslation()

  return (
    <Grid item container sx={{ px: 10, py: 20 }}>
      <Typography sx={{ mb: 10, width: '100%' }} color={'black'} fontSize={32} fontWeight='700' align={'center'}>
        Mengapa Profesea?
      </Typography>
      <Grid container spacing={4} sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardList
          title='Talent Pool & Management'
          img='/images/cards/company-info1.png'
          description='Temukan serta kelola sumber bakat terbaik secara real-time untuk kebutuhan perusahaan Anda.'
        />
        <CardList
          title='Job Posting Pekerjaan'
          img='/images/cards/company-info2.png'
          description='Posting langsung lowongan pekerjaan perusahaan Anda dan langsung dilihat kandidat secara real-time.'
        />
        <CardList
          title='Forum Komunitas'
          img='/images/cards/company-info3.png'
          description='Berdiskusi seputar isu-isu terkini di industri maritim dan logistik.'
        />
        <CardList
          title='Media Sosial'
          img='/images/cards/company-info4.png'
          description='Bangun jaringan dan promosikan perusahaan Anda di lingkungan yang berfokus  pada karier.'
        />
      </Grid>
    </Grid>
  )
}

export default sectionTwo
