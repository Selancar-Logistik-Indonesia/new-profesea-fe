import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Carousel from './carousel'
// import { useTranslation } from 'react-i18next'

const items = [
  {
    title: 'Talent Pool & Management',
    img: '/images/cards/company-info1.png',
    description: 'Temukan serta kelola sumber bakat terbaik secara real-time untuk kebutuhan perusahaan Anda.'
  },
  {
    title: 'Job Posting Pekerjaan',
    img: '/images/cards/company-info2.png',
    description: 'Posting langsung lowongan pekerjaan perusahaan Anda dan langsung dilihat kandidat secara real-time.'
  },
  {
    title: 'Forum Komunitas',
    img: '/images/cards/company-info3.png',
    description: 'Berdiskusi seputar isu-isu terkini di industri maritim dan logistik.'
  },
  {
    title: 'Media Sosial',
    img: '/images/cards/company-info4.png',
    description: 'Bangun jaringan dan promosikan perusahaan Anda di lingkungan yang berfokus  pada karier.'
  }
]

const CardList = (props: { title: string; img: string; description: string; isXs: any }) => {
  const { title, img, description, isXs } = props

  return (
    <Grid
      item
      xs={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: 'cover',
          width: { md: '200px', lg: '225px' },
          aspectRatio: 1
        }}
      />
      <Typography align={'center'} fontSize={20} fontWeight={700} my={3}>
        {title}
      </Typography>
      <Typography fontSize={16} align={isXs ? 'left' : 'center'} sx={{ width: { md: 180, lg: 300 } }}>
        {description}
      </Typography>
    </Grid>
  )
}

const Background = (props: {
  img: string
  top?: number
  left?: number
  bottom?: number
  right?: number
  width?: string
  height?: string
  z?: number
}) => {
  const { top, left, bottom, right, width, height, z } = props
  const placement = {
    ...(top !== undefined && { top }),
    ...(left !== undefined && { left }),
    ...(bottom !== undefined && { bottom }),
    ...(right !== undefined && { right })
  }

  return (
    <Box
      sx={{
        zIndex: z ? z : 0,
        position: 'absolute',
        ...placement,
        width: width ? width : '100%',
        height: height ? height : '100%',
        backgroundImage: `url(${props.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat'
      }}
    />
  )
}

const SectionTwo = () => {
  // const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid item container sx={{ position: 'relative', px: 10, pt: 20, pb: 40 }}>
      <Typography sx={{ mb: 10, width: '100%' }} color={'black'} fontSize={32} fontWeight='700' align={'center'}>
        Mengapa Profesea?
      </Typography>
      {isXs ? (
        <Carousel items={items} timer={0} />
      ) : (
        <Grid container>
          {items.map((item, index) => (
            <CardList key={index} title={item.title} img={item.img} description={item.description} isXs={isXs} />
          ))}
        </Grid>
      )}
      <Background
        bottom={0}
        left={0}
        width='60%'
        height='60%'
        z={2}
        img='/images/backgrounds/company-bg-orange-kiri.png'
      />
      <Background
        bottom={0}
        right={0}
        width='60%'
        height='60%'
        z={4}
        img='/images/backgrounds/company-bg-orange-kanan.png'
      />
    </Grid>
  )
}

export default SectionTwo
