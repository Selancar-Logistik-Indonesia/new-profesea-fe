// ** MUI Components
 
import Grid from '@mui/material/Grid' 
import { Button, TextField } from '@mui/material' 
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
import Question from 'src/contract/models/question'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
  
const EssayForm = (props : { training_id : any}) => {
  const [onLoading, setOnLoading] = useState(false);

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
    const { question } = formData
    
    const json = {
      "training_id": props.training_id,
      "form_type": "ft",
      "question": question,
      "choices": null
    }
    
    setOnLoading(true);

    
      try
        {
            console.log(json);
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
          <Grid container justifyContent="flex-end">
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
            <Grid container display={{ xs: "none", lg: "block" }} md={10}>  </Grid>
            <Grid justifyContent="flex-end" sx={{display:  { xs: 12, md: 2  ,justifyContent:'right'} , mt:2}}>
            <Button type='submit' size='small' color='primary' variant='contained' disabled={onLoading} startIcon={<Icon icon='ion:save' fontSize={10} />}> Save Question </Button>
            </Grid>
          </Grid> 
        </form>
    ) 
}
 
export default EssayForm
