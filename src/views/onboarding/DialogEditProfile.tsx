import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
import {
  Button,
  CircularProgress,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography
} from '@mui/material'
import Cropper from 'react-easy-crop'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import Fade, { FadeProps } from '@mui/material/Fade'
import Icon from 'src/@core/components/icon'
import { toast } from 'react-hot-toast'
import getCroppedImg from 'src/utils/cropImage'

interface IProps {
  visible: boolean
  previewProfile: any
  onProfileUpdate: (newPhotoUrl: string) => void
  onCloseClick: VoidFunction
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogEditProfile = (props: IProps) => {
  const [onLoading, setOnLoading] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation] = useState(0)

  const [selectedFileProfile, setSelectedFileProfile] = useState(undefined)
  const [selectedFileProfileUrl, setSelectedFileProfileUrl] = useState<any>(null)
  const [modalPreviewProfile, setModalPreviewProfile] = useState(undefined)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState<any>(null)

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  useEffect(() => {
    setModalPreviewProfile(props.previewProfile)
  }, [])

  useEffect(() => {
    if (croppedImage) {
      uploadPhotoProfile(croppedImage)
    }
  }, [croppedImage])

  useEffect(() => {
    setOnLoading(true)
    if (!selectedFileProfile) {
      setModalPreviewProfile(undefined)
      setOnLoading(false)

      return
    }

    const objectUrl: any = URL.createObjectURL(selectedFileProfile)
    setModalPreviewProfile(objectUrl)
    setSelectedFileProfileUrl(objectUrl)
    setOnLoading(false)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFileProfile])

  const onSelectFileProfile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFileProfile(undefined)

      return
    }
    setSelectedFileProfile(e.target.files[0])
  }

  const croppedImageProcess = async () => {
    try {
      if (selectedFileProfile) {
        const croppedImage = (await getCroppedImg(selectedFileProfileUrl, croppedAreaPixels, rotation)) as any
        fetch(croppedImage)
          .then(res => res.blob())
          .then(blob => {
            const resultBlob = new File([blob], 'banner-' + new Date().getTime() + '.png', { type: 'image/png' })
            setCroppedImage(resultBlob)
          })
      }
    } catch (e: any) {
      toast.error('Failed cropped image:', e)
    }
  }

  const uploadPhotoProfile = (data: any) => {
    setOnLoading(true)
    const json: any = new FormData()
    json.append('photo', data)
    HttpClient.post(AppConfig.baseUrl + '/user/update-photo', json).then(
      response => {
        const newPhotoUrl = response.data.photo
        props.onProfileUpdate(newPhotoUrl)
        toast.success('Photo profile upload sucessfully')
        setOnLoading(false)
        props.onCloseClick()
      },
      error => {
        toast.error('Failed upload photo ' + error?.response?.data?.message)
        setOnLoading(false)
      }
    )
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='sm' TransitionComponent={Transition}>
      <DialogContent
        sx={{
          position: 'relative',
          height: '450px'
        }}
      >
        <IconButton size='small' sx={{ position: 'absolute', right: '1rem', top: '1rem' }} onClick={props.onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Typography sx={{ color: '#32487A', fontSize: 18, fontWeight: 700 }}>Add Profile</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400 }}> Edit your Profile here</Typography>
        </Box>
        <input
          accept='image/*'
          style={{ display: 'none', height: 250, width: '100%' }}
          id='raised-button-file-banner'
          onChange={onSelectFileProfile}
          type='file'
        />
        <Card>
          <div style={{ position: 'absolute', top: 120, left: 0, right: 0, bottom: 80, backgroundColor: 'grey' }}>
            {selectedFileProfile && (
              <Cropper
                image={modalPreviewProfile ? modalPreviewProfile : '/images/avatars/headerprofile3.png'}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <Box position={'absolute'} sx={{ right: { xs: '45%', md: '48%' }, bottom: { xs: '50%', md: '40%' } }}>
            <label htmlFor='raised-button-file-banner'>
              <Icon fontSize='large' icon={'bi:camera'} color={'white'} style={{ fontSize: '36px' }} />
            </label>
          </Box>
        </Card>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            width: '50%',
            transform: 'translateX(-50%)',
            height: '40px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <input
            style={{ width: '100%' }}
            type='range'
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            onChange={e => {
              setZoom(Number(e.target.value))
            }}
            className='zoom-range'
          />
        </div>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          mb: '12px'
        }}
      >
        <Button variant='contained' size='small' sx={{ mr: 2 }} type='button' onClick={() => croppedImageProcess()}>
          <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
          {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Apply'}
        </Button>
        <Button variant='outlined' size='small' color='error' onClick={props.onCloseClick}>
          <Icon fontSize='large' icon={'material-symbols:cancel-outline'} color={'info'} style={{ fontSize: '18px' }} />
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogEditProfile
