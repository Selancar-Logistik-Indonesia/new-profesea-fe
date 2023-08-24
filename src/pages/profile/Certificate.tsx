// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Icon } from '@iconify/react'
import { Button } from '@mui/material'
 

export type ParamJobVacncy = {
  title: string
  path: string
  document_name: string
  id: number
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
       
        > 
            <Grid item container xs={12} marginTop={2} key={item.id} alignItems='center'>
              <Grid xs={12} md={3} display='flex' item container>
                <Grid xs={12} md={12} container direction='row' justifyContent='flex-end' alignItems='center'>
                  <Box margin={1}>
                    <Button variant='outlined' color='info' size='small' href={item.path} target='_blank'>
                      <Icon
                        fontSize='large'
                        icon={'icon-park-outline:preview-open'}
                        color={'info'}
                        style={{ fontSize: '18px' }}
                      />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Grid xs={12} md={9} container direction='row' alignItems='center'>
                <Icon
                  fontSize='large'
                  icon={'solar:document-bold'}
                  color={'info'}
                  style={{ fontSize: '18px', margin: '5px' }}
                />
                <Typography variant='body2' sx={{ color: '#424242', fontSize: '12px' }}>
                  {item.document_name.charAt(0).toUpperCase() + item.document_name.slice(1)}
                </Typography>
              </Grid>
            </Grid> 
        </Box>
      )
    })
  } else {
    return null
  }
}
 

const Ceritificate = (props: Props) => {
  const { vacancy } = props

  return (
    <Grid container marginTop={'10px'}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: '#424242', textTransform: 'uppercase', fontWeight: 600 }}>
                Certificate
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

export default Ceritificate
