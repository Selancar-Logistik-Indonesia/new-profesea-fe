//import { faBriefcase, faChartLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Autocomplete, Box, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";
//import discoverPageStyle from "src/@core/styles/discover/discover-page";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
 import { useEffect, useState } from "react";
import { HttpClient } from "src/services";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const CarouselNewsView = () => {
  const [forumCode, setForumCode] = useState('') 
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
      const resp = await HttpClient.get(`/news?page=${1}&take=25&type=${forumCode}`)
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
  const type = [{ title: 'News' }, { title: 'Event' }]
  useEffect(() => { 
    getListNews().then(() => { 
    }) 
  }, [forumCode])

  return (
    <Grid
      container
      justifyContent='left'
      sx={{
        maxWidth: { xs: '100%' },
        px: { xs: 5, md: 5 },
        background: 'linear-gradient(to right, #ececec, #eae6df)}'
      }}
      mt={1}
      mb={2}
      pb={2}
      pt={10}
    >
      <Grid container justifyContent='center'>
        <Grid item>
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
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Carousel
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={5000}
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
      <Card sx={{ margin: 5, height:'400px' }}>
        <Typography gutterBottom variant='h5' component='div'>
          {props.item.type}
        </Typography>
        <CardMedia
          component='img'
          alt='green iguana'
          height='180'
          image={props.item?.imgnews != null ? props.item.imgnews : null }
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {props.item.title}
          </Typography>
          {/* <h2>{props.item.name}</h2>
            <p>{props.item.description}</p> */}
          <Typography variant='body2' color='text.secondary'>
            {props.item.snap_content}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size='small'>Share</Button>
          <Button size='small'>Learn More</Button> */}
        </CardActions>
      </Card>
    )
  }
}

export default CarouselNewsView;