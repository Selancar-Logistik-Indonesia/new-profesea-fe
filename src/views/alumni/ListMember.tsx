import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Paper } from '@mui/material'
import Link from 'next/link'
import { toLinkCase } from 'src/utils/helpers'

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listMember?: any
}

const renderList = (listMember: any[]) => {
  if (!listMember || listMember.length == 0) {
    return <></>
  }

  return listMember.map(item => {
    debugger
    const userPhoto = item?.user?.photo ? item?.user?.photo : '/images/avatars/default-user.png'

    return (
      <Grid item xs={12} md={3} key={item?.id}>
        <Paper sx={{ marginTop: '10px', border: '1px solid #eee', height: 78 }} elevation={0}>
          <Link
            style={{ textDecoration: 'none' }}
            href={`/${item.user?.role === 'Seafarer' ? 'profile' : 'company'}/${toLinkCase(item.user?.username)}`}
          >
            <Box
              height={75}
              sx={{
                display: 'flex',
                alignContent: 'center',
                '& svg': { color: 'text.secondary' }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} ml={2} mr={3}>
                <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 50, height: 50 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }} marginTop={2}>
                <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14}>
                  {item?.user?.name ?? '-'}
                </Typography>
                <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                  NIM : {item?.nim ?? '-'}
                </Typography>
                <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                  Graduate : {item?.lulusan ?? '-'}
                </Typography>
              </Box>
            </Box>
          </Link>
        </Paper>
      </Grid>
    )
  })
}

const ListMemberView = (props: Props) => {
  const { listMember } = props

  return (
    <Grid container spacing={2}>
      {renderList(listMember)}
    </Grid>
  )
}

export default ListMemberView
