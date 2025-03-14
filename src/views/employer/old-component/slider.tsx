import React from 'react'
import { Grid, Typography, Card, CardMedia } from '@mui/material'

const Slides = (items: any[]) => {
  return items.map((arr, index) => (
    <Grid item key={index} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          m: 4,
          px: 6,
          pt: 8,
          height: arr.title ? '480px' : '350px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF 0.4'
        }}
      >
        {arr.title && (
          <Typography
            align='center'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 24,
              fontWeight: 700,
              mb: arr.title ? 6 : -2,
              height: '2.4em'
            }}
          >
            {arr.title}
          </Typography>
        )}
        <CardMedia
          component='div'
          image={arr.img}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '180px',
            aspectRatio: '1',
            mb: 2
          }}
        />
        <Typography align='center' sx={{ fontSize: 18, my: 4 }} dangerouslySetInnerHTML={{ __html: arr.description }} />
      </Card>
    </Grid>
  ))
}

const Slider = ({ items }: { items: any[] }) => {
  return (
    <Grid
      container
      sx={{
        px: 15,
        maxHeight: '520px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto'
      }}
    >
      {Slides(items)}
    </Grid>
  )
}

export default Slider
