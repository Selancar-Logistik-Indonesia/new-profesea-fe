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
  
import Recomended from './Recomended'
import { Icon } from '@iconify/react'
// import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
// import AboutOverivew from './JobVacancy' 
// import NestedComment from './NestedComment'  

// import { yupResolver } from '@hookform/resolvers/yup'
    
 
const FindCandidate = () => { 
  
const theme = useTheme() 
const hidden = useMediaQuery(theme.breakpoints.down('md'))
   
 
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
    name: 'Lerian Febriana, A.Md.Kom  ',
    skill: 'Electrical Cadet', 
    location: 'Jakarta', 
  }, {
    name: 'Fadil Shahab',
    skill: 'IT Enginering', 
    location: 'Jakarta',
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
            
            <Grid container spacing={6} sx={{marginTop:'1px'}}>
              <Grid item lg={4} md={5} xs={12}> 
                {/* <Profile vacancy={vacancy}  />  */}
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
                  <Grid item xs={12}> 
                  <Typography  variant='h5'> Recommend for you</Typography>
                  <Typography  variant='body2' marginTop={2}  marginBottom={5}> Based on your profile and search history</Typography>
                      <Recomended paramcomment={paramcomment}></Recomended>
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
 

FindCandidate.acl = {
  action: 'read',
  subject: 'home'
};
export default FindCandidate
