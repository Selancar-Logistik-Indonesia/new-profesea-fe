import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"


type ItemProps = {
    title: string,
    detail: string,
    img: string,
    icon: string,
    num: number
}



const JoinSection = () => {
    const { t } = useTranslation()

    const items: ItemProps[] =[
        {
            title: t('employer_page.join_1'),
            detail: t('employer_page.join_1_detail'),
            img: '/images/joinSection/join_1.png',
            icon: '/images/icons/docs.png',
            num: 1
        },
        {
            title: t('employer_page.join_2'),
            detail: t('employer_page.join_2_detail'),
            img: '/images/joinSection/join_2.png',
            icon: '/images/icons/suitcase2.png',
            num:2
        },
        {
            title: t('employer_page.join_3'),
            detail: t('employer_page.join_3_detail'),
            img: '/images/joinSection/join_3.png',
            icon: '/images/icons/people.png',
            num:3
        }
    ]

    return(
        <Box sx={{padding:'5.7rem 7.1rem', display:'flex', flexDirection:'column', gap:11.5, justifyContent:'center', alignItems:'center', backgroundImage: 'linear-gradient(180deg, #FAFAFA 43.66%, #5C86E0 100%)'
        }}>
            <Box sx={{textAlign:'center'}}>
                <Typography variant="h2" sx={{fontSize:'1.9rem !important', fontWeight:700, color:'#404040', textAlign:'center'}} dangerouslySetInnerHTML={{ __html: t('employer_page.join_title') }}/>
            </Box>
            <Box sx={{padding:'1.45rem',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:11.5}}>
                {items.map(item  => {
                    return <><Content item={item}/></>
                })}
            </Box>
        </Box>
    )
}

const Content = ({item} : {item: ItemProps}) =>{

    return(
        <Box sx={{ flex:1, padding:'1.45rem',gap:11.5, display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center', borderRadius:'24px', backgroundColor:'#FFFFFF', boxShadow:'0px 2px 10px rgba(0, 0, 0, 0.08)'}}>
            <Box sx={{minWidth:'292px',width:'100%' ,height:'214px', position:'relative', boxShadow: '-8px 15px 51px 0px #32497A40',backdropFilter: 'blur(4px)', borderRadius:'12px'}}>
                <Box component='img' src={item.img} alt={item.title} sx={{objectFit:'cover', width:'100%', height:'100%', borderRadius:'12px'}}/>
                <Box sx={{width:'34',height:'34px',position:'absolute', top:'18px', left:'18px', backgroundColor:'#FF9800', borderRadius:'17px', padding:'12px',display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center' }}>
                    <Typography sx={{fontWeight:700, fontSize:'20px', color:'#ffffff'}}>{item.num}</Typography>
                </Box>
            </Box>   
            <Box sx={{display:'flex', flexDirection:'column',justifyContent:'center',gap:3, minHeight:'137px'}}>
                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center',gap:3}}>
                    <Box  component='img' src={item.icon} sx={{width:'44px', height:'44px', objectFit:'contain'}}/>
                    <Typography sx={{fontWeight:700, fontSize:'1.45rem', color:'#404040'}}>{item.title}</Typography>
                </Box>
                <Typography sx={{fontWeight:400, fontSize:'.95rem', color:'#525252'}} dangerouslySetInnerHTML={{ __html: item.detail }}/>
            </Box>
        </Box>
    )
}




export default JoinSection