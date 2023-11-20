import { Ref, forwardRef, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage, toMegaByte } from 'src/utils/helpers'
import { CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'


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

type ISelectedFile = {
  document: IDocument,
  file: File,
};

type FormData = {
  nameOtherDocument: string
  user_document: string
}

const DialogAddDocument = (props: DialogProps) => {
  const [onLoading, setOnLoading] = useState(false);
  const [isCrewing, setIsCrewing] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[]>([]);

  const {
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const handleChangeCrewing = (status: boolean) => {
    if (!status) {
      setSelectedFiles(e => {
        const items = e.filter(i => i.document.docType != 'M3');
        return items;
      });
    }

    return setIsCrewing(status);
  }

  const handleSelectedFile = (file: File, document: IDocument) => {
    setSelectedFiles(prevState => {
      const items = prevState;
      const newItems = items.filter(e => e.document.docType != document.docType);
      newItems.push({
        document: document,
        file: file,
      });

      return newItems;
    });
  }

  const onSubmit = async (item: FormData) => {
    setOnLoading(true);
    await saveparent(item);
    setOnLoading(false);
    props.onStateChange();
  }

  const saveparent = async (item: FormData) => {
    setOnLoading(true);

    try {
      for (const file of selectedFiles) {
        const json = {
          user_document: file?.file,
          document_name: file?.document.title,
          document_type: file?.document.docType,
          document_number: null
        };

        console.log(json);
        const resp = await HttpClient.postFile('/user/document', json)
        if (resp.status != 200) {
          throw resp.data.message ?? 'Something went wrong!'
        }
      }
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }

    setOnLoading(false);
    props.onCloseClick();
    toast.success(`Document submited successfully!`);
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
                      onChange={e => handleChangeCrewing(e.target.value == "yes")}
                    >
                      <FormControlLabel value="yes" control={<Radio sx={{ p: 1, ml: 1 }} />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio sx={{ p: 1, ml: 1 }} />} label="no" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                {isCrewing && (<DocumentTile key={item.docType} selectedFile={selectedFiles.find(e => e.document.docType == item.docType)} item={item} handleChange={handleSelectedFile} />)}
              </>;
            }

            return <DocumentTile key={item.docType} selectedFile={selectedFiles.find(e => e.document.docType == item.docType)} item={item} handleChange={handleSelectedFile} />;
          })}
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

const DocumentTile = (props: { item: IDocument, selectedFile?: ISelectedFile, handleChange: (file: File, document: IDocument) => void }) => {
  const { item, selectedFile, handleChange } = props;

  return (
    <Box sx={{ borderBottom: 1, borderColor: '#9e9e9e', paddingBottom: 2, paddingTop: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography sx={{ display: 'flex', flexGrow: 1 }}>{item.title}</Typography>
        <IconButton sx={{ padding: 0 }} component="label">
          <Icon icon='mdi:add-circle' fontSize={32} color='#546e7a' />
          <input
            type='file'
            style={{ display: 'none' }}
            onChange={(e) => {
              if (!e.target.files) {
                return;
              }

              handleChange(e.target.files[0], item);
            }}
          />
        </IconButton>
      </Box>
      {selectedFile && (
        <Box component={Typography}>{selectedFile.file.name} ({toMegaByte(selectedFile.file.size, true)})</Box>
      )}
    </Box>
  );
}

export default DialogAddDocument
