// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

export type ParamJobVacncy = {
  title: string
  major: string
  degree: string
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
          <img
            alt='logo'
            src={item.logo ? item.logo : '/images/educationalinfo.png'}
            style={{
              maxWidth: '100%',
              height: '100px',
              padding: 10,
              margin: 0
            }}
          />
          <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', m: 2 }}>
            <Typography sx={{ color: '#262525', fontWeight: 600 }}>
              {`${item.title.charAt(0).toUpperCase() + item.title.slice(1)}`}
            </Typography>
            <Typography sx={{ color: '#262525', fontWeight: 400 }}>
              {item.major.charAt(0).toUpperCase() + item.major.slice(1)}
            </Typography>
            <Typography sx={{ color: '#262525', fontWeight: 400 }}>
              {item.degree.charAt(0).toUpperCase() + item.degree.slice(1)}
            </Typography>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const EducationalInfo = (props: Props) => {
  const { vacancy } = props

  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: '#262525', textTransform: 'uppercase', fontWeight: 600 }}>
                Educational Info
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

export default EducationalInfo
