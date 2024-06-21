import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Alert, Button, Divider, Grid } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { IUser } from 'src/contract/models/user'
import Address from 'src/contract/models/address'
import { HttpClient } from 'src/services'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProfileActionArea from 'src/views/profile/action_area'
import ShareArea from 'src/layouts/components/ShareArea'
import { getEmployeetypev2, getUserAvatar, toLinkCase } from 'src/utils/helpers'
import TextOverImage from './photoprofile'
import TextOverImagebiru from './photoprofilebiru'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'

type userProps = {
  datauser: IUser
  address: Address
}

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

const ProfileHeader = (props: userProps) => {
  const { user } = useAuth()
  const { datauser } = props
  const [connections, setConnections] = useState<number>(0)
  const [facebook, setFacebook] = useState<any>()
  const [instagram, setInstagram] = useState<any>()
  const [linkedin, setLinkedin] = useState<any>()
  const [showFriendship, setShowFriendship] = useState<boolean>(false)
  const [documents, setDocuments] = useState<any[]>([])

  useEffect(() => {
    let userId = user?.id
    if (user?.username !== datauser.username) {
      setShowFriendship(true)
      userId = datauser.id
    }

    const payload = { page: 1, take: 5, user_id: userId }
    HttpClient.get('/user/sosmed', payload).then(response => {
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

    HttpClient.get(AppConfig.baseUrl + '/user/candidate-document').then(response => {
      const itemData = response.data.documents
      setDocuments(itemData)
    })

    HttpClient.get('/user/statistics?user_id=' + user?.id).then(response => {
      const connections = response.data.total_connected
      setConnections(connections)
    })
  }, [datauser])

  return (
    <Card sx={{ width: '100%', border: 0, boxShadow: 0, backgroundColor: '#FFFFFF' }}>
      <CardMedia
        component='img'
        alt='profile-header'
        image={datauser.banner ? datauser.banner : '/images/avatars/headerprofile3.png'}
        sx={{
          width: '100%',
          height: '230px',
          objectFit: 'cover'
        }}
      />
      <CardContent sx={{ p: '24px', display: 'flex', gap: '12px' }}>
        <Grid item xs={true} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box
            component='img'
            alt='profile-picture'
            src={getUserAvatar(datauser!)}
            sx={{ mt: '-85px', width: 120, height: 120, border: '5px solid white', borderRadius: '12px' }}
          />
          <Box>
            <Typography sx={{ fontSize: 24, fontWeight: 'bold', mb: '8px' }}>{datauser.username}</Typography>
            <Typography sx={{ color: '#636E72', fontSize: 16 }}>{datauser.industry.name}</Typography>
          </Box>
          <Typography
            sx={{ color: '#949EA2', fontSize: 14 }}
          >{`${datauser.address.city.city_name}, ${datauser.country.nicename}`}</Typography>
          <Typography sx={{ color: 'primary.main', fontSize: '14px', fontWeight: 'bold' }}>{`${connections} ${
            connections > 1 ? 'connections' : 'connection'
          }`}</Typography>
          <Box sx={{ display: 'flex', gap: '32px' }}>
            {facebook && <SocialMedia icon='devicon:facebook' type='Facebook' link={facebook} />}
            {instagram && <SocialMedia icon='skill-icons:instagram' type='Instagram' link={instagram} />}
            {linkedin && <SocialMedia icon='devicon:linkedin' type='Linkedin' link={linkedin} />}
            <SocialMedia icon='devicon:facebook' type='Facebook' link={facebook} />
            <SocialMedia icon='skill-icons:instagram' type='Instagram' link={instagram} />
            <SocialMedia icon='devicon:linkedin' type='Linkedin' link={linkedin} />
          </Box>
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button variant='contained' sx={{ textTransform: 'none' }}>
            Edit Profile
          </Button>
          <Button
            variant='outlined'
            startIcon={<Icon icon='ph:share-network' style={{ fontSize: '18px' }} />}
            sx={{ textTransform: 'none' }}
          >
            Share
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProfileHeader
