import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import moment from 'moment'

interface IWorkExperience {
  setOpenAddModalWE: (openAddModalWE: boolean) => void
  deletewe: (itemId: number | null | undefined) => void
  editWorkExperience: (item: any) => void
  openAddModalWE: boolean
  itemDataWE: any
}

export default function WorkExperienceSection(props: IWorkExperience) {
  const { setOpenAddModalWE, editWorkExperience, openAddModalWE, deletewe, itemDataWE } = props

  return (
    <Grid item container xs={12}>
      <Grid xs={10} md={11}>
        <Grid container item xs={12} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Work Experience Info
          </Typography>
        </Grid>
        <Grid container item xs={12} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
            Fill in the details below to highlight your professional background and achievements
          </Typography>
        </Grid>
      </Grid>
      <Grid xs={2} md={1} display='flex' justifyContent='flex-end' alignItems='flex-end'>
        <Button variant='contained' size='small' onClick={() => setOpenAddModalWE(!openAddModalWE)}>
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
        {itemDataWE.map((item: any) => (
          <Grid item container xs={12} marginTop={2} key={item.id}>
            <img
              alt='logo'
              src={item.logo ? item.logo : '/images/work-experience.png'}
              style={{
                maxWidth: '100px',
                height: '100px',
                padding: 10,
                margin: 0
              }}
            />
            <Grid item container xs={true} md={true} sx={{ flexGrow: '1', ml: 2 }}>
              <Grid xs={10} marginTop={2}>
                <Typography variant='body2' sx={{ color: '#262525', fontSize: '14px' }}>
                  {item.position}
                </Typography>
                <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
                  {item.institution}
                </Typography>
                <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
                  {item.vessel_type?.name}
                </Typography>
                <Grid xs={12} display='flex'>
                  <Box>
                    <Typography variant='body1'>{`${moment(item.start_date).format('MMMM YYYY')} - ${
                      item.is_current ? 'Present' : moment(item.end_date).format('MMMM YYYY')
                    }`}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid xs={12} md={2} marginTop={2} display='flex' item container>
                <Grid xs={12} display='flex' item container>
                  <Grid xs={12} md={12} container direction='row' justifyContent='flex-end' alignItems='center'>
                    <Box margin={1}>
                      <Button variant='outlined' color='primary' size='small' onClick={() => editWorkExperience(item)}>
                        <Icon
                          fontSize='large'
                          icon={'solar:pen-new-round-bold-duotone'}
                          color={'primary'}
                          style={{ fontSize: '18px' }}
                        />
                      </Button>
                    </Box>
                    <Box margin={1}>
                      <Button variant='outlined' color='error' size='small' onClick={() => deletewe(item.id)}>
                        <Icon
                          fontSize='large'
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
            <Grid xs={12}>
              <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px', whiteSpace: 'pre-line' }}>
                {item.description}
              </Typography>
            </Grid>
            <Divider style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
