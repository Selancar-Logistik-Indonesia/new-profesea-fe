import { Icon } from "@iconify/react"
import { Alert, Box, Switch, Typography } from "@mui/material"



const BoostJobAlert = ({isBoosted, setIsBoosted} : {isBoosted:boolean, setIsBoosted:(e:boolean) => void}) => {
    

    const actionSwitch = () =>{
        console.log(isBoosted)

        return(
            <Switch inputProps={{ 'aria-label': 'controlled' }} checked={isBoosted} onChange={(e :React.ChangeEvent<HTMLInputElement>) => setIsBoosted(e.target.checked) } />

        )
    }

    return(
        <Alert action={actionSwitch()} icon={<Icon icon='ph:lightning' fontSize={32} color="#32497A"/>} sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:2, backgroundColor:'#F2F8FE', border:'1px solid #0B58A6', borderRadius:'8px'}}>
            <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
                <Typography sx={{fontSize:14, fontWeight:700, color:'#303030'}}>Boost Job Visibility</Typography>
                <Typography sx={{fontSize:14, fontWeight:400, color:'#303030'}}>Active and highlight this job post to appear prominently and attract more candidates.</Typography>
            </Box>
        </Alert>
    )
}


export default BoostJobAlert