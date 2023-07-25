import { useState } from 'react'
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
const ImageSlider = (props: any) => {
  const slides = props.slide
  const [currentIndex, setCurrentIndex] = useState(0)
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
        <label htmlFor='raised-button-file-banner'>
 
          <Icon fontSize='large' icon={'material-symbols:delete'} color={'white'} style={{ fontSize: '24px' }} />
 
        </label>
      </Box>
    </Box>
  )
} 

export default ImageSlider
