import { Ref, forwardRef, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import toast from 'react-hot-toast'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Icon from 'src/@core/components/icon'
import { HttpClient } from 'src/services' 
import Alumni from 'src/contract/models/alumni'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { TextField } from '@mui/material'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

type DeleteDialogProps = {
  selectedItem: Alumni
  visible: boolean
  iduser: any
  url: any
  onMessage: (message: string) => void
  setIsLoading: (status: boolean) => void
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

const DialogJoin = (props: DeleteDialogProps) => {

    const [nim, setNIM] = useState('')
    const [tahun, setTahun] = useState('')
    const { onMessage, setIsLoading } = props
    const handleDelete = async () => {
        try {
            // const resp = await HttpClient.del(`/alumni/${props.selectedItem.id}`);
    
           if (props.url == '/') {
             toast.error(`Please wait until you get approval from admin`)
             
             return

           }
           const json = {
             idalumni: props.selectedItem.id,
             iduser: props.iduser,
             nim: nim,
             lulusan: tahun
           }
           setIsLoading(true)
           try {
             console.log(json)
             onMessage('ganticuk')
             const resp = await HttpClient.post(props.url, json)
             setIsLoading(false)
             if (resp.status != 200) {
               throw resp.data.message ?? 'Something went wrong create alumni!'
             }

             // toast.success(` Create Alumni successfully!`)
           } catch (error) {
             toast.error(`Opps ${getCleanErrorMessage(error)}`)
           }

            props.onCloseClick();
            // toast.success(`${props.selectedItem.title} deleted successfully!`);
            // window.location.replace('/list-alumni/')
        } catch (error) {
            console.error(error)
        }

        props.onStateChange();
    }

    return (
      <Dialog
        fullWidth
        open={props.visible}
        maxWidth='sm'
        onClose={props.onCloseClick}
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
            onClick={props.onCloseClick}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Confirm Join
            </Typography>
            {/* <Typography variant='body2'>Are you sure delete {props.selectedItem.title} ?</Typography> */}
          </Box>
          <Box>
            <TextField
              id='NIM'
              label='NIM'
              value={nim}
              variant='outlined'
              fullWidth
              onChange={e => setNIM(e.target.value)}
            />
          </Box>
          <Box sx={{mt:2}}>
            <TextField
              id='Tahun'
              label='Tahun Lulusan'
              type='number'
              value={tahun}
              variant='outlined'
              fullWidth
              onChange={e => setTahun(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button onClick={handleDelete} variant='contained' color='success' sx={{ mr: 2 }} type='button'>
            Yes
          </Button>
          <Button variant='outlined' color='secondary' onClick={props.onCloseClick}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    )
}



export default DialogJoin 
