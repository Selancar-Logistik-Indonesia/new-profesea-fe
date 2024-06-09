import { Grid, Box, Collapse, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
// import { useTranslation } from 'react-i18next'

const Accordion = ({ summary, description }: { summary: string; description: string }) => {
  const [open, setOpen] = useState(true)

  return (
    <Grid item xs={12} md={8}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={24} fontWeight={700} ml={2}>
            {summary}
          </Typography>
          <IconButton onClick={() => setOpen(!open)}>
            <Icon icon='flowbite:circle-plus-outline' fontSize={32} />
          </IconButton>
        </Box>
        <Collapse in={!open}>
          <Typography fontSize={16} fontWeight={400} align={'left'} sx={{ w: '60%' }}>
            {description}
          </Typography>
        </Collapse>
      </Box>
    </Grid>
  )
}

const Background = (props: { img: string; [key: string]: any }) => {
  const { img, ...rest } = props

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: '100% 100%',
        backgroundRepeat: 'no-repeat',
        ...rest
      }}
    />
  )
}

const sectionThree = () => {
  // const { t } = useTranslation()

  return (
    <Grid item container sx={{ position: 'relative', px: 10, pt: { xs: 10, md: 20 }, pb: { xs: 20, md: 40 } }}>
      <Typography sx={{ mb: 6, width: '100%' }} color={'black'} fontSize={32} fontWeight='700' align={'center'}>
        FAQ
      </Typography>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <Accordion summary='Apa itu Profesea?' description='linked in maritim.' />
        <Accordion summary='Jenis lowongan apa saja yang ada di Profesea?' description='banyak.' />
        <Accordion
          summary='Manfaat membuka lamaran pekerjaan di Profesea?'
          description='Perusahaan kamu akan dengan mudah menemukan kandidat terbaik di industri maritim dan logistik.'
        />
        <Accordion summary='Bagaimana bergabung sebagai perusahaan di Profesea?' description='register.' />
        <Accordion summary='Apakah Profesea berbayar?' description='free ongkir.' />
      </Grid>
      <Background
        bottom={0}
        left={0}
        backgroundPosition='0% 100%'
        z={-1}
        img='/images/backgrounds/company-gelombang-kiri.png'
      />
      <Background bottom={0} right={0} z={-1} img='/images/backgrounds/company-gelombang-kanan.png' />
    </Grid>
  )
}

export default sectionThree
