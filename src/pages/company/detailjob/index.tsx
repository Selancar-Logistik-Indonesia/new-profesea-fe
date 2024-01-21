// ** React Imports
import React  from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import {  Button, Divider, IconButton, ImageList, ImageListItem, Typography, useMediaQuery   } from '@mui/material'
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {  useTheme } from '@mui/material/styles'
import {   Grid } from '@mui/material' 
import UserJobCompanyHeader from 'src/layouts/components/UserJobCompanyHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    
 
const ProfileCompany = () => { 
  
const theme = useTheme() 
const hidden = useMediaQuery(theme.breakpoints.down('md'))
   
 
 const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
    },
  ];
  
  return (    
      
      <Box  >
       <Grid container spacing={2}>
          <Grid container xs={12}  md={10}  
            sx={!hidden ?{ 
                      background: '#FFFFFF', 
                          
                       display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
            ,border:'1px solid var(--light-action-disabled-background, rgba(76, 78, 100, 0.12))',borderRadius:'10px',padding:'5px'
            }:{ 
                
            }}
                    >  
            <Grid xs={12}   >  
              <UserJobCompanyHeader/>  
            <Grid xs={12} sx={{marginLeft:'25px',marginTop:'10px'}}  >  
               <Typography  variant='h6'  >Detail</Typography> 
                <Box  sx={ {  display: 'flex' ,margin:'3px'  }}>
                  <Typography  variant='body1'  sx={{fontWeight: 'bold',  color: "#262525" }}  >.  Education : </Typography> 
                  <Typography  variant='body1'  ml="0.5rem"  > Diploma 3 (D3)</Typography>
               </Box> 
                <Box  sx={ {  display: 'flex' ,margin:'3px'  }}>
                  <Typography  variant='body1'  sx={{fontWeight: 'bold',  color: "#262525" }}  >.  Salary : </Typography> 
                  <Typography  variant='body1'  ml="0.5rem"  > Rp7.000.000</Typography>
               </Box> 
                <Box  sx={ {  display: 'flex' ,margin:'3px'  }}>
                  <Typography  variant='body1'  sx={{fontWeight: 'bold',  color: "#262525" }}  >.  Employee type : </Typography> 
                  <Typography  variant='body1'  ml="0.5rem"  > Full Time </Typography>
               </Box> 
                <Box  sx={ {  display: 'flex',margin:'3px'   }}>
                  <Typography  variant='body1'  sx={{fontWeight: 'bold',  color: "#262525" }}  >.  Job Category : </Typography> 
                  <Typography  variant='body1'  ml="0.5rem"  > Engineering</Typography>
               </Box> 
                <Box  sx={ {  display: 'flex' ,margin:'3px'  }}>
                  <Typography  variant='body1'  sx={{fontWeight: 'bold',  color: "#262525" }}  >.  Licenses or Certifications : </Typography> 
                  <Typography  variant='body1'  ml="0.5rem"  > Electrical Installation</Typography>
               </Box> 
                <Box  sx={ {  display: 'flex' ,margin:'3px'  }}>
                  <Typography  variant='body1'  sx={{fontWeight: 'bold',  color: "#262525" }}  >.  Work Experiences Needed : </Typography> 
                  <Typography  variant='body1'  ml="0.5rem"  > Electrical Engineering</Typography>
               </Box> 
            </Grid>
            <Divider sx={{margin:'25px'}}></Divider>
            <Grid xs={12} sx={{marginLeft:'25px',marginTop:'10px'}}  >  
              <Typography  variant='h6' >Job  Description</Typography> 
              <Typography  variant='body1'    > PT Samudera Indonesia Tbk adalah sebuah perusahaan logistik dan pelayaran yang berkantor pusat di Jakarta, Indonesia. Untuk mendukung kegiatan bisnisnya, hingga tahun 2022, perusahaan ini memiliki 150+ anak perusahaan, cabang, dan kantor yang tersebar di seantero Asia.</Typography>
            </Grid>
            <Divider sx={{margin:'25px'}}></Divider>
            <Grid xs={12} sx={{marginLeft:'25px',marginTop:'10px'}}  >  
              <Typography  variant='h6' >About Company</Typography> 
              <Typography  variant='body1'    > PT Samudera Indonesia Tbk adalah sebuah perusahaan logistik dan pelayaran yang berkantor pusat di Jakarta, Indonesia. Untuk mendukung kegiatan bisnisnya, hingga tahun 2022, perusahaan ini memiliki 150+ anak perusahaan, cabang, dan kantor yang tersebar di seantero Asia.</Typography>
              <Box sx={{margin:'10px'}}>
                <Button style={{ backgroundColor: "white", color: "#666CFF", marginRight: 10 }} variant="contained">More Information</Button>
              </Box> 
            </Grid>
            <Divider sx={{margin:'25px'}}></Divider>
            <Grid xs={12} sx={{marginLeft:'25px',marginTop:'10px'}}> 
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid> 
              <Divider sx={{margin:'25px'}}></Divider>
               <Grid xs={12} sx={{marginLeft:'25px',marginTop:'10px', display:'flex'}}> 
               
             <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <IconButton>
                        <FontAwesomeIcon icon={faFacebook} />   <Typography variant='body1' sx={{ color: "#262525", fontWeight: 600 }}>PT.Samudera Indonesia Maritim</Typography>
                </IconButton>  
            </Box>
            <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <IconButton>
                        <FontAwesomeIcon icon={faInstagram} />   <Typography variant='body1' sx={{ color: "#262525", fontWeight: 600 }}>@Samudera Indonesia</Typography>
                </IconButton>  
            </Box> 
            <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
               <IconButton>
                        <FontAwesomeIcon icon={faTwitter} />   <Typography variant='body1' sx={{ color: "#262525", fontWeight: 600 }}>@Samudera Indonesia</Typography>
                </IconButton>  
            </Box>
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
