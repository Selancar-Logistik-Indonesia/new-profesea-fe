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
import { Autocomplete } from '@mui/material'

import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import moment from 'moment'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type FormData = {
  title: string
  major: string
  degree: string
  start_date: string
  end_date: string
  institution: string
  startdate: string
  enddate: string
}
type DialogProps = {
  selectedItem: any
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

const DialogEditEducation = (props: DialogProps) => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [onLoading, setOnLoading] = useState(false)
  const [dateAwal, setDateAwal] = useState<any>(new Date(props.selectedItem?.start_date) || null)
  const [dateAkhir, setDateAkhir] = useState<any>(new Date(props.selectedItem?.end_date) || null)
  const [preview, setPreview] = useState(props.selectedItem?.logo)
  const [Education, getEducation] = useState<any[]>([])
  const [selectedFile, setSelectedFile] = useState()
  const [EduId, setEduId] = useState('---')

  const combobox = async () => {
    let response
    let data

    response = await HttpClient.get(`/public/data/degree`)
    if (response.status !== 200) {
      throw new Error(response.data.message ?? 'Something went wrong!')
    }
    data = response.data.degrees.map((item: any) => ({
      name: item.name
    }))

    if (user.employee_type === 'onship') {
      response = await HttpClient.get(AppConfig.baseUrl + '/licensi/all/')
      if (response.status !== 200) {
        throw new Error(response.data.message ?? 'Something went wrong!')
      }
      data = data.concat(
        response.data.licensiescoc.map((item: any) => ({
          name: item.title
        }))
      )
    }
    getEducation(data)
  }

  useEffect(() => {
    setPreview(props.selectedItem?.logo)
    combobox()
  }, [])
  useEffect(() => {
    if (!selectedFile) {
      setPreview(props.selectedItem?.logo)

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
    handleSubmit
  } = useForm<FormData>({
    mode: 'onBlur'
    // resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const { title, major } = data

    const json = {
      title: title,
      major: major,
      degree: EduId,
      logo: selectedFile,
      still_here: 0,
      start_date: moment(dateAwal).format('YYYY-MM-DD') || null,
      end_date: moment(dateAkhir).format('YYYY-MM-DD') || null
    }
    setOnLoading(true)

    try {
      console.log(json)
      const resp = await HttpClient.postFile('/user/education/' + props.selectedItem.id, json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      props.onCloseClick()
      toast.success(` Education submited successfully!`)
    } catch (error) {
      alert(`Opps ${getCleanErrorMessage(error)}`)
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
    <Dialog
      fullWidth
      open={props.visible}
      maxWidth='sm'
      scroll='body'
      onClose={props.onCloseClick}
      TransitionComponent={Transition}
    >
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            position: 'relative',
            pb: (theme: { spacing: (arg0: number) => any }) => `${theme.spacing(8)} !important`,
            px: (theme: { spacing: (arg0: number) => any }) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`
            ],
            pt: (theme: { spacing: (arg0: number) => any }) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`
            ]
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
              Edit Education
            </Typography>
            <Typography variant='body2'>Enhance your profile by adding your education</Typography>
          </Box>

          <Grid container rowSpacing={'4'}>
            <Grid item md={12} xs={12}>
              <TextField
                id='institution'
                label='Institution Name'
                variant='standard'
                fullWidth
                {...register('title')}
                defaultValue={props.selectedItem?.title}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={Education.map(e => e.name)}
                defaultValue={props.selectedItem?.degree}
                {...register('degree')}
                getOptionLabel={(option: string) => option}
                renderInput={params => <TextField {...params} label='Education' variant='standard' />}
                onChange={(event: any, newValue: string | null) => (newValue ? setEduId(newValue) : setEduId('---'))}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                id='major'
                label='Major'
                variant='standard'
                fullWidth
                {...register('major')}
                defaultValue={props.selectedItem?.major}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={'Start Date'}
                  views={['month', 'year']}
                  onChange={(date: any) => setDateAwal(date)}
                  value={dateAwal ? moment(dateAwal) : null}
                  slotProps={{
                    textField: { variant: 'standard', fullWidth: true, id: 'basic-input', ...register('startdate') }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={'End Date'}
                  views={['month', 'year']}
                  onChange={(date: any) => setDateAkhir(date)}
                  value={dateAkhir ? moment(dateAkhir) : null}
                  slotProps={{
                    textField: { variant: 'standard', fullWidth: true, id: 'basic-input', ...register('enddate') }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid item xs={6} md={8} container justifyContent={'left'}>
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
                  <input accept='image/*' style={{ display: 'none' }} id='x' onChange={onSelectFile} type='file' />
                </Grid>
                <Grid xs={6}>
                  <Box sx={{ marginTop: '20px', marginLeft: '5px' }}>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      <strong>Click Image to change Institution Logo.</strong>
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Allowed JPG, GIF or PNG.
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
            px: (theme: { spacing: (arg0: number) => any }) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(15)} !important`
            ],
            pb: (theme: { spacing: (arg0: number) => any }) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`
            ]
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

export default DialogEditEducation
