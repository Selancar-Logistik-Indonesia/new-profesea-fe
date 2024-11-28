import { Ref, forwardRef, ReactElement } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type BlockDialog = {
  visible: boolean
  onCloseClick: VoidFunction
}

const DialogGoogleLogin = (props: BlockDialog) => {
  const { t } = useTranslation()

  return (
    <Dialog fullWidth open={props.visible} maxWidth='sm' onClose={props.onCloseClick} TransitionComponent={Transition}>
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton size='small' onClick={props.onCloseClick} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h6' color={'#32487A'} fontWeight='600'>
            {t('register_text_3_G')} Google
          </Typography>
          <Typography variant='body2'>{t('register_text_1_1')}</Typography>
          <Typography variant='body2'>{t('register_text_1_2')}</Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Grid container spacing={2} direction='column' justifyContent='center' alignItems='center'>
          <Grid item>
            <Link href={`https://apifix.profesea.id/auth/google`} passHref legacyBehavior>
              <Button
                variant='contained'
                fullWidth
                sx={{ mb: 2, color: 'white' }}
                style={{ textTransform: 'none', width: '300px' }}
                startIcon={<Icon icon={'solar:user-hands-bold-duotone'} />}
              >
                {t('register_text_4_1')}
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`https://apifix.profesea.id/auth/google`} passHref legacyBehavior>
              <Button
                variant='contained'
                fullWidth
                sx={{ mb: 2, color: 'white' }}
                style={{ textTransform: 'none', width: '300px' }}
                startIcon={<Icon icon={'solar:user-hands-bold-duotone'} />}
              >
                {t('register_text_4_2')}
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`https://apifix.profesea.id/auth/google`} passHref legacyBehavior>
              <Button
                variant='contained'
                fullWidth
                sx={{ mb: 2, color: 'white' }}
                style={{ textTransform: 'none', width: '300px' }}
                startIcon={<Icon icon={'solar:buildings-3-bold-duotone'} />}
              >
                {t('register_text_5')}
              </Button>
            </Link>
          </Grid>
          {/* <Grid item>
            <Link href={`https://apifix.profesea.id/auth/google`} passHref legacyBehavior>
              <Button
                variant='contained'
                fullWidth
                sx={{ mb: 2, color: 'white' }}
                style={{ textTransform: 'none', width: '300px' }}
                startIcon={<Icon icon={'solar:user-hand-up-bold-duotone'} />}
              >
                {t('register_text_6')}
              </Button>
            </Link>
          </Grid> */}
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default DialogGoogleLogin
