
import { Button } from '@mui/material';
import TrainingContext from 'src/context/TrainingContext';
import { useTraining } from 'src/hooks/useTraining';

const ButtonJoin = (props : {id:number}) => {
    const { joinTraining } = useTraining();

    return (
        <TrainingContext.Consumer>
            {() => {
                
                return(
                
                    <Button size='small' variant='contained' color='primary' onClick={() => joinTraining(props.id)}>
                        Join 
                    </Button>
                )
                
            }}
        </TrainingContext.Consumer>
        
    );
}

export default ButtonJoin
