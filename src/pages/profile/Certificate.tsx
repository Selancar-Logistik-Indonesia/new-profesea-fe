// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Icon } from '@iconify/react'
import { Button, Divider } from '@mui/material'

export type ParamJobVacncy = {
  title: string
  path: string
  document_name: string
  id: number
  childs: []
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
        <Box key={index}>
          {item.childs?.length <= 0 && (
            <Grid item container xs={12} marginTop={2} key={item.id} alignItems='center' mb={2}>
              <Grid xs={12} md={2} display='flex' item container>
                <Grid xs={12} md={12} container direction='row' justifyContent='flex-end' alignItems='center'>
                  <Button variant='outlined' color='info' size='small' href={item.path} target='_blank'>
                    <Icon
                      fontSize='large'
                      icon={'icon-park-outline:preview-open'}
                      color={'info'}
                      style={{ fontSize: '18px' }}
                    />
                  </Button>
                </Grid>
              </Grid>
              <Grid xs={12} md={10} container direction='row' alignItems='center' padding={1}>
                <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
                  {item.document_name.charAt(0).toUpperCase() + item.document_name.slice(1)}
                </Typography>
              </Grid>
            </Grid>
          )}
          {item.childs?.length > 0 && (
            <>
              {item.document_name}
              {item.childs.map(
                (itemhead: { id: React.Key | null | undefined; document_name: string; path: string }) => (
                  <Grid item container xs={12} marginTop={2} key={item.id} alignItems='center' mb={2}>
                    {/* <Grid xs={12} md={2} display='flex' item container>
                      <Grid xs={12} md={12} container direction='row' justifyContent='flex-end' alignItems='center'>
                        <Button variant='outlined' color='info' size='small' href={itemhead.path} target='_blank'>
                          <Icon
                            fontSize='large'
                            icon={'icon-park-outline:preview-open'}
                            color={'info'}
                            style={{ fontSize: '18px' }}
                          />
                        </Button>
                      </Grid>
                    </Grid> */}
                    <Grid xs={12} md={12} container direction='row' alignItems='center' padding={1}>
                      <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
                        {itemhead.document_name.charAt(0).toUpperCase() + itemhead.document_name.slice(1)}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              )}
            </>
          )}
          <Divider style={{ width: '100%' }} />
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
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Certificate
        </Typography>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 14, fontWeight: '400' }}>
          You Have <span style={{ color: 'rgba(50, 73, 122, 1)' }}>{vacancy.length} Certificates</span>
        </Typography>
        {renderList(vacancy)}
      </Box>
    </Box>
  )
}

export default Ceritificate
