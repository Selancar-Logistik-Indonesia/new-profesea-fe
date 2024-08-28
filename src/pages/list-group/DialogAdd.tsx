import { Ref, forwardRef, ReactElement, useState } from 'react'
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
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material/styles'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { CircularProgress, Menu, MenuItem } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import Group from 'src/contract/models/group'
import { BoxProps } from '@mui/system'

import DialogGroupAddBanner from './DialogGroupAddBanner'
import DialogGroupAddProfilePicture from './DialogGroupAddProfilePicture'

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

const BoxWrapper = styled(Box)<BoxProps>(() => ({
  position: 'relative'
}))
const ProfilePictureStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const DialogAdd = (props: DialogProps) => {
  const [onLoading, setOnLoading] = useState(false)
  const [photoProfile, setPhotoProfile] = useState('')
  const [bannerFile, setBannerFile] = useState('')

  const [previewBanner, setPreviewBanner] = useState('')
  const [previewPhotoProfile, setPreviewPhotoProfile] = useState('')

  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(null)
  const [openBannerMenu, setOpenBannerMenu] = useState<null | HTMLElement>(null)

  const [openAddModalBanner, setOpenAddModalBanner] = useState(false)
  const [openAddModalProfile, setOpenAddModalProfile] = useState(false)

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description  is required')
  })

  const {
    register,
    handleSubmit,
    formState: {}
  } = useForm<Group>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onReset = () => {
    setPreviewBanner('')
    setPreviewPhotoProfile('')
    setBannerFile('')
    setPhotoProfile('')
  }

  const onSubmit = async (formData: Group) => {
    const { title, description } = formData

    const json = {
      title: title,
      description: description,
      profilepicture: photoProfile,
      groupbanner: bannerFile
    }

    setOnLoading(true)

    try {
      console.log(json)
      const resp = await HttpClient.postFile('/group', json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong create group!'
      }

      onReset()
      props.onCloseClick()
      toast.success(` Create Group successfully!`)
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
            position: 'relative'
          }}
        >
          <IconButton
            size='small'
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            onClick={() => {
              onReset()
              props.onCloseClick()
            }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Add New Group
            </Typography>
          </Box>
        </DialogContent>
        <BoxWrapper>
          <CardMedia
            component='img'
            alt='profile-header'
            image={previewBanner ? previewBanner : '/images/avatars/headerprofile3.png'}
            sx={{
              height: { xs: 150, md: 150 },
              width: '100%',
              objectFit: 'cover',
              border: '1px solid grey'
            }}
          />
          <Box position={'absolute'} left={'46%'} bottom={'40%'} top={'30%'}>
            <label htmlFor='raised-button-file'>
              <Icon
                fontSize='large'
                icon={'bi:camera'}
                color={'white'}
                style={{ fontSize: '26px' }}
                onClick={(event: any) => setOpenBannerMenu(event.currentTarget)}
              />
            </label>
          </Box>
          <Menu
            anchorEl={openBannerMenu}
            id='banner-menu'
            open={Boolean(openBannerMenu)}
            onClose={() => setOpenBannerMenu(null)}
            MenuListProps={{
              'aria-labelledby': 'banner-picture-frame-box'
            }}
          >
            <MenuItem
              color='blue'
              onClick={() => {
                setOpenAddModalBanner(!openAddModalProfile)
                setOpenBannerMenu(null)
              }}
            >
              <Icon fontSize='large' icon={'bi:upload'} color={'blue'} style={{ fontSize: '14px' }} /> &nbsp; Update
              Banner Picture
            </MenuItem>
            {/* <MenuItem onClick={() => setOpenBannerDeleteConfirm(true)} color='red'>
                <Icon fontSize='large' icon={'bi:trash'} color={'red'} style={{ fontSize: '14px' }} />
                &nbsp; Remove Banner Picture
              </MenuItem> */}
          </Menu>
        </BoxWrapper>
        <Grid style={{ position: 'absolute', top: 190, left: '40%' }}>
          {' '}
          <BoxWrapper>
            <ProfilePictureStyled
              src={previewPhotoProfile ? previewPhotoProfile : '/images/avatars/profilepic.png'}
              alt='profile-picture'
              sx={{ width: 100, height: 100, objectFit: 'cover' }}
            ></ProfilePictureStyled>

            <Box position={'absolute'} right={'40%'} bottom={'40%'} top={'30%'}>
              <label htmlFor='raised-button-file'>
                <Icon
                  fontSize='large'
                  icon={'bi:camera'}
                  color={'white'}
                  style={{ fontSize: '26px' }}
                  onClick={(event: any) => setOpenProfileMenu(event.currentTarget)}
                />
              </label>
            </Box>
            <Menu
              anchorEl={openProfileMenu}
              id='profile-menu'
              open={Boolean(openProfileMenu)}
              onClose={() => setOpenProfileMenu(null)}
            >
              <MenuItem
                color='blue'
                onClick={() => {
                  setOpenAddModalProfile(!openAddModalProfile)
                  setOpenProfileMenu(null)
                }}
              >
                <Icon fontSize='large' icon={'bi:upload'} color={'blue'} style={{ fontSize: '14px' }} /> &nbsp; Update
                Profile Picture
              </MenuItem>
            </Menu>
          </BoxWrapper>
          {/* <span>{errors?.title?.message}</span> */}
        </Grid>
        <DialogContent
          sx={{
            position: 'relative'
          }}
        >
          <Grid container columnSpacing={'1'} rowSpacing={'4'}>
            <Grid item md={12} xs={12} style={{ marginTop: 50 }}>
              <TextField id='title' label='Title Group' variant='outlined' fullWidth {...register('title')} />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id='description'
                label='Description Group'
                variant='outlined'
                multiline
                maxRows={4}
                fullWidth
                {...register('description')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' size='small' sx={{ mr: 2 }} type='submit'>
            <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
            {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
          <Button
            variant='outlined'
            size='small'
            color='error'
            onClick={() => {
              onReset()
              props.onCloseClick()
            }}
          >
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
      <DialogGroupAddProfilePicture
        visible={openAddModalProfile}
        onCloseClick={() => setOpenAddModalProfile(!openAddModalProfile)}
        previewProfile={previewPhotoProfile}
        setPreviewPhotoProfile={setPreviewPhotoProfile}
        setPhotoProfile={setPhotoProfile}
      />
      <DialogGroupAddBanner
        visible={openAddModalBanner}
        onCloseClick={() => setOpenAddModalBanner(!openAddModalBanner)}
        previewBanner={previewBanner}
        setPreviewBanner={setPreviewBanner}
        setBannerFile={setBannerFile}
      />
    </Dialog>
  )
}

export default DialogAdd
