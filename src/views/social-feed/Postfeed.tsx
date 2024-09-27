import Box from '@mui/material/Box'
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  Fade,
  FadeProps,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { getCleanErrorMessage, getUserAvatar } from 'src/utils/helpers'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import ButtonUploadVideo from './ButtonUploadVideo'
import ButtonUploadPhoto from './ButtonUploadPhoto'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

// Dialog
import Dialog from '@mui/material/Dialog'
import { HttpClient } from 'src/services'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const Postfeed = () => {
  const { user, setUser } = useAuth()
  const { updateStatus } = useSocialFeed()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [checked, isChecked] = useState(false)
  const [isAgree, setIsAgree] = useState<boolean | undefined>(user?.is_agree_policy_post)

  const handleUpdateStatus = async () => {
    if (!isAgree) {
      setIsOpenDialog(true)

      return
    }

    setIsLoading(true)
    try {
      await updateStatus({
        content_type: 'text',
        content: content
      })

      setContent('')
    } catch (error) {
      alert(getCleanErrorMessage(error))
    }

    setIsLoading(false)
  }

  const handleOnCloseDialog = () => {
    setIsOpenDialog(!isOpenDialog)
  }

  const handleUpdatePolicyPostStatus = async () => {
    const response = await HttpClient.post('/social-feed/post-policy', { agree: true })

    if (response.status != 200) {
      throw response.data.message ?? 'Something went wrong!'
    }

    setIsOpenDialog(false)
    isChecked(false)
    setIsAgree(true)
    setUser({ ...(user as unknown as any), is_agree_policy_post: true })
  }

  return (
    <>
      <Dialog
        fullWidth
        open={isOpenDialog}
        maxWidth='sm'
        scroll='body'
        onClose={handleOnCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={handleOnCloseDialog}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Protect Your Privacy:
            </Typography>
            <Typography variant='body2'>Avoid Sharing Sensitive Information</Typography>
          </Box>

          <Stack direction={'column'} gap={2}>
            <Typography sx={{ textAlign: 'justify' }}>
              Make sure your post doesn't contain sensitive personal information such as ID numbers, passports, driver's
              licenses, home addresses, certification information, passwords, or other data that could compromise your
              security and privacy.
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              In the event of non-compliance, our platform reserves the right to remove or delete the post to ensure the
              safety of all users.
            </Typography>
            <Divider />
            <Typography sx={{ textAlign: 'justify' }}>
              Pastikan postingan Anda tidak mengandung informasi pribadi sensitif seperti nomor identitas, paspor, SIM,
              alamat rumah, informasi sertifikasi, kata sandi, atau data lain yang dapat membahayakan keamanan dan
              privasi Anda.
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              Jika terjadi pelanggaran, platform kami berhak untuk menghapus atau menghilangkan postingan tersebut demi
              menjaga keamanan semua pengguna.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={event => isChecked(event.target.checked)} />}
              label='I have read and agree to the Feeds Policy'
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'end',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button
            variant='outlined'
            color='error'
            sx={{ mr: 2, textTransform: 'capitalize' }}
            onClick={handleOnCloseDialog}
          >
            Cancel
          </Button>
          <Button
            disabled={!checked}
            variant='contained'
            color='primary'
            sx={{ mr: 2, textTransform: 'capitalize' }}
            onClick={handleUpdatePolicyPostStatus}
          >
            Agree And Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF', padding: { xs: 3, md: 5 } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box mr={3} mt={1}>
            <Avatar src={getUserAvatar(user!)} alt='profile-picture' sx={{ height: 50, width: 50 }} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              value={content}
              multiline
              fullWidth
              rows={3}
              placeholder='Start a post'
              variant='standard'
              onChange={e => setContent(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, alignItems: 'end' }}>
          <Box>
            <ButtonUploadPhoto
              triggerDialogPolicy={() => setIsOpenDialog(true)}
              isAgree={isAgree as unknown as boolean}
            />
            <ButtonUploadVideo
              triggerDialogPolicy={() => setIsOpenDialog(true)}
              isAgree={isAgree as unknown as boolean}
            />
          </Box>
          <Box flexGrow={1} textAlign='right'>
            <Button
              sx={{ width: 45 }}
              disabled={isLoading}
              onClick={handleUpdateStatus}
              size='small'
              color='primary'
              variant='contained'
            >
              {isLoading ? <CircularProgress /> : 'Post'}
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default Postfeed
