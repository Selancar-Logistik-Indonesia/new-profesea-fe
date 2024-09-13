import React from 'react'
import Typography from '@mui/material/Typography'
import { styled, TypographyProps, BoxProps, Box } from '@mui/material'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const MenuItemTitle = styled(Typography)<TypographyProps>(() => ({
  fontWeight: 400,
  position: 'absolute',
  top: '85%',
  left: '7%',
  background: 'linear-gradient(180deg, rgba(102, 102, 102, 0) 3.5%, #32487A 60.5%)',
  padding: '3px', // Customize padding
  paddingLeft: '10px',
  paddingRight: '10px',

  borderBottomLeftRadius: 5,
  borderBottomRightRadius: 5,
  color: '#fff'
}))
const BlankLayoutWithAppBarWrapper = styled(Box)<BoxProps>(() => ({
  position: 'relative'
}))

interface TextOverImageProps {
  imageUrl: string
  text: string
}

const TextOverImage: React.FC<TextOverImageProps> = ({ imageUrl, text }) => {
  return (
    <Box>
      <BlankLayoutWithAppBarWrapper>
        <MenuItemTitle>{text}</MenuItemTitle>
        <ProfilePicture src={imageUrl} alt='profile-picture' sx={{ objectFit: 'cover' }} />
      </BlankLayoutWithAppBarWrapper>
    </Box>
  )
}

export default TextOverImage
