import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {   Button, CircularProgress, Grid,     TextField,     Typography } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'   
import DialogAdd from './DialogAdd'
import { v4 } from 'uuid'
import GroupContext, { GroupProvider } from 'src/context/GroupContext'
import { useGroup } from 'src/hooks/useGroup'
import LIstGroup from 'src/views/group/ListGroup'
import { Icon } from '@iconify/react'

 
 
const FindCandidate = () => {
  return (
    <GroupProvider>
      <ListGroup />
    </GroupProvider>
  )
}

 
const ListGroup = () => {
  const { fetchGroups,  hasNextPage, totalGroup, setPage } = useGroup();
  const [textCandidate, SetTextCandidate] = useState<any>('')    
  const [openAddModal, setOpenAddModal] = useState(false)
  const [hookSignature, setHookSignature] = useState(v4())

  const getdatapencarian = async () => {    
    fetchGroups({ take: 12, search: textCandidate})  
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
                                  <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                                    List Group
                                  </Typography>
                                </Grid>
                                <Grid item lg={10} xs={10}>
                                  <TextField
                                    id='fullName'
                                    // defaultValue={props.datauser.name}
                                    label='Search Group'
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
                                    Create a New Group
                                  </Button>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <GroupContext.Consumer>
                                  {({ listGroup, onLoading }) => {
                                    if (onLoading) {
                                      return (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                          <CircularProgress sx={{ mt: 20 }} />
                                        </Box>
                                      )
                                    }

                                    return (
                                      <InfiniteScroll
                                        dataLength={totalGroup}
                                        next={() => getdatapencarian()}
                                        hasMore={hasNextPage}
                                        loader={
                                          <Typography mt={5} color={'text.secondary'}>
                                            Loading..
                                          </Typography>
                                        }
                                      >
                                        <LIstGroup listGroup={listGroup} />
                                      </InfiniteScroll>
                                    )
                                  }}
                                </GroupContext.Consumer>
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
