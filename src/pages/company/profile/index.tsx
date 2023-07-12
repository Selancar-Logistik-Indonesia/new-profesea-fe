// ** React Imports
import React, { useEffect, useState }  from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import {  useMediaQuery   } from '@mui/material'

import {  useTheme } from '@mui/material/styles'
// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material' 
import UserProfileHeader from 'src/layouts/components/UserProfileHeader'
import AboutOverivew from './JobVacancy' 
import NestedComment from './NestedComment'  

// import { yupResolver } from '@hookform/resolvers/yup'
    
import {IUser} from 'src/contract/models/user'
 
const ProfileCompany = () => { 
  
const theme = useTheme() 
const hidden = useMediaQuery(theme.breakpoints.down('md'))

const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser; 
const [selectedItem, setSelectedItem] = useState<IUser|null>(null); 
const [arrVacany, setArrVacancy] = useState<any>([])
function firstload(){
  HttpClient.get(AppConfig.baseUrl + "/user/"+user.id)
    .then((response) => {
        const user = response.data.user as IUser; 
        setSelectedItem(user);
    })
  HttpClient.get(AppConfig.baseUrl + '/job?search=&page=1&take=25').then(response => {
    const code = response.data.jobs.data
    setArrVacancy(code)
    // const renderList = () => {
    //   return code.map((item, index) => {})
    // }
  })
}

useEffect(() => {
  // setOpenPreview(false)
  firstload()
}, [])

    
 
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
      
      <Box>
       <Grid container spacing={1}>
          <Grid item xs={12}  md={10}  
            sx={!hidden ?{          
                alignItems:"stretch", 
            }:{ 
          
            }}
            >  
            <Grid container >  
             { selectedItem!= null &&   <UserProfileHeader datauser={selectedItem} address={selectedItem.address}/> }
            </Grid>
            <Grid container spacing={6} sx={{marginTop:'1px'}}>
              <Grid item lg={4} md={5} xs={12}> 
                <AboutOverivew vacancy={arrVacany}  /> 
              </Grid>
              <Grid item lg={8} md={7} xs={12}>
                <NestedComment paramcomment={paramcomment}></NestedComment>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} display={'flex'} sx={{direction:"row",
              justifyContent:"flex-start",
              alignContent:'top',
              alignItems:"stretch"}}>
                <Grid item xs={12} >
                  <Grid item xs={12}  sx={ {
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
                  <Grid item xs={12}  sx={ {
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
                  <Grid item xs={12}  sx={ {
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
