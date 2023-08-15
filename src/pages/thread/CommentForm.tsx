// ** MUI Components
 
import Grid from '@mui/material/Grid' 
import { Button, TextField } from '@mui/material' 
import { useState } from 'react'
import { useThread } from 'src/hooks/useThread'
import { Icon } from '@iconify/react'

export type ParamMain = {
  user_id: number 
  thread_id: number 
}
  
const CommentForm = (props : ParamMain) => {

  const [content , setContent] = useState<any>('')
  const { postComments } = useThread();
  const [onLoading, setOnLoading] = useState(false);

  const onComment = async () => {
    setOnLoading(true);
    const json = {
        "user_id": props.user_id,
        "replyable_id": props.thread_id,
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
                    placeholder="Write a comment"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Grid>  
            <Grid container display={{ xs: "none", lg: "block" }} md={10}>  </Grid>
            <Grid justifyContent="flex-end" sx={{display:  { xs: 12, md: 2  ,justifyContent:'right'}}}>
              <Button type='submit' size='small' color='primary' variant='contained' onClick={onComment} disabled={onLoading} startIcon={<Icon icon='mdi:send-outline' fontSize={10} />}> Post Comment </Button>
            </Grid>
          </Grid> 
      ) 
}
 
export default CommentForm
