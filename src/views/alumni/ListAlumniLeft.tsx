import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Button, Card, CardContent } from '@mui/material'
import Link from 'next/link'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { getCleanErrorMessage, toLinkCase } from 'src/utils/helpers'
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
    const userPhoto = item.user.photo != '' ? item.user.photo : '/images/avatars/default-user.png'

    return (
      <Grid item container xs={12} pl={2} py={2} key={item?.id}>
        <Grid item container xs={12} spacing={2}>
          <Link
            style={{ textDecoration: 'none' }}
            href={`/${item.user?.role === 'Seafarer' ? 'profile' : 'company'}/${toLinkCase(item.user?.username)}`}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
              <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 55, height: 55 }} />
            </Box>
          </Link>
          <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
            <Link style={{ textDecoration: 'none' }} href={'/alumni?id=' + item?.id}>
              <Typography sx={{ color: '#0a66c2', fontWeight: 600 }}>
                {item.user.name ? item.user.name : '-'}
              </Typography>
            </Link>
            <Typography sx={{ color: '#32487A', fontWeight: 400 }}>NIM : {item.nim ? item.nim : ' - '}</Typography>
            <Typography sx={{ color: '#32487A', fontWeight: 400 }}>
              Graduate : {item.lulusan ? item.lulusan : '-'}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          mt={1}
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', gap: 10 } }}
        >
          <Button
            variant='contained'
            color='info'
            size='small'
            type='submit'
            onClick={() => joinAlumni(item.user.id, '/alumni/accjoin')}
          >
            Accept
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            type='submit'
            onClick={() => joinAlumni(item.user.id, '/alumni/rejectjoin')}
          >
            Reject
          </Button>
        </Grid>
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
                        variant='body2'
                        sx={{ color: '#32487A', fontWeight: '600', mb: 1 }}
                        fontSize={16}
                      >
                        Pending Request
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Grid>
            <Box sx={{ mt: 2 }}>{renderList(listAlumni, idalumni, props, firstload)}</Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LIstAlumniLeft
