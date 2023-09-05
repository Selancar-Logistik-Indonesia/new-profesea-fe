import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, Button, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import Training from 'src/contract/models/training';
import Icon from 'src/@core/components/icon';
import Link from 'next/link';
import TrainingContext, { TrainingProvider } from 'src/context/TrainingContext';
import { useTraining } from 'src/hooks/useTraining';
import InfiniteScroll from 'react-infinite-scroll-component';

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
