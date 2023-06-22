// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import toast from 'react-hot-toast'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api' 

// ** Hooks
import useBgColor from 'src/@core/hooks/useBgColor'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface FormData {
  name: string
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})
const DialogAdd = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  // ** Hooks
  const bgColors = useBgColor()

  const { handleSubmit, register, formState: { errors } }  = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  })

  /* HandleOnSubmit */
  const onSubmit = async (json:FormData) => {
    try {
      HttpClient.post(AppConfig.baseUrl+ '/job-category', json).then(({ data }) => {
        setShow(false);
        console.log(data)
        toast.success(data.category.name+' Successfully submited!');
        location.reload();
        
         }, error => {
          setShow(false); 
          toast.error("Opps "+error.response.data.message);
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
        <Button variant='contained' onClick={() => setShow(true)}>
          Add
        </Button>
      <Dialog
        fullWidth
        open={show}
        maxWidth='sm'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  >
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
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Add New Job Categories
            </Typography>
            <Typography variant='body2'>Add Job Categories</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
              <TextField label='Category Name' placeholder='Category Name' fullWidth sx={{ mb: 6 }} {...register("name")} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} type='submit'>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}



export default DialogAdd
