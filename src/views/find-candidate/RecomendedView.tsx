import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Paper } from '@mui/material'
import { IUser } from 'src/contract/models/user'
import { toTitleCase } from 'src/utils/helpers'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listCandidate: IUser[]
}

const renderList = (listCandidate: IUser[]) => {
  if (!listCandidate || listCandidate.length == 0) {
    return <></>
  }

  return listCandidate.map((item) => {
    const userPhoto = (item.photo) ? item.photo : "/images/avatars/default-user.png";

    return (
      <Grid item xs={12} md={4} key={item?.id}>        
        <Paper sx={{ marginTop: '10px' }}>
        <Link style={{ textDecoration: 'none' }} href={'/candidate/profile/?id=' + item?.id} >
          <Box
            height={65}
            sx={{
              display: 'flex',
              alignContent: 'center',
              '& svg': { color: 'text.secondary' }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
              <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 50, height: 50 }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={2}>
              <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14} >
              {toTitleCase(item.field_preference?.role_type?.name ?? '-')}
              </Typography>
            </Box>
          </Box>
        </Link>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={2}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}>
            <Icon icon='raphael:employee' fontSize={'20px'} color='#32487A' />
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
            {toTitleCase(item.employee_type ? item.employee_type : '-')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}>
            <Icon icon='codicon:location' fontSize={'20px'} color='#32487A' />
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
              {item.field_preference?.city?.city_name} - {item.field_preference?.country?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'], mb: 2 }}>
            <Icon icon='mdi:currency-usd' fontSize={'20px'} color='#32487A' />
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
              from Rp. 1.000.000 To Rp. 9.000.000
            </Typography>
          </Box>
        </Box>
      </Paper>
      </Grid >
    )
  })
}

const RecomendedView = (props: Props) => {
  const { listCandidate } = props

  return (
    <Grid container spacing={2}>
      {renderList(listCandidate)}
    </Grid>
  )
}

export default RecomendedView;
