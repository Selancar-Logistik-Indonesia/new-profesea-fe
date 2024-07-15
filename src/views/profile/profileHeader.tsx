import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, Grid } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getUserAvatar } from 'src/utils/helpers'
import { useAuth } from 'src/hooks/useAuth'
import DialogShare from './shareDialog'
import ConnectButton from 'src/layouts/components/ConnectButton'
// import MessageButton from 'src/layouts/components/MessageButton'

const SocialMedia = (props: { icon: string; type: string; link?: string }) => {
  const { icon, type, link } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      <Icon icon={icon} style={{ fontSize: 18 }} />
      <Button href={link} sx={{ textTransform: 'none', textDecoration: 'underline', py: 0, px: 1 }}>
        {type}
      </Button>
    </Box>
  )
}

const ProfileHeader = ({ dataUser }: { dataUser: IUser }) => {
  const { user } = useAuth()
  const [openShare, setOpenShare] = useState(false)
  const [connections, setConnections] = useState<number>(0)
  const [facebook, setFacebook] = useState<any>()
  const [instagram, setInstagram] = useState<any>()
  const [linkedin, setLinkedin] = useState<any>()
  const [isVisitor, setIsVisitor] = useState<boolean>(false)

  const industry =
    dataUser.team_id === 1
      ? 'Seafarer'
      : dataUser.team_id === 2
      ? 'Professional'
      : dataUser.team_id === 3
      ? dataUser.industry?.name
      : 'Trainer'
  const editProfileLink = dataUser.team_id === 3 ? '/company' : dataUser.team_id === 4 ? '/trainer' : '/candidate'

  useEffect(() => {
    let userId = user?.id
    if (user?.username !== dataUser.username) {
      setIsVisitor(true)
      userId = dataUser.id
    }

    const payload = { page: 1, take: 5, user_id: userId }
    HttpClient.get('/public/data/user/sosmed', payload).then(response => {
      const code = response.data.sosmeds.data
      for (const element of code) {
        if (element.sosmed_type == 'Facebook') {
          setFacebook(element.sosmed_address)
        }

        if (element.sosmed_type == 'Instagram') {
          setInstagram(element.sosmed_address)
        }

        if (element.sosmed_type == 'LinkedIn') {
          setLinkedin(element.sosmed_address)
        }
      }
    })

    HttpClient.get('/public/data/user/statistics?user_id=' + user?.id).then(response => {
      const connections = response.data.total_connected
      setConnections(connections)
    })
  }, [dataUser])

  return (
    <>
      <Box sx={{ width: '100%', borderRadius: '16px', boxShadow: 3, backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
        <Box
          component='img'
          alt='profile-header'
          src={dataUser.banner ? dataUser.banner : '/images/avatars/headerprofile3.png'}
          sx={{
            width: '100%',
            height: '230px',
            objectFit: 'cover',
            borderRadius: '0 !important'
          }}
        />
        <Grid container sx={{ p: '24px', display: 'flex', gap: '12px' }}>
          <Grid item xs={12} md={true} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box
              component='img'
              alt='profile-picture'
              src={getUserAvatar(dataUser!)}
              sx={{ mt: '-90px', width: 120, height: 120, border: '5px solid white', borderRadius: '12px' }}
            />
            <Box>
              <Typography sx={{ fontSize: 24, fontWeight: 'bold', mb: '8px' }}>{dataUser.username}</Typography>
              <Typography sx={{ color: '#636E72', fontSize: 16 }}>{industry}</Typography>
            </Box>
            <Typography sx={{ color: '#949EA2', fontSize: 14 }}>{`${dataUser.address?.city?.city_name ?? '-'}, ${
              dataUser.country?.nicename ?? '-'
            }`}</Typography>
            <Typography sx={{ color: 'primary.main', fontSize: '14px', fontWeight: 'bold' }}>{`${connections} ${
              connections > 1 ? 'connections' : 'connection'
            }`}</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-between', md: 'flex-start' },
                flexWrap: 'nowrap',
                gap: { xs: 0, md: '32px' }
              }}
            >
              {facebook && <SocialMedia icon='devicon:facebook' type='Facebook' link={facebook} />}
              {instagram && <SocialMedia icon='skill-icons:instagram' type='Instagram' link={instagram} />}
              {linkedin && <SocialMedia icon='devicon:linkedin' type='Linkedin' link={linkedin} />}
            </Box>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: '12px'
            }}
          >
            {isVisitor === true ? (
              <Box sx={{ display: 'flex', gap: '12px' }}>
                {/* <MessageButton user={dataUser} /> */}
                <ConnectButton user={dataUser} />
              </Box>
            ) : (
              <Button variant='contained' sx={{ textTransform: 'none' }} LinkComponent={Link} href={editProfileLink}>
                Edit Profile
              </Button>
            )}
            <Button
              variant='outlined'
              startIcon={<Icon icon='ph:share-network' style={{ fontSize: '18px' }} />}
              onClick={() => setOpenShare(!openShare)}
              sx={{ textTransform: 'none' }}
            >
              Share
            </Button>
          </Box>
        </Grid>
      </Box>
      {openShare && (
        <DialogShare
          name={dataUser.username}
          visible={openShare}
          onCloseClick={() => {
            setOpenShare(!openShare)
          }}
        />
      )}
    </>
  )
}

export default ProfileHeader
