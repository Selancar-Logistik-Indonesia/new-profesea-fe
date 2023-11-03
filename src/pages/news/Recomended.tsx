// ** MUI Components
// import ReactHtmlParser from 'react-html-parser'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid' 
import Typography from '@mui/material/Typography' 
import {   Card, CardContent, CardMedia, Link } from '@mui/material'
import Moment from 'moment'
 import { useNews } from 'src/hooks/useNews'
import INews from 'src/contract/models/news'

const renderList = (arr: INews[]) => {
  if (arr && arr.length) {

    return arr.map((item, index) => {
 
      return (
        <Grid item xs={12} key={index}>
          <Card sx={{ color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardContent>
              <Link style={{ textDecoration: 'none' }}href={'/news/' + item.slug}>
                <Box
                  height={350}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                >
                  <Grid container direction='row' alignItems='center' spacing={4}>
                    <Grid item>
                      <Typography sx={{ color: 'text.secondary', mb: 1, fontSize: 9 }}>
                        {Moment(item.posting_at).format('DD/MM/YYYY HH:MM:SS')}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography sx={{ color: '#0a66c2', textTransform: 'uppercase' }} fontWeight={600} fontSize={16}>
                    {item.title
                      ? `${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`
                      : ''}
                  </Typography>
                  <CardMedia
                    component='img'
                    alt='Img of Profesea'
                    image={item?.imgnews != null ? item.imgnews : null}
                    style={{
                      maxWidth: '100%',
                      height: '300px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      objectFit: 'contain' 
                    }}
                  />
                  <Typography fontWeight={400} fontSize={14} mt={2}>
                    {item.snap_content
                      ? `${
                          item.snap_content.toString().charAt(0).toUpperCase() + item.snap_content.toString().slice(1)
                        }`
                      : ''}
                  </Typography>
                </Box>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      )
    })
  } else {
    return null
  }
}
 

const Recomended = () => { 
  const { newss } = useNews();

  return (
    <Grid container spacing={2}>
      {renderList(newss)}
    </Grid>
  )
}

export default Recomended
