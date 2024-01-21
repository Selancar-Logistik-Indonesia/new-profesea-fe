// ** MUI Components
 
import Grid from '@mui/material/Grid' 
import { Button, Radio, TextField, Typography } from '@mui/material' 
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Question from 'src/contract/models/question'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
  
const MultipleForm = (props : { training_id : any, answer:any}) => {

  const [onLoading, setOnLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const renderAnswer = () =>{
    const indents = [];

    for (let i = 0; i < props?.answer; i++) {
      indents.push(
        <>
        <Grid item xs={12} mb={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                placeholder="Write a Answer"
                variant="outlined"
                {...register(`choices.${i}.answer`)}
              />
            </Grid>
            <Grid item xs={8} md={2}>
              <TextField
                fullWidth
                {...register(`choices.${i}.score`)}
                placeholder="Score"
                variant="outlined"
                type='number'
              />
            </Grid>
            <Grid item xs={4} md={1}>
              <Typography variant='body2' style={{ fontSize: '12px', color: '#262525' }}>
                Answer
              </Typography>
              <Radio
                checked={selectedValue === `a${i}`}
                onChange={handleChange}
                value={`a${i}`}
                name="radio-buttons"
                inputProps={{ 'aria-label': `A${i}` }}
              />
            </Grid>
          </Grid>          
      </Grid>   
        </>
      )
    }
    
    return indents
  }
   

  const schema = yup.object().shape({
    question: yup.string().required()
  })

const { 
    register,
    formState: { errors }, 
    handleSubmit,
} = useForm<Question>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
}) 


const onSubmit = async (formData: Question) => {
    const { question, choices} = formData
    const newchoices = choices.map(function (ch:any, i:number) {
        return ({
          answer: ch.answer,
          score: ch.score,
          correct: (selectedValue === `a${i}`) ? 1 : 0
        })
      });

    const json = {
      "training_id": props.training_id,
      "form_type": "mc",
      "question": question,
      "choices": newchoices
    }
    
    setOnLoading(true);
    
    console.log(json);
    try
      {
          const resp = await HttpClient.post('/training/question', json);
          if (resp.status != 200) {
              throw resp.data.message ?? "Something went wrong!";
          }
          toast.success(` Question added successfully!`);
      } catch (error) {
          toast.error(`Opps ${getCleanErrorMessage(error)}`);
      }
            

    setOnLoading(false);
}
        
    return ( 
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  >
        <Grid container justifyContent="flex-center">
          <Grid xs={12} mb={2}>
            <TextField
                  multiline
                  fullWidth
                  rows={2}
                  placeholder="Write a Question"
                  variant="outlined"                  
                  error={Boolean(errors.question)}
                  {...register(`question`)}
              />
          </Grid>
          {renderAnswer()}
          <Grid container display={{ xs: "none", lg: "block" }} md={10}>  </Grid>
          <Grid justifyContent="flex-end" sx={{display:  { xs: 12, md: 2  ,justifyContent:'right'}, mt:2}}>
            <Button type='submit' size='small' color='primary' variant='contained' disabled={onLoading} startIcon={<Icon icon='ion:save' fontSize={10} />}> Save Question </Button>
          </Grid>
        </Grid> 
      </form>
    ) 
}
 
export default MultipleForm
