
import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TrainingContext from 'src/context/TrainingContext';
import { useTraining } from 'src/hooks/useTraining';

const FormScore = (props :{ id : any, user_id:number, result_id:number}) => {
    const { updateScore , onLoading} = useTraining();
    const [score, setScore ] = useState<any>()

    if(onLoading){
        toast.success('Score has been submited!.')
    }

    return (
        <TrainingContext.Consumer>
            {() => {
                
                return(
                    <>
                    <TextField
                        size='small'
                        sx={{width:'77px', mr:2}}
                        placeholder="Score"
                        variant="outlined"
                        type='number'
                        onChange={(e) => setScore(e.target.value) }
                    />
                 
                    <Button sx={{width:'30px', height:'35px', mr:2}} size='small' variant='contained' color='primary' 
                    startIcon={<Icon icon='ion:enter' fontSize={18} />} 
                    onClick={() => updateScore(props.id, {user_id: props.user_id, result_id:props.result_id, score: score})}>
                         
                    </Button>
                    </>
                )
                
            }}
        </TrainingContext.Consumer>
        
    );
}

export default FormScore
