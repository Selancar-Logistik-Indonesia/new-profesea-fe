import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

interface IEducationalInfo {
  setOpenAddModal: (openAddModal: boolean) => void
  editEducation: (item: any) => void
  deleteeducation: (itemId: number | null | undefined) => {}
  openAddModal: boolean
  itemDataED: any
}

export default function EducationalInfoSection(props: IEducationalInfo) {
  const { setOpenAddModal, editEducation, deleteeducation, openAddModal, itemDataED } = props

  return (
    <Grid item container xs={12}>
      <Grid xs={10} md={11}>
        <Grid container item xs={12} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Educational Info
          </Typography>
        </Grid>
        <Grid container item xs={12} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
            Fulfill your Educational Info
          </Typography>
        </Grid>
      </Grid>
      <Grid xs={2} md={1} display='flex' justifyContent='flex-end' alignItems='flex-end'>
        <Button variant='contained' size='small' onClick={() => setOpenAddModal(!openAddModal)}>
          <Icon
            fontSize='small'
            icon={'solar:add-circle-bold-duotone'}
            color={'success'}
            style={{ fontSize: '18px' }}
          />
          <div style={{ marginLeft: 5 }}>ADD</div>
        </Button>
      </Grid>
      <Grid item container xs={12}>
        {itemDataED.map((item: any) => (
          <Grid item container xs={12} marginTop={2} key={item.id}>
            <Grid xs={4} md={1}>
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
            </Grid>
            <Grid xs={8} md={11} item container>
              <Grid xs={10} marginTop={2}>
                <Typography variant='body2' sx={{ color: '#262525', fontSize: '14px' }}>
                  {item.title}
                </Typography>
                <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
                  {item.major}
                </Typography>
                <Grid xs={12} display='flex'>
                  <Box>
                    <Typography variant='body1'>{item.start_date}</Typography>
                  </Box>
                  <Box>
                    <Typography variant='body1'> &nbsp; - &nbsp;</Typography>
                  </Box>
                  <Box>
                    <Typography variant='body1'>{item.end_date}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid xs={12} md={2} marginTop={2} display='flex' item container>
                <Grid xs={12} display='flex' item container>
                  <Grid xs={12} md={12} container direction='row' justifyContent='flex-end' alignItems='center'>
                    <Box margin={1}>
                      <Button variant='outlined' color='primary' size='small' onClick={() => editEducation(item)}>
                        <Icon
                          fontSize='small'
                          icon={'solar:pen-new-round-bold-duotone'}
                          color={'primary'}
                          style={{ fontSize: '18px' }}
                        />
                      </Button>
                    </Box>
                    <Box margin={1}>
                      <Button variant='outlined' color='error' size='small' onClick={() => deleteeducation(item.id)}>
                        <Icon
                          fontSize='small'
                          icon={'solar:trash-bin-trash-bold-duotone'}
                          color={'error'}
                          style={{ fontSize: '18px' }}
                        />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid xs={12}>
                  <Typography variant='body1'>{item.description}</Typography>
                </Grid> */}
            <Divider style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
