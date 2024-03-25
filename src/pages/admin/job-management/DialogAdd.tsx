import { Ref, forwardRef, ReactElement, useState } from 'react'

import Dialog from '@mui/material/Dialog'

import Fade, { FadeProps } from '@mui/material/Fade'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import FormAddSeafarer from './form/FormAddSeafarer'
import FormAddNonSeafarer from './form/FormAddNonSeafarer'

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

const DialogAdd = (props: DialogProps) => {
  const [alignment, setAlignment] = useState('seafarer')

  const handleChangeToggle = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='md' scroll='body' TransitionComponent={Transition}>
      {alignment === 'seafarer' ? (
        <FormAddSeafarer dialogProps={props} alignment={alignment} handleChangeToggle={handleChangeToggle} />
      ) : (
        <FormAddNonSeafarer dialogProps={props} alignment={alignment} handleChangeToggle={handleChangeToggle} />
      )}
    </Dialog>
  )
}

export default DialogAdd
