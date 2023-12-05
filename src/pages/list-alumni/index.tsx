import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {   Button, CircularProgress, Grid,     TextField,     Typography } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'   
import DialogAdd from './DialogAdd'
import { v4 } from 'uuid'
import AlumniContext, { AlumniProvider } from 'src/context/AlumniContext'
import { useAlumni } from 'src/hooks/useAlumni'
import LIstAlumni from 'src/views/alumni/ListAlumni'
import { Icon } from '@iconify/react'

 
 
const FindCandidate = () => {
  return (
    <AlumniProvider>
      <ListAlumni />
    </AlumniProvider>
  )
}

 
const ListAlumni = () => {
  const { fetchAlumnis,  hasNextPage, totalAlumni, setPage } = useAlumni();
  const [textCandidate, SetTextCandidate] = useState<any>('')    
  const [openAddModal, setOpenAddModal] = useState(false)
  const [hookSignature, setHookSignature] = useState(v4())

  const getdatapencarian = async () => {    
    fetchAlumnis({ take: 12, search: textCandidate,status:true})  
  }

  useEffect(() => {
    getdatapencarian()
  }, [textCandidate, hookSignature])
 


  return (
    <>
      <Grid container spacing={2}>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Grid
                    container
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      boxSizing: 'border-box',
                      background: '#FFFFFF',
                      border: '1px solid rgba(76, 78, 100, 0.12)',
                      borderRadius: '10px',
                      // marginTop: '10px',
                      direction: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'top',
                      alignContent: 'top'
                    }}
                  >
                    <Grid item xs={12}>
                      <Box padding={5}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}  >
                            <Grid container spacing={6}>
                              <Grid item container xs={12}>
                                <Grid item xs={12}>
                                <Typography variant="h3" color={"#32487A"} fontWeight="800" fontSize={18} mb={2}> Alumni</Typography>
                                </Grid>
                                <Grid item lg={10} xs={10}>
                                  <TextField
                                    id='fullName'
                                    // defaultValue={props.datauser.name}
                                    label='Search Alumni'
                                    variant='outlined'
                                    size='small'
                                    sx={{ mb: 1 }}
                                    onChange={e => {
                                      setPage(1)
                                      SetTextCandidate(e.target.value)
                                    }}
                                  />
                                </Grid>
                                <Grid item lg={2} xs={2}>
                                  <Button 
                                    variant='contained'
                                    size='small' 
                                    startIcon={<Icon icon='solar:add-circle-bold-duotone' fontSize={10} />}
                                    sx={{ mr: 2 }}
                                    fullWidth
                                    onClick={() => setOpenAddModal(!openAddModal)}
                                  >
                                    Create a new Alumni
                                  </Button>
                                </Grid>
                              </Grid> 
                              <Grid item xs={12}>
                                <AlumniContext.Consumer>
                                  {({ listAlumni, onLoading }) => {
                                    if (onLoading) {
                                      return (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                          <CircularProgress sx={{ mt: 20 }} />
                                        </Box>
                                      )
                                    }

                                    return (
                                      <InfiniteScroll
                                        dataLength={totalAlumni}
                                        next={() => getdatapencarian()}
                                        hasMore={hasNextPage}
                                        loader={
                                          <Typography mt={5} color={'text.secondary'}>
                                            Loading..
                                          </Typography>
                                        }
                                      >
                                        <LIstAlumni listAlumni={listAlumni} />
                                      </InfiniteScroll>
                                    )
                                  }}
                                </AlumniContext.Consumer>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogAdd
        visible={openAddModal}
        onStateChange={() => setHookSignature(v4())}
        onCloseClick={() => setOpenAddModal(!openAddModal)}
      />
    </>
  )
   
}


FindCandidate.acl = {
  action: 'read',
  subject: 'home'
}
export default FindCandidate
