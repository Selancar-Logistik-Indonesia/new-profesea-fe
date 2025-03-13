import { Avatar, AvatarGroup, Box, Button, Divider, Typography } from "@mui/material"



const TestimonySection = () =>{



    return(
        <Box sx={{padding:'5.7rem 7.1rem', backgroundColor:'#F2F8FE', gap:11.5, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', gap:4, width:'100%'}}>
                <Typography variant="body2" sx={{fontSize:'1.9rem', fontWeight:700}}>
                    Testimoni dari <span style={{backgroundImage:'linear-gradient(283.95deg,#0049C6 -12.57%, #CDF4FF 126.88%)', color:'transparent', backgroundClip:'text'}}>Klien Kami</span>
                </Typography>
                <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                    <Box sx={{display:'flex', alignItems:'flex-end', justifyContent:'flex-end', width:'100%'}}>
                        <AvatarGroup sx={{}} spacing='small'>
                            <Avatar alt='avatar_1' src="/images/avatars/Ellipse 36.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE'}}/>
                            <Avatar alt='avatar_2' src="/images/avatars/Ellipse 37.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE'}}/>
                            <Avatar alt='avatar_3' src="/images/avatars/Ellipse 38.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE'}}/>
                            <Avatar alt='avatar_4' src="/images/avatars/Ellipse 39.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE'}}/>
                        </AvatarGroup>
                    </Box>
                    <Typography sx={{fontSize:'.95rem', fontWeight:400, color:'#404040'}}>Dipercaya 1000+ Perusahaan</Typography>
                </Box>
            </Box>

            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', gap:3, width:'100%'}}>
                {Array.from({ length: 3 }, (_, index) => (<TestiItems key={index} />))}
            </Box>

            <Button variant="contained" sx={{textTransform:'none', fontSize:'.95rem', fontWeight:700, color:'#FAFAFA', width:'50%'}}>Gabung Sekarang</Button>
        </Box>
    )
}


const TestiItems = () => {


    return(
        <Box sx={{display:'flex', flexDirection:'column', gap:4, borderRadius:'24px', padding:'1.45rem', backgroundColor:'#FFFFFF', boxShadow:'0px 2px 10px 0px rgba(0, 0, 0, 0.08)'}}>
            <Typography sx={{fontSize:'1.2rem', fontWeight:400, color:'#404040'}}>
            “Kami berhasil merekrut kru kapal berkualitas dalam waktu kurang dari seminggu! Prosesnya cepat dan efisien.”
            </Typography>
            <Divider />
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:4, padding:'1.45rem 0px .7rem 0px'}}>
                <Avatar alt="avatar" src="/images/avatars/Ellipse 36.png" sx={{width:'47px', height:'47px'}}/>
                <Box sx={{display:'flex', flexDirection:'column', }}>
                    <Typography sx={{fontWeight:700, fontSize:'1.2rem', color:'#404040'}}>Jane Doe</Typography>
                    <Typography sx={{fontWeight:400, fontSize:'.95rem', color:'#868686'}}>HR Manager PT. Maritim Sejahtera</Typography>
                </Box>
            </Box>
        </Box>
    )
}


export default TestimonySection