import { Ref, forwardRef, ReactElement, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import Applicant from 'src/contract/models/applicant'
import { Avatar, Button, DialogActions } from '@mui/material'
import  {HttpClient} from 'src/services'
import { toast } from 'react-hot-toast'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})


type ViewProps = {
    selectedItem: Applicant;
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
};

const DialogView = (props: ViewProps) => {
    const [license, setLicense] = useState<any[]>([]);
    const handleApprove = async () => {
        try {
            const resp = await HttpClient.patch(`/job/appllicant/approve`, { "applicant_id": props.selectedItem?.id });
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${props.selectedItem.user.name} recomended successfully!`);
        } catch (error) {
            console.error(error)
        }

        props.onStateChange();
    }

    const handleSaved = async () => {
        try {
            const resp = await HttpClient.post(`/directory/save`, { "dirable_id": props.selectedItem?.user_id, "dirable_type": "user" });
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${props.selectedItem.user.name} saved successfully!`);
        } catch (error) {
            console.error(error)
        }

        props.onStateChange();
    }

    const handleReject = async () => {
        try {
            const resp = await HttpClient.patch(`/job/appllicant/reject`, { "applicant_id": props.selectedItem?.id });
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${props.selectedItem.user.name} rejected successfully!`);
        } catch (error) {
            console.error(error)
        }

        props.onStateChange();
    }

    const firstload = () => {
        HttpClient.get(`/user/document?user_id=${props.selectedItem.user.id}`).then(response => {
        if (response.status != 200) {
            throw response.data.message ?? "Something went wrong!";
        }
        setLicense(response.data.documents);
        })
    }
  
    useEffect(() => {
        firstload()
      }, [])
    
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
                <Avatar src={props.selectedItem?.user.photo} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                <Typography lineHeight={1.4} variant='body1' fontSize={16}>
                  {props.selectedItem?.user.name}
                </Typography>
                <Typography lineHeight={1.4} variant='caption' fontSize={12}>
                  {props.selectedItem?.user.email}
                </Typography>
              </Box>
              <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'} mt={1}>
                <Button target='blank' href={'/profile/?username=' + props.selectedItem?.user.username} size='small'>
                  Open Profile
                </Button>
              </Box>
            </Box>
            <Grid container columnSpacing={'1'} rowSpacing={'2'} mt={5} alignItems={'end'}>
              {license.length != 0 &&
                license.map(e => (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', width: '90%', mb: 1, justifyContent: 'center' }}
                    key={e.id}
                    ml={5}
                  >
                    <Box mr={2} mt={1}>
                      <Icon icon='mdi:book' color='#32487A' />
                    </Box>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}
                    >
                      <Typography lineHeight={1.4} variant='body1'>
                        {e.document_name}
                      </Typography>
                    </Box>

                    <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
                      <Button target='blank' href={e.path} size='small'>
                        Open File
                      </Button>
                    </Box>
                  </Box>
                ))}
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
              Recomend
            </Button>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleSaved}>
              <Icon fontSize='large' icon={'teenyicons:save-outline'} color={'info'} style={{ margin: 3 }} />
              Save
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