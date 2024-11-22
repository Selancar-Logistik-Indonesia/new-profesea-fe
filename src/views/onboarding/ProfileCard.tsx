import { Icon } from '@iconify/react'
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'

const UserData = () => {
  const { user } = useAuth()

  return user
}

const EmptyData = () => {
  return <Box sx={{ flexGrow: 1, height: '100%', backgroundColor: '#F0F0F0', borderRadius: '4px' }} />
}

const SeafarerProfileCard = (tempData: any) => {
  const user = UserData()

  return (
    <Box sx={{ borderRadius: '8px', backgroundColor: '#FFFFFF', width: '381px', p: '24px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar
            alt={user?.name || 'Seafarer'}
            src={user && user.photo ? user.photo : '/images/avatars/default-user-2.png'}
            sx={{ width: 85, height: 85, border: '2px solid #F8F8F7' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between', gap: '8px' }}>
            <Typography sx={{ color: '#303030', fontSize: 20, fontWeight: 400 }}>
              {user?.name || 'My name is...'}
            </Typography>
            <Typography sx={{ color: '#868686', fontSize: 16, fontWeight: 400 }}>Seafarer</Typography>
          </Box>
        </Box>
        <Divider sx={{ border: '1px solid #F0F0F0' }} />
        <Grid container rowSpacing={2} columnSpacing={3}>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:whatsapp-logo' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.phone ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                +{user.country.phonecode} {user.phone}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:cake' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.date_of_birth ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>{user.date_of_birth}</Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:map-pin' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.address ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.address.city.city_name}, {user.address.country.nicename}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:clock' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.field_preference && user.field_preference.open_to_opp !== null ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.field_preference.open_to_opp === 1 ? 'Open to Work' : 'Currently Working'}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:briefcase' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.field_preference && user.field_preference.role_type ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.field_preference.role_type.name}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:boat' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.field_preference && user.field_preference.vessel_type ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.field_preference.vessel_type.name}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:globe-hemisphere-east' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.field_preference && user.field_preference.region_travel ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.field_preference.region_travel.name}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:anchor' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.no_experience !== null ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.no_experience ? 'No Experienced' : 'Experienced'}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const ProfessionalProfileCard = (tempData: any) => {
  const user = UserData()
  return (
    <Box sx={{ borderRadius: '8px', backgroundColor: '#FFFFFF', width: '381px', p: '24px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar
            alt={user?.name || 'Professional'}
            src={user && user.photo ? user.photo : '/images/avatars/default-user-2.png'}
            sx={{ width: 85, height: 85, border: '2px solid #F8F8F7' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between', gap: '8px' }}>
            <Typography sx={{ color: '#303030', fontSize: 20, fontWeight: 400 }}>
              {user?.name || 'My name is...'}
            </Typography>
            <Typography sx={{ color: '#868686', fontSize: 16, fontWeight: 400 }}>Professional</Typography>
          </Box>
        </Box>
        <Divider sx={{ border: '1px solid #F0F0F0' }} />
        <Grid container rowSpacing={2} columnSpacing={3}>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:whatsapp-logo' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.phone ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                +{user.country.phonecode} {user.phone}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:cake' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.date_of_birth ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>{user.date_of_birth}</Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:map-pin' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.address ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.address.city.city_name}, {user.address.country.nicename}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:clock' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.field_preference && user.field_preference.open_to_opp !== null ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.field_preference.open_to_opp === 1 ? 'Open to Work' : 'Currently Working'}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:briefcase' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.field_preference && user.field_preference.role_type ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.field_preference.role_type.name}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:globe-hemisphere-east' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.field_preference && user.field_preference.city ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.field_preference.city.city_name}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:compass' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.no_experience !== null ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.no_experience ? 'No Experienced' : 'Experienced'}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

const EmployerProfileCard = (tempData: any) => {
  const user = UserData()
  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  return (
    <Box sx={{ borderRadius: '8px', backgroundColor: '#FFFFFF', width: '381px', p: '24px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar
            alt={user?.name || 'Company'}
            src={user && user.photo ? user.photo : '/images/avatars/default-user-3.png'}
            sx={{ width: 85, height: 85, border: '2px solid #F8F8F7' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between', gap: '8px' }}>
            <Typography sx={{ color: '#303030', fontSize: 20, fontWeight: 400 }}>
              {user?.name || 'Company Name'}
            </Typography>
            <Typography sx={{ color: '#868686', fontSize: 16, fontWeight: 400 }}>Company</Typography>
          </Box>
        </Box>
        <Divider sx={{ border: '1px solid #F0F0F0' }} />
        <Grid container rowSpacing={2} columnSpacing={3}>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:whatsapp-logo' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.phone ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                +{user.country.phonecode} {user.phone}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:briefcase' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.industry ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>{user.industry.name}</Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:map-pin' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.address ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.address.city.city_name}, {user.address.country.nicename}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:link' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.website ? (
              <Typography
                component={Link}
                href={formatUrl(user.website)}
                target='_blank'
                sx={{
                  color: '#868686',
                  fontSize: 14,
                  fontWeight: 400,
                  textDecoration: 'underline',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                sdncindsicsidcnisnciwnciunwiucnw iunciuewnciwenciuwneciunewc
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:buildings' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.about ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>{user.about}</Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon icon='ph:files' style={{ flexShrink: 0, fontSize: 20, color: '#32497A' }} />
            {user && user.is_crewing !== null ? (
              <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>
                {user.is_crewing === 1 ? 'A crewing company' : 'Company'}
              </Typography>
            ) : (
              <EmptyData />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export { SeafarerProfileCard, ProfessionalProfileCard, EmployerProfileCard }
