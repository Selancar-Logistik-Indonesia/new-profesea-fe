import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { Autocomplete, CircularProgress, Divider, useMediaQuery } from '@mui/material'
// import { useDropzone } from 'react-dropzone'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Alumni from 'src/contract/models/alumni'
import { AppConfig } from 'src/configs/api'
import SekolahType from 'src/contract/models/sekolah'
import DialogAlumniAddProfilePicture from './DialogAlumniAddProfilePicture'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

const ProfilePictureStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`
}))

const DialogAdd = (props: DialogProps) => {
  const isSmallScreen = useMediaQuery('(max-width:400px)')
  const [onLoading, setOnLoading] = useState(false)

  const [preview2, setPreview2] = useState()
  const [selectedFile2, setSelectedFile2] = useState()
  const [comboSekolah, getComboSekolah] = useState<any>([])
  const [idcomboSekolah, setComboSekolah] = useState<any>()

  const [photoProfile, setPhotoProfile] = useState('')
  const [previewPhotoProfile, setPreviewPhotoProfile] = useState('')
  const [openAddModalProfile, setOpenAddModalProfile] = useState(false)

  const onSelectFile2 = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile2(undefined)

      return
    }
    setPreview2(e.target.files[0])
    setSelectedFile2(e.target.files[0])
  }
  const schema = yup.object().shape({
    description: yup.string().required('description is required')
  })

  const {
    register,
    handleSubmit,
    formState: {}
  } = useForm<Alumni>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/sekolah?page=1&take=1000&search').then(response => {
      const code = response.data.sekolah.data
      getComboSekolah(code)
    })
  }, [])

  const onSubmit = async (formData: Alumni) => {
    const { title, description } = formData
    if (photoProfile == undefined) {
      toast.error('Isi Photo Profile')
    }
    const json = {
      title: title,
      description: description,
      profilepicture: photoProfile,
      sekolah: idcomboSekolah,
      suratpenugasan: selectedFile2
    }

    setOnLoading(true)

    try {
      const resp = await HttpClient.postFile('/alumni', json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong create alumni!'
      }

      props.onCloseClick()
      toast.success(` Create Alumni successfully!`)
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }

    setOnLoading(false)
    props.onStateChange()
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            position: 'relative',
            px: { xs: 4, md: 6 }
          }}
        >
          <IconButton
            size='small'
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            onClick={props.onCloseClick}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Add New Alumni
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item container xs={12}>
              <Grid item container xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Grid item sx={{ flexGrow: 1 }}>
                  <Box sx={{ marginLeft: '5px' }}>
                    <Typography
                      variant='body2'
                      sx={{ textAlign: 'left', color: '#262525', fontSize: '10px', mb: '5px' }}
                    >
                      <strong>Group of Alumni Logo</strong>
                    </Typography>
                    <Divider sx={{ mr: 4 }} />
                    <Typography
                      variant='body2'
                      sx={{ textAlign: 'left', color: '#262525', fontSize: '10px', mt: '5px' }}
                    >
                      Allowed JPG, GIF or PNG.
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Max size of 800K. {isSmallScreen && <br />}Aspect Ratio 1:1
                    </Typography>
                  </Box>
                </Grid>
                <Box sx={{ position: 'relative' }}>
                  <ProfilePictureStyled
                    src={previewPhotoProfile ? previewPhotoProfile : '/images/avatars/profilepic.png'}
                    alt='profile-picture'
                    sx={{ objectFit: 'cover' }}
                  />

                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center'
                    }}
                    onClick={() => setOpenAddModalProfile(!openAddModalProfile)}
                  >
                    <label htmlFor='raised-button-file'>
                      <Icon fontSize='large' icon={'bi:camera'} color={'white'} style={{ fontSize: '26px' }} />
                    </label>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item container xs={12} sx={{ mb: 2, gap: 2 }}>
              <TextField
                id='description'
                label='Group Name of Alumni'
                variant='filled'
                multiline
                maxRows={4}
                fullWidth
                {...register('description')}
              />
              <Autocomplete
                fullWidth
                disablePortal
                id='combo-box-demo'
                options={comboSekolah}
                getOptionLabel={(option: any) => option.sekolah}
                renderInput={params => <TextField {...params} label='Institution Name *' variant='filled' />}
                onChange={(event: any, newValue: SekolahType | null) =>
                  newValue?.id ? setComboSekolah(newValue.id) : setComboSekolah(null)
                }
              />
            </Grid>
            <Grid item xs={12} container sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid item sx={{ flexGrow: 1 }}>
                <Box sx={{ marginLeft: '5px' }}>
                  <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px', mb: '5px' }}>
                    <strong>Letter of Assignment</strong>
                  </Typography>
                  <Divider sx={{ mr: 4 }} />
                  <Typography variant='body2' sx={{ textAlign: 'left', color: 'red', fontSize: '10px', mt: '5px' }}>
                    <strong>Optional</strong>
                  </Typography>
                  <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                    Allowed PDF. Max size of 800K.
                  </Typography>
                </Box>
              </Grid>
              <Box sx={{ position: 'relative' }}>
                <ProfilePictureStyled
                  src={preview2 ? preview2 : '/images/avatars/profilepic.png'}
                  alt='profile-picture'
                  sx={{ width: 50, height: 50, objectFit: 'cover' }}
                />
                <input
                  accept='application/pdf'
                  style={{ display: 'none', width: '100%', aspectRatio: 1 }}
                  id='raised-button-file-2'
                  onChange={onSelectFile2}
                  type='file'
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                  }}
                >
                  <label htmlFor='raised-button-file-2'>
                    <Icon fontSize='large' icon={'bi:filetype-pdf'} color={'white'} style={{ fontSize: '26px' }} />
                  </label>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            pb: 6
          }}
        >
          <Button variant='contained' size='small' type='submit'>
            <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
            {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
          <Button variant='outlined' size='small' color='error' onClick={props.onCloseClick}>
            <Icon
              fontSize='large'
              icon={'material-symbols:cancel-outline'}
              color={'info'}
              style={{ fontSize: '18px' }}
            />
            Cancel
          </Button>
        </DialogActions>
      </form>
      <DialogAlumniAddProfilePicture
        previewProfile={previewPhotoProfile}
        setPreviewPhotoProfile={setPreviewPhotoProfile}
        setPhotoProfile={setPhotoProfile}
        visible={openAddModalProfile}
        onCloseClick={() => setOpenAddModalProfile(!openAddModalProfile)}
      />
    </Dialog>
  )
}

export default DialogAdd
