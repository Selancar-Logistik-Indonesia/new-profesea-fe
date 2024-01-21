// ** MUI Components
 
import Grid from '@mui/material/Grid' 
import { Button, CircularProgress } from '@mui/material' 
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-hot-toast'

export type ParamMain = {
  training_id: any 
  question_id: any
}


function uploadCallback(file: any) {
  console.log(file);

  return new Promise((resolve, reject) => {
    const form_data = new FormData();
    form_data.append('file', file)
    HttpClient.postFile(`/user/filemanager`, form_data).then(response => {
      if (response.status != 200) {
        const error = response.data.message;
        reject(error);
      }
      resolve({ data: { link: response.data.path } })
    })
  });
}
  
const AnswerForm = (props : ParamMain) => {

  const [desc, setDesc] = useState(EditorState.createEmpty())
  const [onLoading, setOnLoading] = useState(false);

  const onAnswer = () => {
    setOnLoading(true);
    const json = {
        "training_id": props.training_id,
        "question_id": props.question_id,
        "answer_text": draftToHtml(convertToRaw(desc?.getCurrentContent())),
    }
    try {
      HttpClient.post('/training/answer/save' , json).then(response => {
          if (response.status != 200) {            
            console.log(response);
          }          
          toast.success(`The answer submited !`);
      })
    } catch (error) { console.log(error) }   
        setOnLoading(false);
    }
        
    return ( 
          <Grid container justifyContent="flex-end">
            <Grid xs={12} mb={2}>
              <EditorWrapper>
                <EditorArea editorState={desc} onEditorStateChange={data => setDesc(data)} toolbar={{
                  image: { uploadCallback: uploadCallback, previewImage: true, alt: { present: true, mandatory: false } },
                }} placeholder='Write a thread' />
                <Button variant='contained' sx={{ mr: 2, mt: 2 }} onClick={onAnswer} startIcon={<Icon icon='ion:enter' fontSize={10} />}>
                  {onLoading ? (<CircularProgress size={25} style={{ color: 'white' }} />) : "Submit"}
                </Button>
              </EditorWrapper>
            </Grid>
          </Grid> 
      ) 
}
 
export default AnswerForm
