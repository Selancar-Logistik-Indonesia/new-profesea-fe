// ** React Imports
import React  from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import {  useMediaQuery   } from '@mui/material'

import {  useTheme } from '@mui/material/styles'
// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material' 
import UserProfileHeader from 'src/layouts/components/UserProfileHeader'
import AboutOverivew from './JobVacancy' 
import NestedComment from './NestedComment'  

// import { yupResolver } from '@hookform/resolvers/yup'
    
 
const ProfileCompany = () => { 
  
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
            <Grid xs={12} container >  
              <UserProfileHeader/>
            </Grid>
            <Grid container spacing={6} sx={{marginTop:'1px'}}>
              <Grid item lg={4} md={5} xs={12}> 
                <AboutOverivew vacancy={vacancy}  /> 
              </Grid>
              <Grid item lg={8} md={7} xs={12}>
                <Grid container spacing={6}>
                  <Grid item xs={12}> 
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
 

ProfileCompany.acl = {
  action: 'read',
  subject: 'home'
};
export default ProfileCompany
