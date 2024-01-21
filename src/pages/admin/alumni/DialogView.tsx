import { Ref, forwardRef, ReactElement  } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { Avatar, Button, DialogActions} from '@mui/material'
import  {HttpClient} from 'src/services'
import { toast } from 'react-hot-toast'
 import Alumni from 'src/contract/models/alumni'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})


type ViewProps = {
    selectedItem: Alumni;
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
};

const DialogView = (props: ViewProps) => {
    // const [docs, setDocs] = useState<any[]>([]);
    // const [disabled, setDisabled] = useState(true);
    // const [reason, setReason] = useState('');

    const handleApprove = async () => {
        try {
            const resp = await HttpClient.get(`/alumni/${props.selectedItem?.id}/verify`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${props.selectedItem.description} verified successfully!`);
        } catch (error) {
            console.error(error)
        }

        props.onStateChange();
    }

    const handleReject = async () => {
        try {
          // const resp = await HttpClient.patch(`/alumni/${props.selectedItem?.id}/reject`, { "reason": reason });
          const resp = await HttpClient.patch(`/alumni/${props.selectedItem?.id}/reject`, { "reason": '-' });
          if (resp.status != 200) {
            throw resp.data.message ?? 'Something went wrong!'
          }

          props.onCloseClick()
          toast.success(`${props.selectedItem.description} rejected successfully!`)
        } catch (error) {
            console.error(error)
        }

        props.onStateChange();
    }

    // const firstload = () => {
    //     HttpClient.get(`/user/document?user_id=${props.selectedItem.id}`).then(response => {
    //     if (response.status != 200) {
    //         throw response.data.message ?? "Something went wrong!";
    //     }
    //     setDocs(response.data.documents);
    //     })
    // }
  
    // useEffect(() => {
    //     firstload()
    //   }, [])
    
    return (
      <Dialog
        fullWidth
        open={props.visible}
        maxWidth='sm'
        scroll='body'
        onClose={props.onCloseClick}
        TransitionComponent={Transition}
      >
        <form noValidate>
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
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 3 }}>
              <Box mr={2}>
                <Avatar src={props.selectedItem?.profilepicture} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                <Typography lineHeight={1.4} variant='body1' fontSize={16}>
                  {props.selectedItem?.description}
                </Typography>
                {/* <Typography lineHeight={1.4} variant='caption' fontSize={12}>
                  {props.selectedItem?.description}
                </Typography> */}
              </Box>
            </Box>
            <Grid container columnSpacing={'1'} rowSpacing={'2'} mt={5} alignItems={'end'}>
              <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', mb: 1, justifyContent: 'center' }} ml={5}>
                <Box mr={3}>
                  <Icon fontSize='large' icon={'vscode-icons:file-type-pdf2'} style={{ fontSize: '36px' }} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center'
                  }}
                >
                  <Typography>{props.selectedItem?.description}</Typography>
                  {/* <Avatar src={props.selectedItem?.suratpenugasan} /> */}
                </Box>

                {/* <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
                  <Button target='blank' href={props.selectedItem?.suratpenugasan} size='small'>
                    Change File
                  </Button>
                </Box> */}
                <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
                  <Button target='blank' href={props.selectedItem?.suratpenugasan} size='small'>
                    Open File
                  </Button>
                </Box>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='contained' color='success' sx={{ mr: 2 }} onClick={handleApprove}>
              <Icon fontSize='large' icon={'material-symbols:recommend'} color={'info'} style={{ margin: 3 }} />
              Verify
            </Button>

            <Button variant='contained' color='error' onClick={handleReject}>
              <Icon fontSize='large' icon={'carbon:close-outline'} color={'info'} style={{ margin: 3 }} />
              Reject
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
}

export default DialogView