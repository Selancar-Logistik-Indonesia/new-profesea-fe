import { Icon } from '@iconify/react'
import { Box, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material'
import Link from 'next/link'

type DialogProps = {
  visible: boolean
  onCloseClick: VoidFunction
}

const CreateJobCard = ({ link, label, description, icon }: { link: string; label: string; description: string, icon:string }) => {
  const createJobLink = (type: string) => {
    return `/company/job-management/create-job?type=${type}`
  }

  return (
    <Box
      component={Link}
      href={createJobLink(link)}
      sx={{
        flex:1,
        border: '1.5px solid #E7E7E7',
        borderRadius: '6px',
        p: '24px 16px',
        backgroundColor: '#F8F8F7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        '&:hover': {
          borderColor: '#0B58A6',
          backgroundColor: '#F2F8FE',
          '& .hover': { color: '#32497A !important' }
        }
      }}
    >
      <Icon className='hover' icon={icon} fontSize={28} color='#868686' />
      <Box className='hover' flexDirection='column' gap='8px' textAlign='center'>
        <Typography className='hover' sx={{ color: '#868686', fontSize: '16px', fontWeight: 700 }}>
          {label}
        </Typography>
        <Typography className='hover' sx={{ color: '#868686', fontSize: '12px', fontWeight: 400 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

const DialogCreate = (props: DialogProps) => {
  const { visible, onCloseClick } = props

  return (
    <Dialog maxWidth='md' fullWidth={true} open={visible} onClose={onCloseClick}>
      <DialogContent sx={{ position: 'relative', p: '32px' }}>
        <IconButton size='small' onClick={onCloseClick} sx={{ position: 'absolute', right: '24px', top: '24px' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Grid container gap={6}>
          <Grid item xs={12} justifyItems='center'>
            <Typography sx={{ color: '#32497A', fontSize: 20, fontWeight: 700 }}>Add New Job</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', gap: '24px' }}>
            <CreateJobCard
              icon='ph:anchor'
              link='seafarer'
              label='Seafarer'
              description='A seafarer is an individual working on a ship, operating or supporting maritime activities at sea.'
            />
            <CreateJobCard
              icon='ph:briefcase'
              link='professional'
              label='Professional'
              description='A professional is an individual skilled in a specific field, adhering to high standards and ethics.'
            />
            <CreateJobCard
              icon='hugeicons:waiter'
              link='hospitality'
              label='Hospitality'
              description='Cruise hospitality professionals create memorable guest experiences at sea.'
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCreate
