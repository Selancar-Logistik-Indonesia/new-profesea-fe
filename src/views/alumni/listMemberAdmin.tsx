import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {  Avatar, createTheme,   ThemeProvider  } from '@mui/material' 
import Link from 'next/link' 
import { Divider } from '@mui/material' 
 
export type ParamMain = {
  name: string
  skill: string
  location: string
}

 
const theme = createTheme({
  components: {
    // Name of the component
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderColor: 'green',
          borderRadius: 5,
          position: 'relative',
          zIndex: 0
        }
      }
    }
  }
})
interface Props {
  listAlumni: any[]
} 
 
const renderList = (listAlumni: any[]) => {
  if (!listAlumni || listAlumni.length == 0) {
    return
  }

  return listAlumni?.map(item => {

    return (
      <ThemeProvider theme={theme} key={item?.id}>
        <Grid item container xs={12} md={12} mt={2}>
          <Grid xs={2} md={1}>
            <Avatar
              sx={{ backgroundColor: 'white' }}
              src={item.user.photo != '' ? item.user.photo : '/images/avatars/1.png'}
            />
          </Grid>
          <Grid xs={10} md={11}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: ['left'],
                justifyContent: 'left',
                mt:1
              }}
            >
              <Link style={{ textDecoration: 'none' }} href={'/alumni?id=' + item?.id}>
                <Typography align='left' sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={18}>
                  {item.user.name ? item.user.name : '-'}
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Divider style={{ width: '100%' }} />
        </Grid>
      </ThemeProvider>
    )
  })
}

const ListMemberAdmin = (props: Props) => {
  const { listAlumni } = props
 
 
  return (
    <Grid container >
      {renderList(listAlumni)}
    </Grid>
  )
}

export default ListMemberAdmin
