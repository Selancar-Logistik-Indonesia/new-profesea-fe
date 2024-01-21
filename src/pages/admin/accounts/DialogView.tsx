import { Ref, forwardRef, ReactElement, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { Avatar, Button, DialogActions, TextField } from '@mui/material'
import  {HttpClient} from 'src/services'
import { toast } from 'react-hot-toast'
import Account from 'src/contract/models/account'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})


type ViewProps = {
    selectedItem: Account;
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
};

const DialogView = (props: ViewProps) => {
    const [docs, setDocs] = useState<any[]>([]);
    const [disabled, setDisabled] = useState(true);
    const [reason, setReason] = useState('');

    const handleApprove = async () => {
        try {
            const resp = await HttpClient.get(`/user-management/${props.selectedItem?.id}/verify`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${props.selectedItem.name} verified successfully!`);
        } catch (error) {
            console.error(error)
        }

        props.onStateChange();
    }

    const handleReject = async () => {
        try {
            const resp = await HttpClient.patch(`/user-management/${props.selectedItem?.id}/reject`, { "reason": reason });
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            props.onCloseClick();
            toast.success(`${props.selectedItem.name} rejected successfully!`);
        } catch (error) {
            console.error(error)
        }

        props.onStateChange();
    }

    const firstload = () => {
        HttpClient.get(`/user/document?user_id=${props.selectedItem.id}`).then(response => {
        if (response.status != 200) {
            throw response.data.message ?? "Something went wrong!";
        }
        setDocs(response.data.documents);
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
                <Avatar src={props.selectedItem?.photo} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center' }}>
                <Typography lineHeight={1.4} variant='body1' fontSize={16}>
                  {props.selectedItem?.name}
                </Typography>
                <Typography lineHeight={1.4} variant='caption' fontSize={12}>
                  {props.selectedItem?.email}
                </Typography>
              </Box>
            </Box>
            <Grid container columnSpacing={'1'} rowSpacing={'2'} mt={5} alignItems={'end'}>
              {docs.length != 0 &&
                docs.map(e => (
                  <>
                    {e.childs?.length <= 0 ? (
                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', width: '90%', mb: 1, justifyContent: 'center' }}
                        key={e.id}
                        ml={5}
                      >
                        <Box mr={2} mt={1}>
                          <Icon icon='mdi:book' color='#32487A' />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            justifyContent: 'center'
                          }}
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
                    ) : (
                      <>
                        <Typography> {e.document_name}</Typography>
                        {e.childs.map(
                          (item: {
                            id: React.Key | null | undefined
                            document_name: string | null | undefined
                            path: string
                          }) => (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '90%',
                                mb: 1,
                                justifyContent: 'center'
                              }}
                              key={e.id}
                              ml={5}
                            >
                              <Box mr={2} mt={1}>
                                <Icon icon='mdi:book' color='#32487A' />
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'start',
                                  justifyContent: 'center'
                                }}
                              >
                                <Typography lineHeight={1.4} variant='body1'>
                                  {item.document_name}
                                </Typography>
                              </Box>

                              <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'}>
                                <Button target='blank' href={e.path} size='small'>
                                  Open File
                                </Button>
                              </Box>
                            </Box>
                          )
                        )}
                      </>
                    )}
                  </>
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
              Verify
            </Button>

            {(disabled == true ) && (
            <Button variant='contained' color='error' onClick={() => setDisabled(false)}>
              <Icon fontSize='large' icon={'carbon:close-outline'} color={'info'} style={{ margin: 3 }} />
              Reject
            </Button>
            )}

            {(disabled == false ) && (
              <>
                <TextField  sx={{ mr: 2 }} id="reason" label="Reason" variant="outlined" fullWidth onChange={(e) => setReason(e.target.value)}/>
                <Button variant='contained' color='error' onClick={handleReject} sx={{ mr: 2 }}>
                  Submit
                </Button>
                </>
            )}
          </DialogActions>
        </form>
      </Dialog>
    )
}

export default DialogView