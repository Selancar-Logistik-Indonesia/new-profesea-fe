import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Button, Paper, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { IUser } from 'src/contract/models/user'
import { Icon } from '@iconify/react'

import Link from 'next/link'
import { calculateAge, getMonthYear } from 'src/utils/helpers'
import { toLinkCase } from 'src/utils/helpers'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listCandidate: IUser[]
}

const handleChatWhatsapp = (phone: string) => {
  if (!phone) return

  const formattedPhone = phone.startsWith('0') ? phone.replace(/^0/, '+62') : `+62${phone}`
  const whatsappUrl = `https://wa.me/${formattedPhone}`

  window.open(whatsappUrl, '_blank')
}

const BoxedText = ({ children }: { children: string }) => {
  if (!children) return null
  return (
    <Box
      sx={{
        border: '1px solid #32497A',
        color: 'primary.main',
        borderRadius: '4px',
        py: '2.5px',
        px: '8px',
        fontSize: 14,
        whiteSpace: 'nowrap'
      }}
    >
      {children}
    </Box>
  )
}

const renderCardSeafarer = (item: IUser, isXs: boolean): JSX.Element => {
  const userPhoto = item.photo != '' ? item.photo : '/images/avatars/default-user-new.png'

  return (
    <Grid item xs={12} key={item?.id}>
      <Paper
        sx={{
          marginTop: '24px',
          border: '1px solid #DDDDDD',
          borderRadius: '8px',
          padding: isXs ? '12px' : '24px'
        }}
        elevation={0}
      >
        <Box sx={{ display: 'flex', alignContent: 'flex-start', gap: '12px' }}>
          <Avatar src={userPhoto} alt='profile-picture' sx={{ width: isXs ? 64 : 76, height: isXs ? 64 : 76 }} />
          <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', gap: '4px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <Typography sx={{ color: 'primary.main', fontSize: 16, fontWeight: 'bold' }}>{item.name}</Typography>
                {item.date_of_birth !== null && (
                  <Typography sx={{ fontSize: 14 }}>{calculateAge(item.date_of_birth)} years old</Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'nowrap', gap: '16px' }}>
                {!isXs && (
                  <Button
                    variant='contained'
                    onClick={() => handleChatWhatsapp(item.phone)}
                    sx={{ height: '34px', textTransform: 'none', fontSize: 14 }}
                    startIcon={<Icon icon='ph:whatsapp-logo' />}
                  >
                    Message
                  </Button>
                )}
                {/* {isXs ? (
                  <IconButton>
                    <Icon icon='ph:bookmark-simple' />
                  </IconButton>
                ) : (
                  <Button
                    variant='outlined'
                    startIcon={<Icon icon='ph:bookmark-simple' />}
                    sx={{ height: '34px', textTransform: 'none', fontSize: 14 }}
                  >
                    Save
                  </Button>
                )} */}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {!isXs && <Typography sx={{ color: '#949EA2', fontSize: 14 }}>Preference:</Typography>}
              <Typography sx={{ fontSize: 14 }}>{`(${item.field_preference?.role_type?.name})`}</Typography>
              <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />
              <Typography sx={{ fontSize: 14 }}>{item.field_preference?.vessel_type.name}</Typography>
            </Box>
            <Typography
              sx={{ color: '#949EA2', fontSize: 14 }}
            >{`${item.address.city.city_name}, ${item.address.country.nicename}`}</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: '16px' }}>
          {item.last_company && (
            <Box
              sx={{
                mb: '16px',
                display: 'flex',
                flexDirection: isXs ? 'column' : 'row',
                alignItems: 'start'
              }}
            >
              <Typography sx={{ width: '150px', fontSize: 16, fontWeight: 'bold', mb: isXs ? '4px' : 0 }}>
                Last Experience
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isXs ? 'column' : 'row',
                  alignItems: isXs ? 'start' : 'center',
                  gap: 1.5
                }}
              >
                <BoxedText>{item.last_company.position}</BoxedText>
                {/* <BoxedText>{item.last_company.description}</BoxedText> */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography
                    sx={{
                      flexShrink: 1,
                      fontSize: 14,
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    at {item.last_company.institution}
                  </Typography>
                  <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />
                  <Typography sx={{ flexShrink: 0, color: '#949EA2', fontSize: 14 }}>{`${getMonthYear(
                    item.last_company.start_date,
                    true
                  )} - ${
                    item.last_company.still_here ? 'present' : getMonthYear(item.last_company.end_date, true)
                  }`}</Typography>
                </Box>
              </Box>
            </Box>
          )}
          {item.last_education && (
            <Box
              sx={{
                mb: '16px',
                display: 'flex',
                flexDirection: isXs ? 'column' : 'row',
                alignItems: 'start'
              }}
            >
              <Typography sx={{ width: '150px', fontSize: 16, fontWeight: 'bold', mb: isXs ? '4px' : 0 }}>
                Education
              </Typography>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography
                    sx={{
                      flexShrink: 1,
                      fontSize: 14,
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.last_education.title}
                  </Typography>
                  <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />
                  <Typography sx={{ flexShrink: 0, color: '#949EA2', fontSize: 14 }}>{`${getMonthYear(
                    item.last_education.start_date,
                    true
                  )} - ${
                    item.last_education.still_here ? 'present' : getMonthYear(item.last_education.end_date, true)
                  }`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: '4px' }}>
                  <BoxedText>{item.last_education.major}</BoxedText>
                  <Typography
                    sx={{
                      fontSize: 14,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flexShrink: 1
                    }}
                  >
                    {item.last_education.degree}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {isXs && (
            <Button
              variant='contained'
              startIcon={<Icon icon='ph:whatsapp-logo' />}
              onClick={() => handleChatWhatsapp(item.phone)}
              sx={{ width: '100%', textTransform: 'none', fontSize: 14 }}
            >
              Message
            </Button>
          )}
        </Box>
      </Paper>
    </Grid>
  )
}

const renderCardNonSeafarer = (item: IUser, isXs: boolean): JSX.Element => {
  const userPhoto = item.photo != '' ? item.photo : '/images/avatars/default-user.png'

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

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return listCandidate?.map(item => {
    const employee_type = item.employee_type
    if (employee_type == 'onship') {
      return renderCardSeafarer(item, isXs)
    } else {
      return renderCardNonSeafarer(item, isXs)
    }
  })
}

const RecomendedView = (props: Props) => {
  const { listCandidate } = props

  return <Grid container>{renderList(listCandidate)}</Grid>
}

export default RecomendedView
