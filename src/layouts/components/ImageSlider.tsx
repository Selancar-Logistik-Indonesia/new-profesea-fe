import React, { useEffect, useState } from 'react'
import { Box  } from '@mui/system'
import { Icon } from '@iconify/react'

const slideStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const rightArrowStyles = {
  // position: "absolute",
  top: '50%',
  transform: 'translate(0, -50%)',
  right: '32px',
  fontSize: '20px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer'
}

const leftArrowStyles = {
  // position: "absolute",
  top: '50%',
  transform: 'translate(0, -50%)',
  left: '32px',
  fontSize: '20px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer'
}

const sliderStyles = {
  height: '100%'
}

const dotsContainerStyles = {
  display: 'flex',
  justifyContent: 'center'
}

const dotStyle = {
  margin: '0 3px',
  marginBottom:'5px',
  cursor: 'pointer',
  fontSize: '14px'
}
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Button } from '@mui/material'
import { HttpClient } from 'src/services'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageSlider = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handledelete = async () => {
    debugger;
    const resp = await HttpClient.del(`/user/gallery/` + slides[currentIndex].id)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    slides.slice(currentIndex,1)
    setOpen(false)
  }
  const slides = props.slide
  const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
      goToSlide(0);
    }, [slides])
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex)
  }

  const slideStylesWidthBackground = {
    ...slideStyles,

    backgroundImage: `url(${props.slide[currentIndex].url})`
  }

 
  return (
    <>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>{'Are you sure do delete?'}</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handledelete}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Box sx={{ position: 'relative', height: '400px', marginTop: '10px' }}>
        <div style={sliderStyles}>
          <div>
            <Box sx={{ position: 'absolute' }} onClick={goToPrevious} style={leftArrowStyles}>
              ❰
            </Box>
            <Box sx={{ position: 'absolute' }} onClick={goToNext} style={rightArrowStyles}>
              ❱
            </Box>
          </div>
          <div style={slideStylesWidthBackground}></div>
          <div style={dotsContainerStyles}>
            {slides.map((slide: any, slideIndex: any) => (
              <div style={dotStyle} key={slideIndex} onClick={() => goToSlide(slideIndex)}>
                ●
              </div>
            ))}
          </div>
        </div>
        <Box position={'absolute'} sx={{ right: { xs: '2%', md: '2%' }, top: { xs: '3%', md: '3%' } }}>
          <label htmlFor='raised-button-file-banner'></label>
          <Button variant='contained' color='error' size='small' onClick={handleClickOpen}>
            <Icon fontSize='large' icon={'material-symbols:delete'} color={'white'} style={{ fontSize: '24px' }} />
            Delete
          </Button>
        </Box>
      </Box>
    </>
  )
} 

export default ImageSlider
