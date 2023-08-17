import { Ref, useState, forwardRef, ReactElement, useEffect } from 'react'
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
import { CircularProgress, Autocomplete } from '@mui/material'
import Thread from 'src/contract/models/thread'
import Forum from 'src/contract/models/forum'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const licenseData = [
    { title: 'Certificate of Competency', docType: 'COC' },
    { title: 'Certificate of Profeciency', docType: 'COP' },
    { title: 'Certificate of Recognition', docType: 'COR' },
    { title: 'Certificate of Endorsement', docType: 'COE' },
    { title: 'MCU Certificates', docType: 'MCU' }
]
const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})


type EditProps = {
    selectedItem: Thread;
    visible: boolean;
    onCloseClick: VoidFunction;
    onStateChange: VoidFunction;
};



const DialogEdit = (props: EditProps) => {
    const [onLoading, setOnLoading] = useState(false);
    console.log(props.selectedItem)

    const contenDesc = convertFromHTML(props.selectedItem.content).contentBlocks
    const contentState = ContentState.createFromBlockArray(contenDesc)
    const editorState = EditorState.createWithContent(contentState)
    const [desc, setDesc] = useState(editorState)
    
    const [forumCode, getForumCode] = useState<[]>([])
    const [sforumCode, setForumCode] = useState(0)

  const schema = yup.object().shape({
    title: yup.string().min(1).required()
  })
 const {
   register,
   formState: { errors },
   handleSubmit
 } = useForm<any>({
   mode: 'onBlur',
   resolver: yupResolver(schema)
 })  
 const combobox = () => {
   HttpClient.get('/forum?page=1&take=10&search=').then(response => {
     const code = response.data.forums.data
     getForumCode(code)
   })
 }
useEffect(() => {
  combobox()
}, [])

function uploadCallback(file:any){
  console.log(file);
  
  return new Promise((resolve, reject) => {
    const form_data = new FormData();
    form_data.append('file', file)
    HttpClient.postFile(`/user/filemanager` , form_data).then(response => {
      if (response.status != 200) {
        const error = response.data.message;
        reject(error);
      }
      resolve({ data: { link: response.data.path } })
    })
  });
}

const onCreate = async (formData: any) => {
  const { title } = formData

  const json = {
      "title": title,
      "content": draftToHtml(convertToRaw(desc?.getCurrentContent())),
      "forum_id": sforumCode
  }
  setOnLoading(true);       
  try {
      const resp = await HttpClient.post('/thread', json);
      if (resp.status != 200) {
          throw resp.data.message ?? "Something went wrong!";
      }

      toast.success(` Thread created successfully!`);
  } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`);
  }
  setOnLoading(false);       

}

  return (
        <Dialog
            fullWidth
            open={props.visible}
            maxWidth='md'
            scroll='body'
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
                <Box>
                <Grid container spacing={6}  sx={{
                    boxSizing: 'border-box',
                    background: '#FFFFFF',
                    border: '1px solid rgba(76, 78, 100, 0.12)',
                    borderRadius: '10px',
                    p: 4,
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    wrap: 'nowrap'
                }}>
                    <Grid item xs={10} spacing={6}>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onCreate)} >
                        <Grid
                            item
                            container
                            xs={12}
                            sx={{
                            boxSizing: 'border-box',
                            background: '#FFFFFF',
                            border: '1px solid rgba(76, 78, 100, 0.12)',
                            borderRadius: '10px',
                            p: 4,
                            display: 'flex',
                            alignItems: 'stretch',
                            justifyContent: 'left',
                            wrap: 'nowrap'
                            }}
                        >
                            <Typography variant="body2" color={"#32487A"} fontWeight="600" fontSize={18} mb={3}> Create Thread</Typography>
                            <Grid container xs={12} columnSpacing={'2'} rowSpacing={'2'} sx={{ mb: 2 }}>
                                <Grid item xs={12} md={6}>
                                <TextField
                                    id='title'
                                    {...register("title")} error={Boolean(errors.title)}
                                    label='Title'
                                    variant='outlined'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                <Autocomplete
                                    disablePortal
                                    id='code'
                                    options={forumCode}
                                    renderInput={params => <TextField {...params} label='Forum' />}
                                    getOptionLabel={(option: any) => option.name}
                                    onChange={(event: any, newValue: Forum | null) =>
                                    newValue?.id ? setForumCode(newValue.id) : setForumCode(0)
                                    }
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <EditorWrapper>
                                    <EditorArea editorState={desc} onEditorStateChange={data => setDesc(data)} toolbar={{
                                        image: { uploadCallback: uploadCallback, previewImage: true,  alt: { present: true, mandatory: false }},
                                    }}  placeholder='Write a thread'/>
                                    <Button variant='contained' sx={{ mr: 2 }} type='submit'>
                                        {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Save"}
                                    </Button>
                                </EditorWrapper>
                                </Grid>
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                </Grid>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'center',
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
            >
                <Button variant='contained' sx={{ mr: 2 }} type='submit'>
                    {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Submit"}
                </Button>
                <Button variant='outlined' color='secondary' onClick={props.onCloseClick}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
  )
}
 

export default DialogEdit