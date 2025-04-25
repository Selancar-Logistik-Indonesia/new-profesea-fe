import { Icon } from "@iconify/react"
import { Box, Dialog, Typography } from "@mui/material"



const PopupDetails = ({isOpen, handleClose} : {isOpen:boolean, handleClose:() => void}) => {
    


    return(
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth={'sm'} sx={{}}>
            <Box sx={{display:'flex', flexDirection:'column', gap:3, padding:'12px 0px 16px 0px', borderRadius:'8px', backgroundColor:'#FFFFFF', boxShadow:'0px 2px 10px 0px #00000014'}}>
            {/* headre */}
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:'0px 12px'}}>
                <Typography sx={{fontSize:16, fontWeight:700, color:'#303030'}}>Submission Details</Typography>
                <Icon onClick={handleClose}  icon="material-symbols:close-rounded" fontSize={20} style={{cursor:'pointer'}} />
            </Box>
        </Box>
        </Dialog>
    )
}


export default PopupDetails