import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import Question from 'src/contract/models/question'
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import EditorArea from 'src/@core/components/react-draft-wysiwyg'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState } from 'draft-js'

const QuestionPreview = (props: { training_id: any }) => {
  const [dataCard, setDataCard] = useState<Question[]>([])
  const [desc, setDesc] = useState(EditorState.createEmpty())

  const getListQuestion = async () => {
    try {
      const resp = await HttpClient.get(`/training/question?training_id=${props.training_id}`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.questions
      setDataCard(rows)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  useEffect(() => {
    getListQuestion()
  }, [])

  return (
    <Grid container spacing={2} sx={{ padding: 5 }}>
      {dataCard.map((item, index) => {
        const choices = item.choices as any[]

        return (
          <>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 'bold' }} fontSize={16}>
                {index + 1}. {item.question}
              </Typography>
            </Grid>
            <Grid item xs={12} ml={4}>
              {item.form_type === 'ft' && (
                <EditorWrapper>
                  <EditorArea
                    placeholder='Description'
                    editorState={desc}
                    onEditorStateChange={data => setDesc(data)}
                    toolbar={{
                      options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true }
                    }}
                  />
                </EditorWrapper>
              )}
              {item.form_type === 'mc' && (
                <FormControl>
                  <RadioGroup aria-labelledby='demo-radio-buttons-group-label' name='radio-buttons-group'>
                    {choices.map(cho => {
                      return <FormControlLabel value={cho?.id} control={<Radio />} label={cho?.answer} key={cho.id} />
                    })}
                  </RadioGroup>
                </FormControl>
              )}
            </Grid>
          </>
        )
      })}
    </Grid>
  )
}

QuestionPreview.acl = {
  action: 'read',
  subject: 'seafarer-training-ongoing'
}

export default QuestionPreview
