import { Ref, forwardRef, ReactElement, useState, useEffect  } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog' 
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade' 
import {  CircularProgress, TextField} from '@mui/material'
import Alumni from 'src/contract/models/alumni'
import AlumniContext, { AlumniProvider } from 'src/context/AlumniContext'
import { useAlumni } from 'src/hooks/useAlumni'
 import InfiniteScroll from 'react-infinite-scroll-component'
import ListMemberAdmin from 'src/views/alumni/listMemberAdmin'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})


type ViewProps = {
    selectedItem: Alumni;
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
};
const DialogDetail = (props: ViewProps) => {
 return (
   <AlumniProvider>
     <ListDetail selectedItem={props.selectedItem} visible={props.visible} onCloseClick={props.onCloseClick} onStateChange={props.onStateChange} />
   </AlumniProvider>
 )
}
 
const ListDetail = (props: ViewProps) => {
  const { selectedItem } = props
  const { fetchMember, hasNextPage,totalAlumni,setPage } = useAlumni()
  const [textCandidate, SetTextCandidate] = useState<any>('')       
  const getdatapencarian = async () => {


    fetchMember({ take: 12, search: textCandidate, status: true, id: selectedItem.id })
  }
    useEffect(() => {
      getdatapencarian()
    }, [textCandidate])
 

  return (
    <Dialog
      fullWidth
      open={props.visible}
      maxWidth='sm'
      scroll='body'
      onClose={props.onCloseClick}
      TransitionComponent={Transition}
    >
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
                            <Grid item xs={12}>
                              <Grid container spacing={6}>
                                <Grid item container xs={12}>
                                  <Grid item xs={12}>
                                    <Typography variant='h3' color={'#32487A'} fontWeight='800' fontSize={18} mb={2}>
                                      {' '}
                                      Alumni
                                    </Typography>
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
                                          <ListMemberAdmin listAlumni={listAlumni} />
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
      </>
    </Dialog>
  )
}

export default DialogDetail