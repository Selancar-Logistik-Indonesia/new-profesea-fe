//import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import {   Box, Card,   CardContent, CardMedia, Grid,   Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";
//import discoverPageStyle from "src/@core/styles/discover/discover-page";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
 import { useEffect, useState } from "react";
import { HttpClient } from "src/services";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Moment from 'moment'

const CarouselNewsView = () => {
  // const [forumCode, setForumCode] = useState('') 
  const [dataSheet, setDataSheet] = useState<[]>([])
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  }
  const getListNews = async () => {
    try {
      // const resp = await HttpClient.get(`/news?page=${1}&take=25&type=${forumCode}`)
      const resp = await HttpClient.get(`/news?page=${1}&take=25`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.news.data  
      const items = rows 
      setDataSheet(items)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  // const type = [{ title: 'News' }, { title: 'Event' }]

  useEffect(() => { 
    getListNews().then(() => { 
    }) 
  }, [])
//tambah forumCOde di useefect kalau mau filter

  return (
    <Grid
      container
      justifyContent='left'
      sx={{
        maxWidth: { xs: '100%' },
        px: { xs: 5, md: 5 },
        background: '#FFFFFF'
      }}
      // mt={1}
      // mb={2}
      pb={2}
      // pt={10}
    >
      <Grid container justifyContent='center'>
        {/* <Grid item>
          <Autocomplete
            disablePortal
            size='medium'
            style={{ backgroundColor: '#FFFFFF' }}
            sx={{ mb: 2, width: '500px', mr: 2 }}
            id='combo-box-level'
            options={type}
            color='success'
            renderInput={params => <TextField {...params} label='Tipe' />}
            getOptionLabel={(option: any) => option.title}
            onChange={(event: any, newValue: any | null) =>
              newValue?.title ? setForumCode(newValue.title) : setForumCode('')
            }
          />
        </Grid> */}
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Carousel
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            renderDotsOutside={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition='all .5'
            transitionDuration={500}
            containerClass='carousel-container'
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item-padding-40-px'
            rewindWithAnimation={true}
          >
            {dataSheet.map((item, i) => (
              <Item key={i} item={item}></Item>
            ))}
          </Carousel>
        </Box>
      </Grid>
    </Grid>
  )
  function Item(props: any) {
    return (
      // <>
      //   <Card sx={{ margin: 5, height: '500px' }}>
      //     <Grid item container>
      //       <Grid xs={8}>
      //         <Typography gutterBottom variant='h6' component='div' ml={3}>
      //           {props.item.type}
      //         </Typography>
      //       </Grid>
      //       <Grid xs={4}>
      //         <Typography variant='body2' color='text.primary' mt={2}>
      //           {props.item.posting_at}
      //         </Typography>
      //       </Grid>
      //     </Grid>

      //     <CardMedia
      //       component='img'
      //       alt='green iguana'
      //       height='180'
      //       image={props.item?.imgnews != null ? props.item.imgnews : null}
      //     />
      //     <CardContent>
      //       <Link style={{ textDecoration: 'none' }} href={'/news/?id=' + props.item.id}>
      //         <Typography fontSize={28} style={{ color: '#000' }} fontWeight='800' mt={0}>
      //           {props.item.title}
      //         </Typography>
      //       </Link>
      //       <Typography fontSize={18} style={{ color: '#000' }} mt={2} align={'justify'} maxWidth='85%'>
      //         {props.item.snap_content}
      //       </Typography>
      //     </CardContent>
      //     <CardActions></CardActions>
      //   </Card>

      
      <Card
        sx={{ color: 'common.white', backgroundColor: '#FFFFFF', marginRight: 3, height: '100%', marginBottom: 5, marginTop: 5 }}
      >
        <CardContent>
          {/* <Link style={{ textDecoration: 'none' }} href={'/news/?id=' + props.item.id}> */}
          <Link style={{ textDecoration: 'none' }} href={'/news/' + props.item.slug}>
              <CardMedia sx={{ height: 201 }}  
              image={props.item?.imgnews != null ? props.item.imgnews : null}
                //src='/images/img-whatis.png'
                
                    style={{
                      maxWidth: '100%',
                      height: '250px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      objectFit: 'contain' 
                    }} />
              <Grid container direction='row' alignItems='center' spacing={4}>
                <Grid item>
                  <Typography sx={{ color: 'text.secondary', mb: 1, fontSize: 9 }}>
                    {Moment(props.item.posting_at).format('DD/MM/YYYY HH:MM:SS')}
                  </Typography>
                </Grid>
              </Grid>
                <Typography variant='h6' sx={{ color: '#0a66c2', textTransform: 'uppercase' }} mb={5} fontWeight={600} fontSize={18}>
                {props.item.title}
                </Typography>
                <Typography fontWeight={300} fontSize={16} mt={2} maxWidth={'100%'}>
                {props.item.snap_content
                  ? `${
                      props.item.snap_content.toString().charAt(0).toUpperCase() +
                      props.item.snap_content.toString().slice(1)
                    }`
                  : ''}
              </Typography>
            

            {/* <Box height={400} sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
              <Grid container direction='row' alignItems='center' spacing={4}>
                <Grid item>
                  <Typography sx={{ color: 'text.secondary', mb: 1, fontSize: 9 }}>
                    {Moment(props.item.posting_at).format('DD/MM/YYYY HH:MM:SS')}
                  </Typography>
                </Grid>
              </Grid>
              <Typography sx={{ color: '#0a66c2', textTransform: 'uppercase' }} mb={5} fontWeight={600} fontSize={18}>
                {props.item.title}
              </Typography>
              <CardMedia
                component='img'
                alt='Img of Profesea'
                //image={props.item?.imgnews != null ? props.item.imgnews : null}
                src='/images/img-whatis.png'
                    style={{
                      maxWidth: '100%',
                      height: '250px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      objectFit: 'contain' 
                    }}
              />
              <Typography fontWeight={300} fontSize={16} mt={2} maxWidth={'100%'}>
                {props.item.snap_content
                  ? `${
                      props.item.snap_content.toString().charAt(0).toUpperCase() +
                      props.item.snap_content.toString().slice(1)
                    }`
                  : ''}
              </Typography>
            </Box> */}
          </Link>
        </CardContent>
      </Card>
    )
  }
}

export default CarouselNewsView;