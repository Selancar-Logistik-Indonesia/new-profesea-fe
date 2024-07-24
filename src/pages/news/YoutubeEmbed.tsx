import { Box } from '@mui/material'
import React from 'react'

interface IYoutubeEmbed {
  embedId: string
}

const YoutubeEmbed: React.FC<IYoutubeEmbed> = ({ embedId }) => {
  return (
    <Box
      className='video-responsive'
      sx={{
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        borderRadius: '8px'
      }}
    >
      <iframe
        width='853'
        height='480'
        src={`https://www.youtube.com/embed/${embedId}`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          borderRadius: '8px'
        }}
      />
    </Box>
  )
}

export default YoutubeEmbed
