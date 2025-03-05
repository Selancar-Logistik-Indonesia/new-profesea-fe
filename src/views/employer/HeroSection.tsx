import { Box, Button, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import Lottie from "lottie-react"
import heroImage from 'public/animated-images/Hero (400kb).json'




const HeroSection = () => {
    const {t} = useTranslation()

    return(
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:'41px', backgroundImage:'linear-gradient(to right, #0049C6, #CDF4FF)', padding:'0px 120px'}}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', gap:'29px'}}>
                <Typography variant="h1" sx={{fontSize:'32px !important', fontWeight:700, color:'#FFFFFF'}} dangerouslySetInnerHTML={{ __html: t('employer_page.hero_1') }}/>
                <Typography variant="body2" sx={{fontSize:'16px !important', fontWeight:400, color:'#FFFFFF'}} dangerouslySetInnerHTML={{ __html: t('employer_page.hero_2') }}/>
                <Button variant='contained' size="small" sx={{fontSize:'16px', fontWeight:400, color:'#FAFAFA', padding:'8px 12px', width:'296px', textTransform:'none'}}>{t('employer_page.hero_button')}</Button>
            </Box>

            <Box>
                <Lottie animationData={heroImage}/>
            </Box>
        </Box>
    )
}


export default HeroSection