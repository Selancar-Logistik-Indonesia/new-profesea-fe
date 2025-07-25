import { Ref, forwardRef, ReactElement, useState, useEffect, ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { useMediaQuery } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import DialogSuccess from 'src/pages/loginevent/DialogSuccess'
import DialogMessage from './DialogMessage'
import { useTheme } from '@mui/material'
import LoginCard from '../login/card'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type BlockDialog = {
  visible: boolean
  onCloseClick: VoidFunction
  isBanner?: boolean
  variant?: 'candidate' | 'training'
  defaultShowInputs?: boolean
  customHeader?: ReactNode
}

const DialogLogin = (props: BlockDialog) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))
  const isMd = useMediaQuery(theme.breakpoints.down('lg'))
  const isBanner = props?.isBanner ?? true
  const variant = props?.variant ?? 'training'
  const customHeader = props?.customHeader
  const defaultShowInputs = props?.defaultShowInputs ?? true
  //   const [openModalGoogle, setOpenModalGoogle] = useState<boolean>(false)
  const [openDialogMessage, setOpenDialogMessage] = useState<boolean>(false)
  const [openBlockModal, setOpenBlockModal] = useState(false)
  const searchParams = useSearchParams()

  const acc = searchParams.get('account')

  useEffect(() => {
    if (acc != null) {
      setOpenDialogMessage(true)
    }
  }, [acc])

  return (
    <Dialog
      fullScreen={isXs}
      fullWidth={isMd}
      open={props.visible}
      onClose={props.onCloseClick}
      TransitionComponent={Transition}
      maxWidth='md'
      //   sx={{ opacity: openModalGoogle ? '0%' : '100%' }}
    >
      <DialogContent
        sx={{
          position: 'relative'
        }}
      >
        <IconButton size='small' onClick={props.onCloseClick} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <LoginCard
          isBanner={isBanner}
          variant={variant}
          defaultShowInputs={defaultShowInputs}
          customHeader={customHeader}
        />
      </DialogContent>
      <DialogSuccess
        visible={openBlockModal}
        onCloseClick={() => {
          setOpenBlockModal(!openBlockModal)
          // window.location.replace('/home')
        }}
      />
      <DialogMessage
        visible={openDialogMessage}
        onCloseClick={() => {
          setOpenDialogMessage(!openDialogMessage)
        }}
      />
    </Dialog>
  )
}

export default DialogLogin
