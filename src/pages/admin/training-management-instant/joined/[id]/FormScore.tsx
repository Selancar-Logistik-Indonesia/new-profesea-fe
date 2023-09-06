
import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';
import TrainingContext from 'src/context/TrainingContext';
// import { useTraining } from 'src/hooks/useTraining';

const FormScore = () => {
    // const { joinTraining } = useTraining();

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
                    />
                
                    <Button sx={{width:'30px', height:'35px', mr:2}} size='small' variant='contained' color='primary' startIcon={<Icon icon='ion:enter' fontSize={18} />}>
                         
                    </Button>
                    </>
                )
                
            }}
        </TrainingContext.Consumer>
        
    );
}

export default FormScore
