import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Paper, Tooltip } from '@mui/material'
import { IUser } from 'src/contract/models/user'
import { Icon } from '@iconify/react'

import Link from 'next/link'
import { calculateAge } from 'src/utils/helpers'
import { toLinkCase } from 'src/utils/helpers'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listCandidate: IUser[]
}

const renderCardSeafarer = (item: IUser): JSX.Element => {
  const userPhoto = item.photo != '' ? item.photo : '/images/avatars/default-user-new.png'

  return (
    <Grid item xs={12} md={4} key={item?.id}>
      <Paper sx={{ marginTop: '10px', border: '1px solid #eee' }} elevation={0}>
        <Link style={{ textDecoration: 'none' }} href={`/profile/${item?.id}/${toLinkCase(item?.username)}`}>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }} marginTop={2}>
              <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14}>
                {item.name ? item.name : '-'}
              </Typography>
              <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                {item.field_preference?.job_category?.name ?? '-'}
                {' | '}
                {item.field_preference?.role_type?.name ? item.field_preference?.role_type?.name : '-'}
              </Typography>
            </Box>
          </Box>
        </Link>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={2}>
          {/* Age */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Age'>
              <Icon icon='mingcute:birthday-2-line' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
              {item?.date_of_birth ? calculateAge(item?.date_of_birth) : '-'}
            </Typography>
          </Box>

          {/* location */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Location'>
              <Icon icon='entypo:location' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
              {item.address && item.address.city && item.address.city.city_name ? item.address.city.city_name : '-'}
            </Typography>
          </Box>

          {/* Vessel Type */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Vessel Type'>
              <Icon icon='icon-park-twotone:ship' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='-0.2rem' fontSize={12}>
              {item.field_preference?.vessel_type?.name ? item.field_preference?.vessel_type?.name : '-'}
            </Typography>
          </Box>

          {/* Last Experience */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Last Experience'>
              <Icon icon='solar:case-outline' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='-0.2rem' fontSize={12}>
              {item?.last_company != null ? item?.last_company.position : '-'}
            </Typography>
          </Box>

          {/* Last COC */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Last COC'>
              <Icon icon='solar:medal-ribbons-star-bold-duotone' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='-0.2rem' fontSize={12}>
              {item.last_coc ? item?.last_coc.competency?.title : '-'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}

const renderCardNonSeafarer = (item: IUser): JSX.Element => {
  const userPhoto = item.photo != '' ? item.photo : '/images/avatars/default-user-new.png'

  return (
    <Grid item xs={12} md={4} key={item?.id}>
      <Paper sx={{ marginTop: '10px', border: '1px solid #eee' }} elevation={0}>
        <Link style={{ textDecoration: 'none' }} href={`/profile/${item?.id}/${toLinkCase(item?.username)}`}>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }} marginTop={2}>
              <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14}>
                {item.name ? item.name : '-'}
              </Typography>
              <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                {item.last_company?.position ?? '-'}
                {' | '}
                {item.last_education?.major ? item.last_education?.major : '-'}
              </Typography>
            </Box>
          </Box>
        </Link>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={2}>
          {/* Age */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Age'>
              <Icon icon='mingcute:birthday-2-line' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
              {item?.date_of_birth ? calculateAge(item?.date_of_birth) : '-'}
            </Typography>
          </Box>

          {/* location */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Location'>
              <Icon icon='entypo:location' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
              {item.address && item.address.city && item.address.city.city_name ? item.address.city.city_name : '-'}
            </Typography>
          </Box>

          {/* Experience (years) */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Experiences'>
              <Icon icon='uis:bag' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='-0.2rem' fontSize={12}>
              {item?.total_experience_in_years ? item?.total_experience_in_years + ' years' : '-'}
            </Typography>
          </Box>

          {/* Last Company */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
            <Tooltip title='Last Company'>
              <Icon icon='mingcute:building-2-line' color='#32487A' fontSize={'20px'} />
            </Tooltip>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='-0.2rem' fontSize={12}>
              {item.last_company?.institution ? item.last_company?.institution : '-'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}

const renderList = (listCandidate: IUser[]) => {
  if (!listCandidate || listCandidate.length == 0) {
    return
  }

  return listCandidate?.map(item => {
    const employee_type = item.employee_type

    if (employee_type == 'onship') {
      return renderCardSeafarer(item)
    } else {
      return renderCardNonSeafarer(item)
    }
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

export default RecomendedView
