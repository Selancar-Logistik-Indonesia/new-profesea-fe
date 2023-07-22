import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
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
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { CircularProgress } from '@mui/material'  
// import { Autocomplete } from '@mui/material' 

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

type DialogProps = {
  selectedItem: any
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

 
 type FormData = {
   document_name: string 
   user_document: string 
 }


const DialogEditDocument = (props: DialogProps) => {
    const [onLoading, setOnLoading] = useState(false); 
     const [preview, setPreview] = useState()
     const [selectedFile, setSelectedFile] = useState()
     
    // const [document_name, setDocument] = useState<any>(0)
     useEffect(() => {
        debugger
      if (!selectedFile) {
          setPreview(props.selectedItem?.path)

          return
      } 
    
      const objectUrl: any = URL.createObjectURL(selectedFile)
      setPreview(objectUrl) 

      return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    
    // const schema = yup.object().shape({
    //     user_id: yup.string().required()
    // })

    const { 
        register,
        // formState: { errors }, 
        handleSubmit,
    } = useForm<FormData>({
        mode: 'onBlur',
        // resolver: yupResolver(schema)
    }) 
    

    const onSubmit = async (item:FormData) => { 
      const {document_name} = item
      const json = {
        user_document: selectedFile,
        document_name: document_name,
        document_number: 123, 
        
      }
       
      setOnLoading(true)

      try {
        console.log(json)
        const resp = await HttpClient.postFile('/user/document/'+props.selectedItem.id, json)
        if (resp.status != 200) {
          throw resp.data.message ?? 'Something went wrong!'
        }

        props.onCloseClick()
        toast.success(` Document submited successfully!`)
      } catch (error) {
        toast.error(`Opps ${getCleanErrorMessage(error)}`)
      }

      setOnLoading(false)
      props.onStateChange()
    }
    const onSelectFile = (e: any) => {
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)

        return
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0]) 
    }
  

    return (
      <Dialog fullWidth open={props.visible} maxWidth='xs' scroll='body' TransitionComponent={Transition}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
              onClick={props.onCloseClick}
            >
              <Icon icon='mdi:close' />
            </IconButton>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                Add New Upload Document
              </Typography>
              <Typography variant='body2'>Add New Upload Document info details</Typography>
            </Box>

            <Grid container columnSpacing={'1'} rowSpacing={'2'}>
              <TextField
                id='document_name'
                label='Document Name'
                variant='outlined'
                fullWidth
                defaultValue={props.selectedItem?.document_name}
                {...register('document_name')}
              />
              <Grid item md={12} xs={12}>
                <Grid item xs={12} md={12} container justifyContent={'center'}>
                  <Grid xs={6}>
                    <label htmlFor='x'>
                      <img
                        alt='logo'
                        src={preview ? preview : '/images/avatar.png'}
                        style={{
                          maxWidth: '100%',
                          height: '120px',
                          padding: 0,
                          margin: 0
                        }}
                      />
                    </label>
                    <input
                      accept='image/*'
                      style={{ display: 'none' }}
                      id='x'
                      onChange={onSelectFile}
                      type='file'
                    ></input>
                  </Grid>
                  <Grid xs={6}>
                    <Box sx={{ marginTop: '20px' }}>
                      <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
                        Click Photo to change institution Logo.
                      </Typography>
                      <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
                        Allowed JPG, GIF or PNG.
                      </Typography>
                      <Typography variant='body2' sx={{ textAlign: 'left', color: '#424242', fontSize: '10px' }}>
                        Max size of 800K. Aspect Ratio 1:1
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
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
              {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Submit'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={props.onCloseClick}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
}

export default DialogEditDocument
