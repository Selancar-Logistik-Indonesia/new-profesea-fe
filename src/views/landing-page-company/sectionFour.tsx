import { Grid, Box, Collapse, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
// import { useTranslation } from 'react-i18next'

const Accordion = (props: { summary: string; description: string }) => {
  const { summary, description } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Grid item xs={12} md={8}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={24} fontWeight={700}>
            {summary}
          </Typography>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <Icon icon='flowbite:circle-plus-outline' fontSize={36} />
          </IconButton>
        </Box>
        <Collapse in={!isOpen}>
          <Typography fontSize={16} fontWeight={400} align={'left'} sx={{ w: '60%' }}>
            {description}
          </Typography>
        </Collapse>
      </Box>
    </Grid>
  )
}

const sectionThree = () => {
  // const { t } = useTranslation()

  return (
    <Grid item container sx={{ px: 10, pt: 20, pb: 40 }}>
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
        <Accordion summary='Bagaimana bergabung sebagai perusahaan di Profesea' description='register.' />
        <Accordion summary='Apakah Profesea berbayar?' description='free ongkir.' />
      </Grid>
    </Grid>
  )
}

export default sectionThree
