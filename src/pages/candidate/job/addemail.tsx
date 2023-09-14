import { Dialog, DialogContent, Fade, FadeProps } from '@mui/material'
import { Ref, forwardRef, ReactElement  } from 'react'
import EmailShareButton from './emailshare' 
 
type DialogProps = {
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const AddEmail = (props: DialogProps) => {
  const emailSubject = 'ini subject'
  const emailBody = 'Body cuyyy'

  return (
    <Dialog fullWidth open={props.visible} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <DialogContent>
        <div>
          <h1>Email Share Example</h1>
          <p>Click the button to share via email:</p>
          <EmailShareButton subject={emailSubject} body={emailBody} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddEmail