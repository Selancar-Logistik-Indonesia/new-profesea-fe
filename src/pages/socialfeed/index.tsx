// ** React Imports
import React  from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import {  Card, CardContent, Typography, useMediaQuery   } from '@mui/material'

import {  useTheme } from '@mui/material/styles'
// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material'   
import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
import NestedComment from './NestedComment'
import Postfeed from './Postfeed'
// import AboutOverivew from './JobVacancy' 
// import NestedComment from './NestedComment'  

// import { yupResolver } from '@hookform/resolvers/yup'
    
 
const SocialFeed = () => { 
  
const theme = useTheme() 
const hidden = useMediaQuery(theme.breakpoints.down('md'))
   
const vacancy = [
  {
    judul: 'Junior Electrical',
    namapt: 'PT Samudera Indonesia ',
    lokasi: 'Jakarta,Indonesia', 
    waktu: '1 minute ago', 
  },
  {
    judul: 'Junior Electrical 2',
    namapt: 'PT Samudera Indonesia',
    lokasi: 'Jakarta,Indonesia', 
    waktu: '2 minute ago', 
  }]
 const feed = [
  {
    name: 'Nova Gita Taregan',
    talent: 'Talent acquisition at barbar.com', 
  },
  {
    name: 'Anis Dewinta Zahra',
    talent: 'Talent acquisition at telcom.com', 
  }, ]
  

 const paramcomment = [
  {
    logo: '/images/avatars/1.png',
    name: 'PT Samudera  ',
    waktu: '1 minute ago', 
    postcomment: 'Halo semuanya! Saya ingin berbagi kabar gembira bahwa saya, Lerian Febriana, baru saja bergabung dengan Profesea.id! Saya sangat antusias karena sekarang menjadi bagian dari tim sebagai Electrical Cadet.', 
  }, {
    logo: '/images/avatars/1.png',
    name: 'PT Samudera  ',
    waktu: '5 minute ago', 
    postcomment: 'ini Testing Comment 2', 
  },
  ]

  return (    
      
      <Box  >
       <Grid container spacing={2}>
          <Grid container xs={12}  md={10}  
            sx={!hidden ?{ 
                          
                        alignItems:"stretch", 
            }:{ 
          
            }}
                    >  
            
            <Grid container spacing={6}  >
              <Grid item lg={4} md={5} xs={12}> 
                <Profile vacancy={vacancy}  /> 
                <br></br> 
                <Grid container  >
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                         <Box sx={{ columnGap: 2,   flexWrap: 'wrap', alignItems: 'center' }} display={'flex'}>
                           <Icon icon={'arcticons:connect-you'} fontSize={30} />  <Typography variant='body1' sx={{ color: "#424242", fontWeight: 600 }}> Total Conected :250</Typography>
               
                      </Box> 
                      
                      </CardContent>
                    </Card>
                  </Grid>
                  
                </Grid> 
                     
                <br></br>
                 <Feed  feed={feed}></Feed>
              </Grid>
               <Grid item lg={8} md={7} xs={12}>
                <Grid container spacing={6}>
                  <Grid item xs={12} >  
                      <Postfeed></Postfeed>
                      
                <br></br>
                      <NestedComment paramcomment={paramcomment}></NestedComment>
                  </Grid> 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={2} container display={'flex'}   sx={{direction:"row",
              justifyContent:"flex-start",
              alignContent:'top',
              alignItems:"stretch"}}>
                <Grid xs={12}>
                    <Grid xs={12}  sx={ {
                      boxSizing: 'border-box',  
                      background: '#FFFFFF', 
                      border: '1px solid rgba(76, 78, 100, 0.12)',
                      borderRadius: '20px',
                      p: 4, 
                      display: 'flex',
                      alignItems: 'stretch',
                      justifyContent: 'left', 
                      marginBottom:'10px',
                      marginLeft:'20px',
                      height:'197px', 
                      wrap :'nowrap'
                    } }> 
             
                    </Grid>  
                  <Grid xs={12}  sx={ {
                        boxSizing: 'border-box',  
                        background: '#FFFFFF', 
                        border: '1px solid rgba(76, 78, 100, 0.12)',
                        borderRadius: '20px',
                        p: 4, 
                        display: 'flex',
                        alignItems: 'stretch',
                        justifyContent: 'left', 
                        marginBottom:'10px',
                        marginLeft:'20px',
                        height:'197px', 
                        wrap :'nowrap'
                      } }> 
              
                  </Grid>  
                  <Grid xs={12}  sx={ {
                        boxSizing: 'border-box',  
                        background: '#FFFFFF', 
                        border: '1px solid rgba(76, 78, 100, 0.12)',
                        borderRadius: '20px',
                        p: 4, 
                        display: 'flex',
                        alignItems: 'stretch',
                        justifyContent: 'left', 
                        marginBottom:'10px',
                        marginLeft:'20px',
                        height:'197px', 
                        wrap :'nowrap'
                      } }> 
              
                  </Grid>  
                </Grid>
              </Grid>          
        </Grid>
      </Box>
         
        
  )
}
 

SocialFeed.acl = {
  action: 'read',
  subject: 'home'
};
export default SocialFeed
