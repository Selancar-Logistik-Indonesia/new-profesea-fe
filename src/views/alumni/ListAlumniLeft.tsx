import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Button, Card, CardContent } from '@mui/material'
import Link from 'next/link'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'

import { getCleanErrorMessage } from 'src/utils/helpers' 
import { useEffect, useState } from 'react'
// import Alumni from 'src/contract/models/alumni'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props { 
  idalumni: any
  reload: () => void
}

const renderList = (listAlumni: any[], idalumni: any, props: Props, reload: () => void) => {
  if (!listAlumni || listAlumni.length == 0) {
    return
  }
  const joinAlumni = async (iduser: any, url: any) => {
   
    const json = {
      idalumni: idalumni,
      iduser: iduser
    }
    try {
      console.log(json)
      const resp = await HttpClient.post(url, json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong create alumni!'
      }
       props.reload()
       reload()
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }

  return listAlumni?.map(item => {
    const userPhoto = item.profilepicture != '' ? item.profilepicture : '/images/avatars/default-user.png'

    return (
      <Grid item xs={12} md={12} key={item?.id}>
        <Box
          height={85}
          sx={{
            display: 'flex',
            alignContent: 'center',
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Link style={{ textDecoration: 'none' }} href={'/profile/' + item?.user.username}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
              <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 35, height: 35 }} />
            </Box>
          </Link>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }} marginTop={2}>
            <Link style={{ textDecoration: 'none' }} href={'/alumni?id=' + item?.id}>
              <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                {item.user.name ? item.user.name : '-'}
              </Typography>
            </Link>

            <Grid item container xs={12} spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>{item.nim ? item.nim : '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>{item.lulusan ?  ' - ' + item.lulusan : '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant='contained'
                  color='warning'
                  size='small'
                  type='submit'
                  onClick={() => joinAlumni(item.user.id, '/alumni/accjoin')}
                >
                  <div style={{ marginLeft: 5 }}>Accept</div>
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant='contained'
                  color='error'
                  size='small'
                  type='submit'
                  onClick={() => joinAlumni(item.user.id, '/alumni/rejectjoin')}
                >
                  <div style={{ marginLeft: 5 }}>reject</div>
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', ml: 2, alignItems: ['left', 'flex-start'] }}
            marginTop={2}
          ></Box>

          <Box
            sx={{ display: 'flex', flexDirection: 'column', ml: 2, alignItems: ['left', 'flex-start'] }}
            marginTop={2}
          >
            {/* <Button>Reject</Button> */}
          </Box>
        </Box>
      </Grid>
    )
  })
}

const LIstAlumniLeft = (props: Props) => {
  const { idalumni } = props  
   
  const [listAlumni, setReqListAlumni] = useState<any>(null)
  const firstload = async () => {
    const requestalumni = await HttpClient.get('/alumni/request-member?alumni_id=' + idalumni, {
      page: 1,
      take: 10
    })
    setReqListAlumni(requestalumni.data.alumnis.data)
 
  }
  useEffect(() => {
    firstload() 
  }, [])
 

      
  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Grid item lg={12} md={12} xs={12}>
              {listAlumni && (
                <>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ mr: 2 }}>
                    <Typography
                        align='left'
                        sx={{ fontFamily: 'Outfit', fontWeight: '800', color: '#FFFFFF', mb: 1 }}
                        fontSize={14}
                      >
                        Pending Request
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Grid>
            <Box sx={{ mt: 3 }}>{renderList(listAlumni, idalumni, props,firstload)}</Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LIstAlumniLeft
