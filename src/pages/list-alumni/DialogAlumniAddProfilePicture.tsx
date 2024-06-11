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

import Fade, { FadeProps } from '@mui/material/Fade'
import Icon from 'src/@core/components/icon'

import getCroppedImg from 'src/utils/cropImage'

interface IProps {
  visible: boolean
  previewProfile: any
  onCloseClick: VoidFunction
  setPreviewPhotoProfile: any
  setPhotoProfile: any
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogAlumniAddProfilePicture = (props: IProps) => {
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
      props.setPhotoProfile(croppedImage)
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

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFileProfile])

  const onSelectFileProfile = (e: any) => {
    // alert('onSelectFileProfile')
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFileProfile(undefined)

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFileProfile(e.target.files[0])
    //const selectedFiles = e.target.files as FileList

    // setCurrentImage(selectedFiles?.[0])
    //uploadPhotoProfile(selectedFiles?.[0])
  }

  const croppedImageProcess = async () => {
    try {
      if (selectedFileProfile) {
        const croppedImage = (await getCroppedImg(selectedFileProfileUrl, croppedAreaPixels, rotation)) as any
        fetch(croppedImage)
          .then(res => res.blob())
          .then(blob => {
            const resultBlob = new File([blob], 'banner-' + new Date().getTime() + '.png', { type: 'image/png' })
            const objectUrl: any = URL.createObjectURL(resultBlob)
            setCroppedImage(resultBlob)
            props.setPreviewPhotoProfile(objectUrl)
            props.onCloseClick()
          })
      }
    } catch (e: any) {
      console.error(' error => ', e)
    }
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='md' scroll='body' TransitionComponent={Transition}>
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          height: '450px'
        }}
      >
        <IconButton size='small' sx={{ position: 'absolute', right: '1rem', top: '1rem' }} onClick={props.onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
            Add Profile
          </Typography>
          <Typography variant='body2'> Add your Profile here</Typography>
        </Box>
        <input
          accept='image/*'
          style={{ display: 'none', height: 250, width: '100%' }}
          id='raised-button-file-banner'
          onChange={onSelectFileProfile}
          type='file'
        ></input>

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

          Box position={'absolute'} sx={{ right: { xs: '45%', md: '48%' }, bottom: { xs: '50%', md: '40%' } }}>
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
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
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

export default DialogAlumniAddProfilePicture
