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

import DatePicker from 'react-datepicker'
import { DateType } from 'src/contract/models/DatepickerTypes'

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

type FormData = {
  user_document: string
  document_name: string
  organization: string
  document_number: string
}

const DialogAddDocument = (props: DialogProps) => {
  const [onLoading, setOnLoading] = useState(false)
  const [preview, setPreview] = useState()
  const [selectedFile, setSelectedFile] = useState()

  const [issueDate, setIssueDate] = useState<DateType>(new Date())
  const [expiredDate, setExpiredDate] = useState<DateType>(new Date())

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)

      return
    }
    const objectUrl: any = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const {
    register,
    // formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    mode: 'onBlur'
    // resolver: yupResolver(schema)
  })

  const onSubmit = async (item: FormData) => {
    setOnLoading(true)
    saveparent(item)
    props.onStateChange()
    setOnLoading(false)
  }
  const saveparent = async (item: FormData) => {
    const json = {
      user_document: selectedFile,
      document_type: 'Other Document',
      document_name: item.document_name,
      document_number: item.document_number,
      issue_at: issueDate,
      expired_at: expiredDate,
      organization: item.organization
    }
    setOnLoading(true)

    try {
      const resp = await HttpClient.postFile('/user/document', json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }
      props.onCloseClick()
      toast.success(` Document submited successfully!`)
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
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
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            height: '450px'
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
              Add New Document
            </Typography>
            <Typography variant='body2'> Fulfill your Document Info here</Typography>
          </Box>

          <Grid container columnSpacing={'1'} rowSpacing={'2'}>
            <TextField
              id='document_name'
              label='Document Name'
              variant='standard'
              fullWidth
              {...register('document_name')}
            />
            <TextField
              id='organization'
              label='Organization'
              variant='standard'
              fullWidth
              {...register('organization')}
            />
            <Grid item md={12} xs={12}>
              <DatePicker
                dateFormat='dd/MM/yyyy'
                selected={issueDate}
                id='basic-input'
                onChange={(dateAwal: Date) => setIssueDate(dateAwal)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                customInput={<TextField label='Issue Date' variant='standard' fullWidth />}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <DatePicker
                dateFormat='dd/MM/yyyy'
                selected={expiredDate}
                id='basic-input'
                onChange={(dateAwal: Date) => setExpiredDate(dateAwal)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                customInput={<TextField label='Expired Date' variant='standard' fullWidth />}
              />
            </Grid>
            <TextField
              id='document_number'
              label='Credentials ID'
              variant='standard'
              fullWidth
              {...register('document_number')}
            />
            <Grid item md={12} xs={12} mt={2}>
              <Grid item xs={12} md={12} container justifyContent={'left'}>
                <Grid xs={6}>
                  <label htmlFor='x'>
                    <img
                      alt='logo'
                      src={preview ? preview : '/images/uploadimage.jpeg'}
                      style={{
                        maxWidth: '100%',
                        height: '120px',
                        padding: 0,
                        margin: 0
                      }}
                    />
                  </label>
                  <input
                    accept='application/pdf,,image/*'
                    style={{ display: 'none' }}
                    id='x'
                    onChange={onSelectFile}
                    type='file'
                  ></input>
                </Grid>
                <Grid xs={6}>
                  <Box sx={{ marginTop: '20px', marginLeft: '5px' }}>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      <strong>Click to change Document File.</strong>
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Allowed PDF.
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
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

export default DialogAddDocument
