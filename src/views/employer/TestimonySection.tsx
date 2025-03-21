import { Avatar, AvatarGroup, Box, Button, Divider, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"


type TestyProps = {
    comment: string,
    name: string,
    position: string,
    company: string,
    img:string
}

const TestimonySection = ({isMobile} : {isMobile : boolean}) =>{
    const {t} = useTranslation()
    const { locale } = useRouter()

    const testyItems: TestyProps[] = [
        {
            comment:t('employer_page.testimony_1'),
            name: 'Mudofir',
            position: 'Crew Operation Depth Head',
            company:'Samudera Daya Maritim',
            img:'/images/avatars/mudofir.jpg'

        },
        {
            comment:t('employer_page.testimony_2'),
            name: 'Aan Kurniawan',
            position: 'Talent Acquisition and Learning',
            company:'Pertamina Hulu Energi',
            img:'/images/avatars/aan2.jpg'

        },
        {
            comment:t('employer_page.testimony_3'),
            name: 'Tohom Yogi Emerson S',
            position: 'Crewing Manager',
            company:'Global Lingkar Cemerlang',
            img:'/images/glc-crewing-manager.jpg'
        },
    ]



    return(
        <Box sx={{padding:isMobile ? '2.85rem 1.45rem' :'5.7rem 7.1rem', backgroundColor:'#F2F8FE', gap:11.5, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box sx={{display:'flex', flexDirection:isMobile ? 'column':'row', justifyContent:'space-between', gap:4, width:'100%', alignItems:isMobile ? 'center' : ''}}>
                <Typography variant="body2" sx={{fontSize:isMobile ? '1.45rem' :'1.9rem', fontWeight:700}}>
                    Testimoni dari <span style={{backgroundImage:'linear-gradient(283.95deg,#0049C6 -12.57%, #CDF4FF 126.88%)', color:'transparent', backgroundClip:'text'}}>Klien Kami</span>
                </Typography>
                <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                    <Box sx={{display:'flex', alignItems:'flex-end', justifyContent:isMobile ? 'center' :'flex-end', width:'100%'}}>
                        <AvatarGroup sx={{}} spacing='small'>
                            <Avatar alt='avatar_1' src="/images/logos/company/ads_profesea.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE', objectFit:'cover', backgroundColor:'#FFFFFF'}} imgProps={{style:{objectFit:'contain', width:'100%'}}}/>
                            <Avatar alt='avatar_4' src="/images/logos/company/sachi.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE',objectFit:'contain', backgroundColor:'#FFFFFF'}} imgProps={{style:{objectFit:'contain', width:'100%'}}}/>
                            <Avatar alt='avatar_2' src="/images/logos/company/aweidhia.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE', objectFit:'cover', backgroundColor:'#FFFFFF'}} imgProps={{style:{objectFit:'contain', width:'100%'}}}/>
                            <Avatar alt='avatar_3' src="/images/logos/company/pt_spil.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE',objectFit:'contain', backgroundColor:'#FFFFFF'}} imgProps={{style:{objectFit:'contain', width:'100%'}}}/>
                            <Avatar alt='avatar_4' src="/images/logos/company/samudera.png" sx={{width:'47px', height:'47px', border:'2px solid #F2F8FE', backgroundColor:'#FFFFFF'}}/>
                        </AvatarGroup>
                    </Box>
                    <Typography sx={{fontSize:'.95rem', fontWeight:400, color:'#404040'}}>Dipercaya 200+ Perusahaan</Typography>
                </Box>
            </Box>

            <Box sx={{display:'flex', flexDirection:isMobile ? 'column' :'row', justifyContent:'space-around', gap:isMobile ? 5.7 :3, width:'100%'}}>
                {testyItems.map( (item, index) => (<TestiItems key={index} item={item} />))}
            </Box>

            <Link href='/register/employer' locale={locale} style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <Button variant="contained" sx={{textTransform:'none', fontSize:'.95rem', fontWeight:700, color:'#FAFAFA', width:isMobile ? '100%' :'60%'}}>{t('employer_page.hero_button')}</Button>
            </Link>
        </Box>
    )
}


const TestiItems = ({item} : {item: TestyProps}) => {


    return(
        <Box sx={{display:'flex',flex:1, flexDirection:'column', gap:4, borderRadius:'24px', padding:'1.45rem', backgroundColor:'#FFFFFF', boxShadow:'0px 2px 10px 0px rgba(0, 0, 0, 0.08)', justifyContent:'space-between'}}>
            <Typography sx={{fontSize:'1.2rem', fontWeight:400, color:'#404040'}} dangerouslySetInnerHTML={{ __html: "&ldquo;" + item.comment +  "&rdquo;" }}/>
            <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
            <Divider />
                <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:4, padding:'1.45rem 0px .7rem 0px'}}>
                <Avatar alt={item.name} src={item.img} sx={{width:'47px', height:'47px', objectFit:'contain'}}/>
                <Box sx={{display:'flex', flexDirection:'column' }}>
                    <Typography sx={{fontWeight:700, fontSize: '1.2rem', color:'#404040'}}>{item.name}</Typography>
                    <Typography sx={{fontWeight:400, fontSize:'.95rem', color:'#868686'}}>{item.position}</Typography>
                    <Typography sx={{fontWeight:400, fontSize:'.95rem', color:'#868686'}}>{item.company}</Typography>
                </Box>
                </Box>
            </Box>
        </Box>
    )
}


export default TestimonySection