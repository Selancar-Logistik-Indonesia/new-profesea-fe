import { Ref, forwardRef, ReactElement, useState, useEffect, useRef } from 'react'
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
import { Autocomplete, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import DatePicker from 'react-datepicker'
import { DateType } from 'src/contract/models/DatepickerTypes'
import Spacing from 'src/@core/theme/spacing'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  visible: boolean;
  onCloseClick: VoidFunction;
  onStateChange: VoidFunction;
  arrayhead: any
  role: any
}
type IDocument = {
  title: string
  docType: string
  role: string
}

type FormData = {
  nameOtherDocument: string
  user_document: string
}

const DialogAddDocument = (props: DialogProps) => {
  const [onLoading, setOnLoading] = useState(false);
  const [preview, setPreview] = useState()
  const [selectedFile, setSelectedFile] = useState();
  const [document_name, setDocument] = useState<any>([]);
  const [isCrewing, setIsCrewing] = useState(true);

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
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  const onSubmit = async (item: FormData) => {
    setOnLoading(true);
    await saveparent(item);
    setOnLoading(false);
    props.onStateChange();
  }

  const saveparent = async (item: FormData) => {
    const json = {
      user_document: selectedFile,
      document_name: document_name.title,
      document_type: document_name.docType,
      document_number: null
    }

    console.log(json);

    // setOnLoading(true)
    // try {
    //   const resp = await HttpClient.postFile('/user/document', json)
    //   if (resp.status != 200) {
    //     throw resp.data.message ?? 'Something went wrong!'
    //   }
    // 
    //   props.onCloseClick()
    //   toast.success(` Document submited successfully!`)
    // } catch (error) {
    //   toast.error(`Opps ${getCleanErrorMessage(error)}`)
    // }

    // setOnLoading(true)
  }

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const documents: IDocument[] = [
    { title: 'NIB', docType: 'M1', role: 'Company' },
    { title: 'Menkumham', docType: 'M2', role: 'Company' },
    { title: 'SIUPAKK', docType: 'M3', role: 'Company' },
    { title: 'KTP', docType: 'M4', role: 'Trainer' },
    { title: 'Certificate', docType: 'M5', role: 'Trainer' },
  ];

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
            <Typography variant='body2'>Fulfill your Document Info here</Typography>
          </Box>

          {documents.filter(e => e.role == props.role).map((item) => {
            if (item.docType == 'M3') {
              return <>
                <Box sx={{ mt: 4, mb: 2 }}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Are you a Crewing company</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="yes"
                      name="radio-buttons-group"
                      onChange={e => setIsCrewing(e.target.value == "yes")}
                    >
                      <FormControlLabel value="yes" control={<Radio sx={{ p: 1, ml: 1 }} />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio sx={{ p: 1, ml: 1 }} />} label="no" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                {isCrewing && (<DocumentTile item={item} />)}
              </>;
            }

            return <DocumentTile item={item} />;
          })}

          {/* 
          <Grid container columnSpacing={'1'} rowSpacing={'2'}>
            <Grid item md={12} xs={12}>
              <Autocomplete
                disablePortal
                id='dokumen'
                options={dokumens.filter(e => e.role == props.role)}
                getOptionLabel={option => option.title || ''}
                renderInput={params => <TextField {...params} label='Document' sx={{ mb: 2 }} variant='standard' />}
                onChange={(e, newValue: any) => (newValue ? setDocument(newValue) : setDocument([]))}
              />
            </Grid>
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
                      <strong>Click to upload Document File.</strong>
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Allowed PDF.
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Max size of 800K.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          */}

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

const DocumentTile = (props: { item: IDocument }) => {
  const { item } = props;

  return (
    <Box sx={{ borderBottom: 1, borderColor: '#9e9e9e', paddingBottom: 2, paddingTop: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography sx={{ display: 'flex', flexGrow: 1 }}>{item.title}</Typography>
        <IconButton sx={{ padding: 0 }}>
          <Icon icon='mdi:add-circle' fontSize={32} color='#546e7a' />
        </IconButton>
      </Box>
    </Box>
  );
}

export default DialogAddDocument
