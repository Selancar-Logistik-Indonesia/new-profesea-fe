import { Icon } from '@iconify/react'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FadeProps,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import toast from 'react-hot-toast'

export interface IDialogProfilePicture {
  isOpen: boolean
  onClose: () => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogProfilePicture: React.FC<IDialogProfilePicture> = ({ isOpen, onClose }) => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [profilePic, setProfilePic] = useState<any>(null)
  const [profilePicFile, setProfilePicFile] = useState<File>()

  const [loading, setLoading] = useState(false)

  const handleOnClose = () => {
    onClose()
    setProfilePic(null)
  }

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files && event?.target?.files[0]
    const objecUrl = file && URL.createObjectURL(file as unknown as File)
    if (file && objecUrl) {
      setProfilePic(objecUrl)
      const newFile = new File([file], `photo-profile-${new Date().getTime()}.png`, { type: 'image/png' })
      console.log(newFile)
      setProfilePicFile(newFile)
    }
  }

  const handleUpdateProfilePic = async () => {
    if (profilePicFile == undefined) {
      return
    }

    setLoading(true)
    try {
      const json = new FormData()
      json.append('photo', profilePicFile)
      await HttpClient.post(AppConfig.baseUrl + '/user/update-photo', json)
      handleOnClose()
      toast.success('Photo Profile Upload Successfully')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth='sm'
        scroll='body'
        onClose={handleOnClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            padding: '16px'
          }}
        >
          <IconButton size='small' onClick={handleOnClose} sx={{ position: 'absolute', right: '8px', top: '8px' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ pb: 4, textAlign: 'left', borderBottom: '1px solid rgba(219, 219, 219, 1)' }}>
            <Typography
              variant='h3'
              color={'rgba(48, 48, 48, 1)'}
              fontWeight='700'
              sx={{ fontSize: '16px !important' }}
            >
              Add Photo
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              py: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={profilePic ? profilePic : '/images/default-user-new.png'}
                sx={{ width: isMobile ? 100 : 210, height: isMobile ? 100 : 210 }}
              />
              <IconButton
                aria-label='upload picture'
                component='label'
                sx={{
                  position: 'absolute',
                  bottom: isMobile ? 0 : 15,
                  right: isMobile ? 0 : 15,
                  backgroundColor: '#e9e4e4'
                }}
              >
                <input hidden accept='image/*' type='file' onChange={handleUploadClick} />
                <Icon icon='iconoir:camera' fontSize={isMobile ? '8px' : '22px'} />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px !important',
            borderTop: '1px solid rgba(219, 219, 219, 1)'
          }}
        >
          <Button
            variant='contained'
            sx={{ textTransform: 'capitalize', backgroundColor: '#DDD', flex: 1, color: '#404040' }}
            onClick={handleOnClose}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ textTransform: 'capitalize', flex: 1 }}
            onClick={handleUpdateProfilePic}
          >
            {loading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Upload Photo'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogProfilePicture
