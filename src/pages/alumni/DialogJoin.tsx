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
import { Autocomplete, Grid, TextField } from '@mui/material'

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
    const tahunlulusan = [
      { tahun: '2000', label: '2000' },
      { tahun: '2001', label: '2001' },
      { tahun: '2002', label: '2002' },
      { tahun: '2003', label: '2003' },
      { tahun: '2004', label: '2004' },
      { tahun: '2005', label: '2005' },
      { tahun: '2006', label: '2006' },
      { tahun: '2007', label: '2007' },
      { tahun: '2008', label: '2008' },
      { tahun: '2009', label: '2009' },
      { tahun: '2010', label: '2010' },
      { tahun: '2011', label: '2011' },
      { tahun: '2012', label: '2012' },
      { tahun: '2013', label: '2013' },
      { tahun: '2014', label: '2014' },
      { tahun: '2015', label: '2015' },
      { tahun: '2016', label: '2016' },
      { tahun: '2017', label: '2017' },
      { tahun: '2018', label: '2018' },
      { tahun: '2019', label: '2019' },
      { tahun: '2020', label: '2020' },
      { tahun: '2021', label: '2021' },
      { tahun: '2022', label: '2022' },
      { tahun: '2023', label: '2023' }
    ]
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
          <Grid item container mt={2}>
            <Grid xs={12}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={tahunlulusan}
                getOptionLabel={(option: any) => option.label}
                renderInput={params => <TextField {...params} label='Tahun Lulusan' fullWidth />}
                onChange={(event: any, newValue: any | null) =>
                  newValue?.tahun ? setTahun(newValue?.tahun) : setTahun('')
                }
              />
            </Grid>
            <Grid xs={12} mt={3}>
              <TextField
                id='NIM'
                label='NIM'
                value={nim}
                variant='outlined'
                fullWidth
                onChange={e => setNIM(e.target.value)}
              />
            </Grid>
          </Grid>
          {/* <Box sx={{ mt: 2 }}>
            <TextField
              id='Tahun'
              label='Tahun Lulusan'
              type='number'
              value={tahun}
              variant='outlined'
              fullWidth
              onChange={e => setTahun(e.target.value)}
            />
          </Box> */}
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
