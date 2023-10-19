import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar,  Paper } from '@mui/material' 
import Link from 'next/link'
import Group from 'src/contract/models/group' 

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listGroup: Group[]
}

const renderList = (listGroup: Group[]) => {
  if (!listGroup || listGroup.length == 0) {
    return
  
  }

  return listGroup?.map(item => { 
    const userPhoto = item.groupbanner != '' ? item.groupbanner : '/images/avatars/default-user.png' 

    return (
      <Grid item xs={12} md={4} key={item?.id}>
        <Paper sx={{ marginTop: '10px', border: '1px solid #eee' }} elevation={0}>
          <Box
            height={95}
            sx={{
              display: 'flex',
              alignContent: 'center',
              '& svg': { color: 'text.secondary' }
            }}
          >
            <Link style={{ textDecoration: 'none' }} href={'/group?id=' + item?.id}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 50, height: 50 }} />
              </Box>
            </Link>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }} marginTop={2}>
              <Link style={{ textDecoration: 'none' }} href={'/group?id=' + item?.id}>
                <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14}>
                  {item.title ? item.title : '-'}
                </Typography>
                <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                  {item.description ? item.description : '-'}
                </Typography>
              </Link>  
            </Box>
          </Box>
        </Paper>
      </Grid>
    )
  })
}

const LIstGroup = (props: Props) => {
  const { listGroup } = props
 
 
  return (
    <Grid container spacing={2}>
      {renderList(listGroup)}
    </Grid>
  )
}

export default LIstGroup
