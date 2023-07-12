import React from 'react'
// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

 

export type ParamGallery = {
  images: string 
}

// export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }
interface Props {
  // teams: ProfileTeamsType[]
  image: ParamGallery[] 
}

const renderList = (arr: ParamGallery[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' } 
          }}
        >
         

          <Box sx={{ columnGap: 2,   flexWrap: 'wrap', alignItems: 'center' }}>
             <img alt='logo' src= {`${item.images.charAt(0).toUpperCase() + item.images.slice(1)}`} style={{ maxWidth: '100%',
                  height: 'auto',
                  padding: 0,
                  margin: 0 }} />
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}
 

const Gallery = (props: Props) => {
  const {   image  } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.primary', textTransform: 'uppercase' }}>
                Gallery
              </Typography>
              {renderList(image)}
            </Box>
            {/* <Box sx={{ mb: 7 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Contacts
              </Typography>
              {renderList(contacts)}
            </Box> */}
           
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>
  )
}

export default Gallery
