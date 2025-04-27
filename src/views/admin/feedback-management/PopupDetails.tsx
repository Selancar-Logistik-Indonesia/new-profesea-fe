import { Icon } from "@iconify/react"
import { Box, Button, Divider, Popover, Typography } from "@mui/material"
import { IFeedbackRowData } from "src/contract/models/feedback"



const PopupDetails = ({isOpen, handleClose, row, anchorEl} : {anchorEl: any, isOpen:boolean, handleClose:() => void, row: IFeedbackRowData | null}) => {
    


    return(
        <Popover anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'left'}}  sx={{}}>
            <Box sx={{display:'flex', flexDirection:'column', gap:3, padding:'12px 0px 16px 0px', borderRadius:'8px', backgroundColor:'#FFFFFF', boxShadow:'0px 2px 10px 0px #00000014'}}>
            {/* headre */}
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:'0px 12px'}}>
                <Typography sx={{fontSize:16, fontWeight:700, color:'#303030'}}>Submission Details</Typography>
                <Icon onClick={handleClose}  icon="material-symbols:close-rounded" fontSize={20} style={{cursor:'pointer'}} />
            </Box>
            <Divider color='#E7E7E7'/>
            <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center', padding:'0px 16px'}}>
                    <Typography sx={{fontSize:14, fontWeight:400, color:'#999999', minWidth:'160px'}}>Company Name:</Typography>
                    <Typography sx={{fontSize:14, fontWeight:400, color:'#303030'}}>{row?.name}</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center', padding:'0px 16px'}}>
                    <Typography sx={{fontSize:14, fontWeight:400, color:'#999999', minWidth:'160px'}}>Email:</Typography>
                    <Typography sx={{fontSize:14, fontWeight:400, color:'#303030'}}>{row?.email}</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row', alignItems: 'center', padding:'0px 16px'}}>
                    <Typography sx={{fontSize:14, fontWeight:400, color:'#999999',minWidth:'160px'}}>Submitted Date:</Typography>
                    <Typography sx={{fontSize:14, fontWeight:400, color:'#303030'}}>{row?.date}</Typography>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', padding:'0px 16px', gap:2}}>
                    <Typography sx={{fontSize:14, fontWeight:400, color:'#999999',minWidth:'160px'}}>Selected Features:</Typography>
                    <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                        {row?.feedback.map((item) => {
                            return(
                                <Box key={item.id} sx={{display:'flex', flexDirection:'row', alignItems: 'center', gap:2}}>
                                    <Icon icon="ph:check" fontSize={17} color="#4CAF50"/>
                                    <Typography  sx={{fontSize:14, fontWeight:400, color:'#303030'}}>{item?.message}</Typography>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
                <Button onClick={handleClose} size='small' variant='outlined' sx={{textTransform:'none',width:'30%', alignSelf:'flex-end', mr:4, mt:3 }}>Close</Button>
            </Box>
        </Box>
        </Popover>
    )
}


export default PopupDetails