import React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { Grid, Typography, Card, CardMedia } from '@mui/material'

const Slides = (items: any[]) => {
  return items.map((arr, index) => (
    <Grid item key={index} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          m: 4,
          px: 6,
          pt: 8,
          height: arr.title ? '525px' : '375px',
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
              fontSize: 28,
              fontWeight: 700,
              mb: 6,
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
            width: '200px',
            aspectRatio: '1',
            mb: 2
          }}
        />
        <Typography fontSize={24} my={4} align='center'>
          {arr.description}
        </Typography>
      </Card>
    </Grid>
  ))
}

const Slider = ({ items }: { items: any[] }) => {
  const theme = useTheme()

  return (
    <Grid
      container
      sx={{
        px: 8,
        maxHeight: '800px',
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
