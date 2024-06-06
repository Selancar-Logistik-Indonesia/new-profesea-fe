// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { getMonthYear } from 'src/utils/helpers'
import { useState } from 'react'

export type ParamJobVacncy = {
  logo: string | undefined
  institution: string
  position: string
  start_date: string
  end_date: string
  description: string
}

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  // teams: ProfileTeamsType[]
  vacancy: ParamJobVacncy[]
}

const renderList = (arr: ParamJobVacncy[]) => {
  const maxChars = 300

  if (arr && arr.length) {
    return arr.map((item, index) => {
      const [expand, setExpand] = useState(false)

      return (
        <Grid
          container
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
          <Grid item container xs={12}>
            <img
              alt='logo'
              src={item.logo ? item.logo : '/images/educationalinfo.png'}
              style={{
                width: '100px',
                height: '100px',
                padding: 10,
                margin: 0
              }}
            />
            <Grid item container xs={true} md={true} sx={{ flexGrow: '1' }}>
              <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', m: 2 }}>
                <Typography sx={{ color: '#262525', fontWeight: 800 }}>
                  {`${item.institution?.charAt(0).toUpperCase() + item.institution?.slice(1)}`}
                </Typography>
                <Typography sx={{ color: '#262525', fontWeight: 600 }}>
                  {item.position?.charAt(0).toUpperCase() + item.position?.slice(1)}
                </Typography>
                <Typography variant='body1'>{`${getMonthYear(item.start_date)} - ${getMonthYear(
                  item.end_date
                )}`}</Typography>
                <Grid item xs={12}>
                  <Typography
                    variant='body2'
                    align='justify'
                    sx={{ color: '#262525', fontSize: '14px', mt: 2, whiteSpace: 'pre-line' }}
                  >
                    {expand ? item.description : `${item.description?.slice(0, maxChars)}`}
                    {!expand && (
                      <span
                        onClick={() => {
                          setExpand(true)
                        }}
                        style={{ cursor: 'pointer', color: 'whiteblue' }}
                      >
                        ...see more
                      </span>
                    )}
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )
    })
  } else {
    return null
  }
}

const WorkeExperience = (props: Props) => {
  const { vacancy } = props

  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: '#262525', textTransform: 'uppercase', fontWeight: 800 }}>
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
