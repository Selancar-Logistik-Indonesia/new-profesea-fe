// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
 

export type ParamJobVacncy = {
  institution: string
  position: string
  start_date: string
  end_date: string 
}

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  // teams: ProfileTeamsType[]
  vacancy: ParamJobVacncy[] 
}

const renderList = (arr: ParamJobVacncy[]) => {
  if (arr && arr.length) { 
    
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' },
            border: '1px solid var(--light-action-disabled-background, rgba(76, 78, 100, 0.12))',
            borderRadius: '10px',
            padding: '5px'
          }}
        >
          <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ color: '#424242', fontWeight: 600 }}>
              {`${item.institution?.charAt(0).toUpperCase() + item.institution?.slice(1)}`}
            </Typography>
            <Typography sx={{ color: '#424242', fontWeight: 400 }}>
              {item.position?.charAt(0).toUpperCase() + item.position?.slice(1)}
            </Typography>

            <Grid xs={12} display='flex'>
              <Box>
                <Typography variant='body1'>
                  {item.start_date?.charAt(0).toUpperCase() + item.start_date?.slice(1)}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'> &nbsp; - &nbsp; </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {item.end_date?.charAt(0).toUpperCase() + item.end_date?.slice(1)}
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}
 

const WorkeExperience = (props: Props) => {
  const {   vacancy  } = props

  return (
    <Grid container  marginTop={'10px'} >
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: "#424242", textTransform: 'uppercase' , fontWeight: 600}}>
                Work Experience
              </Typography>
              {renderList(vacancy)}
            </Box>
            {/* <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Contacts
              </Typography>
              {renderList(contacts)}
            </Box> */}
           
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>
  )
}

export default WorkeExperience
