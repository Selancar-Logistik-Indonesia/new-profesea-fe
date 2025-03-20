import { Ref, forwardRef, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { Button, Card, CardContent, CircularProgress, DialogActions, Drawer, Grid, useMediaQuery, useTheme } from '@mui/material'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import Job from 'src/contract/models/job'
import { isAxiosError } from 'axios'
import { AppConfig } from 'src/configs/api'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type ViewProps = {
  selectedItem: Job | null
  openDialog: boolean
  setApply: (value: boolean) => void
  onClose: () => void
}

type contentProps = {
  selectedResume: string,
  setSelectedResume: (value: string) => void,
  isMobile: boolean,
  onClose: () => void
}

const CompleteDialog = (props: ViewProps) => {
  const [onLoading, setOnLoading] = useState(false)
  const [selectedResume, setSelectedResume] = useState<string>('')

  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const handleApprove = async () => {
    setOnLoading(true)

    if(selectedResume === 'upload'){
      try {
        const res = await HttpClient.get(AppConfig.baseUrl + `/user/download-cv/${user.id}`)
        if (!res.data.file || res.data.filename === '') {
          router.push('/candidate/?tabs=0&resume=true&fallbackUrl=' + pathname)

          return
        }
        
      } catch (error) {
        console.log(error)
        router.push('/candidate/?tabs=0&resume=true&fallbackUrl=' + pathname)
        
        return
      }
    }


    try {
      const resp = await HttpClient.get(`/job/${props.selectedItem?.id}/apply?resume_type=${selectedResume}`)

      if (resp.status !== 200) {
        props.setApply(false)
        throw new Error(resp.data.message ?? 'Something went wrong!')
      }

      toast.success(
        `${
          props.selectedItem?.category.employee_type === 'onship'
            ? props.selectedItem?.role_type?.name
            : props.selectedItem?.job_title ?? props.selectedItem?.role_type?.name
        } applied successfully!`
      )
      props.setApply(true)
      setOnLoading(false)
      props.onClose()
    } catch (error) {
      if (isAxiosError(error)) {
        if (error?.response?.status === 400) {
          toast.error(`${error?.response?.data?.message}`)
        }
      } else {
        toast.error('An error occurred while applying.')
      }
      props.setApply(false)
      setOnLoading(false)
      props.onClose()
    }
  }


  if(isMobile){
    return (
      <Drawer open={props.openDialog} anchor='bottom' onClose={props.onClose}>
        <Content selectedResume={selectedResume} setSelectedResume={setSelectedResume} isMobile={isMobile} onClose={props.onClose}/>
        <Box sx={{display:'flex', flexDirection:'column', padding:'24px', gap:'8px'}}>
          <Button variant='contained' color='primary' onClick={handleApprove} sx={{ textTransform: 'capitalize', padding:'8px 12px', fontSize:'14px', fontWeight:400 }}>{onLoading ? <CircularProgress /> : 'Apply Job'}</Button>
          <Button variant='outlined' color='secondary' onClick={props.onClose} sx={{ textTransform: 'capitalize', border:'1px solid #0B58A6' , color:'#0B58A6', padding:'8px 12px', fontSize:'14px', fontWeight:400}}>Cancel</Button>
        </Box>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={props.openDialog}
      maxWidth='md'
      scroll='body'
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <form noValidate>
        <DialogContent sx={{ padding: 0 }}>
          <Content selectedResume={selectedResume} setSelectedResume={setSelectedResume} isMobile={isMobile} onClose={props.onClose}/>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #F0F0F0',
            padding: '16px 32px !important'
          }}
        >
          <Button
            variant='outlined'
            size='small'
            color='secondary'
            onClick={props.onClose}
            sx={{ textTransform: 'capitalize', border:'1px solid #0B58A6' , color:'#0B58A6', width:'120px', padding:'8px 12px', fontSize:'14px', fontWeight:400}}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            variant='contained'
            type='button'
            size='small'
            disabled={onLoading}
            sx={{ textTransform: 'capitalize',width:'120px', padding:'8px 12px', fontSize:'14px', fontWeight:400 }}
          >
            {onLoading ? <CircularProgress size={20}/> : 'Apply Job'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}


const Content = ({onClose, selectedResume, setSelectedResume, isMobile} : contentProps) => {

  return(
    <>
    <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems:'center',
              boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
              padding: isMobile ? '24px' : '16px 32px'
            }}
          >
            <Box>
              <Typography fontSize={'18px'} fontWeight={700} color={'#303030'}>
                Select Your Resume
              </Typography>
            </Box>
            <IconButton size='small' onClick={onClose}>
              <Icon icon='mdi:close' fontSize={24} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', padding: isMobile ? '16px 24px' : '16px 32px' }}>
            <Typography color={'#404040'} fontSize={16} fontWeight='700'>
              How would you like to proceed
            </Typography>
            <Typography color={'#404040'} fontSize={14} fontWeight='400'>
              Choose the resume you'd like to use for this {isMobile && <br/>} application:
            </Typography>
          </Box>
          <Grid spacing={4} container sx={{ padding: isMobile ? '16px 24px' : '16px 32px', gridRow:1 }}>
            <Grid item xs={12} md={6}>
              <Card
              variant='outlined'
                onClick={() => {
                  setSelectedResume('upload')
                }}
                sx={{
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius:'8px !important',
                  ...(selectedResume === 'upload'
                    ? { border: '1px solid #0B58A6', backgroundColor: '#F2F8FE' }
                    : { border: '1px solid #868686' }),
                    '&:hover': {
                      backgroundColor: selectedResume === 'upload' ? '#F2F8FE' : '#FAFAFA'
                    }
                }}
              >
                <CardContent sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <Typography
                    fontSize={'16px'}
                    fontWeight={700}
                    color={selectedResume === 'upload' ? '#32497A' : '#303030'}
                  >
                    Uploaded Resume
                  </Typography>
                  <Typography fontSize={'14px'} fontWeight={400} color={'#868686'} whiteSpace={'nowrap'}>
                    Apply with your uploaded resume!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
              variant='outlined'
                onClick={() => {
                  setSelectedResume('platform')
                }}
                sx={{
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius:'8px !important',
                  ...(selectedResume === 'platform'
                    ? { border: '1px solid #0B58A6', backgroundColor: '#F2F8FE' }
                    : { border: '1px solid #868686' }),
                    '&:hover': {
                      backgroundColor: selectedResume === 'platform' ? '#F2F8FE' : '#FAFAFA'
                    }
                }}
              >
                <CardContent sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <Typography
                    fontSize={'16px'}
                    fontWeight={700}
                    color={selectedResume === 'platform' ? '#32497A' : '#303030'}
                  >
                    Platform Resume
                  </Typography>
                  <Typography fontSize={'14px'} fontWeight={400} color={'#868686'}>
                    Apply instantly—no uploads!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
    </>
  )
}

export default CompleteDialog
