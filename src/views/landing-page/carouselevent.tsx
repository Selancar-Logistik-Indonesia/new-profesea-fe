//import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import {   Box, Card,   CardContent, CardMedia, Grid, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";
//import discoverPageStyle from "src/@core/styles/discover/discover-page";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
 import { useEffect, useState } from "react";
import { HttpClient } from "src/services";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useTranslation } from "react-i18next"; 
// import Moment from 'moment'


const CarouselEvent = () => {
  // const [forumCode, setForumCode] = useState('') 
  const [dataSheet, setDataSheet] = useState<[]>([])
  const { t } = useTranslation();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
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
      const resp = await HttpClient.get(`/news?page=${1}&take=25&type=Event`)
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
        background: '#ececec'
      }}
      pb={2}
    >
      {dataSheet &&
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
            {/* <Item item={'/images/bannerevent.jpg'}></Item> */}
            {dataSheet.map((item, i) => (
              <Item key={i} item={item}></Item>
            ))}
          </Carousel>
        </Box>
      </Grid>
      }
      
    </Grid>
  )
  function Item(props: any) {
    return (
      <Card
        sx={{
          color: 'common.white',
          backgroundColor: '#FFFFFF',
          marginRight: 3,
          height: '90%',
          marginBottom: 5,
          marginTop: 5
        }}
      >

      <Grid item xs={12} sm={12} mb={5} mt={5}>
            <Typography fontSize={34} style={{ color: "#000" }} fontWeight="800" textAlign="center">{t("landing_event_title")}</Typography>
        </Grid>
        <CardContent>

          {/* <Link style={{ textDecoration: 'none' }} href={'/news/' + props.item.slug}> */}
          <Link style={{ textDecoration: 'none' }} href={'/event/' + props.item.title}>
            <CardMedia component='img' height='100%' alt={'alt'} sx={{ objectFit: 'contain', marginBottom: '5' }} image={props.item} />
          </Link>
        </CardContent>
      </Card>
    )
  }
}

export default CarouselEvent;