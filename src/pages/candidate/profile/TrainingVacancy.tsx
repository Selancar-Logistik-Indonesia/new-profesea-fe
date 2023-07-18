// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
 

export type ParamJobVacncy = {
  title: string
  namapt: string
  lokasi: string
  waktu: string
  category: any
  trainer: any
  h_created_at: any
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
          <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center',margin:'5px' }}>
            <Typography sx={{ color: '#424242', fontWeight: 600 }}>
              {`${item.title.charAt(0).toUpperCase() + item.title.slice(1)}`}
            </Typography>
            <Typography sx={{ color: '#424242', fontWeight: 400 }}>
              {item.trainer.name.charAt(0).toUpperCase() + item.trainer.name.slice(1)}
            </Typography>
           
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}
 

const AboutOverivew = (props: Props) => {
  const {   vacancy  } = props

  return (
    <Grid container  >
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: "#424242", textTransform: 'uppercase' , fontWeight: 600}}>
                My Training
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

export default AboutOverivew
