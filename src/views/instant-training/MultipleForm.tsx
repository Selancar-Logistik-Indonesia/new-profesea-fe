// ** MUI Components
 
import Grid from '@mui/material/Grid' 
import { Button, Radio, TextField } from '@mui/material' 
import React, { useState } from 'react'
import { useThread } from 'src/hooks/useThread'
import { Icon } from '@iconify/react'
  
const MultipleForm = (props : { training_id : any, answer:any}) => {

  const [content , setContent] = useState<any>('')
  const { postComments } = useThread();
  const [onLoading, setOnLoading] = useState(false);

  const renderAnswer = () =>{
    const indents = [];
    // const [selectedValue, setSelectedValue] = useState<any>(1);

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
              />
            </Grid>
            <Grid item xs={8} md={2}>
              <TextField
                fullWidth
                placeholder="Score"
                variant="outlined"
                type='number'
              />
            </Grid>
            <Grid item xs={4} md={1}>
              <Radio
                value={i}
                name={`radio-buttons${i}`}
                id={`opt${i}`}
              />
            </Grid>
          </Grid>          
      </Grid>   
        </>
      )
    }
    
    return indents
  }
   

  const onComment = async () => {
    setOnLoading(true);
    const json = {
        // "user_id": props.user_id,
        // "replyable_id": props.thread_id,
        "replyable_type": "thread",
        "content": content
    }
    try {
      await postComments(json);
      setContent('')
    } catch (error) { console.log(error) }   
        setOnLoading(false);
  }
        
    return ( 
          <Grid container justifyContent="flex-end">
            <Grid xs={12} mb={2}>
              <TextField
                    multiline
                    fullWidth
                    rows={2}
                    placeholder="Write a Question"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Grid>
            {renderAnswer()}
            <Grid container display={{ xs: "none", lg: "block" }} md={10}>  </Grid>
            <Grid justifyContent="flex-end" sx={{display:  { xs: 12, md: 2  ,justifyContent:'right'}, mt:2}}>
              <Button type='submit' size='small' color='primary' variant='contained' onClick={onComment} disabled={onLoading} startIcon={<Icon icon='ion:save' fontSize={10} />}> Save Question </Button>
            </Grid>
          </Grid> 
    ) 
}
 
export default MultipleForm
