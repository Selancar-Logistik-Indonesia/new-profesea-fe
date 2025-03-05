import Icon from 'src/@core/components/icon'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useState } from 'react'







const FaqSection = () =>{
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()


    return(
        <Box sx={{display:'flex', flexDirection:'column', gap:'48px', padding:'96px 120px'}}>
            <Typography variant="h2" sx={{fontSize:'32px !important', fontWeight:700, color:'#404040', textAlign:'center'}}>
                Frequently Asked Question
            </Typography>
        <Box sx={{display:'flex', flexDirection:'column', gap:'16px'}}>
        <Accordion onClick={() => setIsOpen(!isOpen)}>
            <AccordionSummary >
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                <Typography>{t('employer_page.faq.1.summary')}</Typography>
                <Box sx={{rotate: isOpen ? '90deg' : '-90deg'}}><Icon icon={'weui:arrow-outlined'} fontSize={24} flip='up'/></Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {t('employer_page.faq.1.detail')}
                </Typography>
            </AccordionDetails>
        </Accordion>
        </Box>
        
    </Box>
    )

}


export default FaqSection