import { Ref, forwardRef, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { CircularProgress } from '@mui/material'
// import User from 'src/contract/models/company'
import { useDropzone } from 'react-dropzone'

import Link from 'next/link'

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

interface FileProp {
  name: string
  type: string
  size: number
}

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

const DialogImport = (props: DialogProps) => {
  const [onLoading, setOnLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  // const [User, getUser] =useState<any[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'data/*': ['.xls', '.xlsx', '.ods']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const img = files.map((file: FileProp) => (
    <img
      key={file.name}
      alt={file.name}
      className='single-file-image'
      src={URL.createObjectURL(file as any)}
      width={450}
    />
  ))

  const { handleSubmit } = useForm<any>({
    mode: 'onBlur'
  })

  const onSubmit = async () => {
    const json = {
      file: files[0]
    }

    setOnLoading(true)

    try {
      const resp = await HttpClient.postFile('/user-management/import', json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      props.onCloseClick()
      toast.success(`Users imported successfully!`)
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }

    setOnLoading(false)
    props.onStateChange()
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
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
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Import New Accounts
            </Typography>
            <Typography variant='body2'>
              Download Template Import Account{' '}
              <Button
                variant='outlined'
                color='info'
                size='small'
                sx={{ mr: 2 }}
                href='/templates/import_users_template.xlsx'
                target='_blank'
              >
                Here
              </Button>
            </Typography>
          </Box>

          <Grid container columnSpacing={'1'} rowSpacing={'4'}>
            <Grid item md={12} xs={12}>
              <Box {...getRootProps({ className: 'dropzone' })} sx={{ p: 2, border: '1px dashed' }}>
                <input {...getInputProps()} />
                {files.length ? (
                  img
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    <Img width={200} alt='Upload img' src='/images/upload.png' />
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                      <Typography
                        variant='h5'
                        color='textSecondary'
                        sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}
                      >
                        Click{' '}
                        <Link href='/' onClick={e => e.preventDefault()}>
                          browse / image
                        </Link>{' '}
                        to upload account
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
              <Typography sx={{ mt: 1, color: 'primary.main', fontSize: 12 }}>
                Allowed JPEG, JPG, PNG Size up to 3 Mb.
              </Typography>
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
          <Button variant='contained' size='small' sx={{ mr: 2 }} type='submit'>
            <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
            {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Submit'}
          </Button>
          <Button variant='outlined' size='small' color='error' onClick={props.onCloseClick}>
            <Icon
              fontSize='large'
              icon={'material-symbols:cancel-outline'}
              color={'info'}
              style={{ fontSize: '18px' }}
            />
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogImport
