import { ImageList, ImageListItem, Box, Typography, CardMedia } from '@mui/material'
import { useState } from 'react'
import { AppConfig } from 'src/configs/api'
import ISocialFeed from 'src/contract/models/social_feed'
import PopUpFeed from './PopUpFeed'

const srcset = (image: string) => {
  return {
    src: image ?? '/images/no-image.jpg',
    srcSet: image ?? '/images/no-image.jpg'
  }
}

const ImageListFeed = ({ item }: { item: ISocialFeed }) => {
  const [openPopUp, setOpenPopUp] = useState(false)

  if (!item.attachments) return null
  const attachments = item.attachments
  const total = attachments.length
  const column = total === 2 ? 6 : attachments.length > 1 ? 5 : 1

  const itemCols = (i: number) => {
    if (i === 0) return 3
    else return total === 2 ? 3 : 2
  }
  const itemRows = (i: number) => {
    if (i === 0) return 3
    else return total === 2 ? 3 : total === 3 ? 1.5 : 1
  }

  return (
    <>
      {total > 1 ? (
        <ImageList
          variant='quilted'
          cols={column}
          rowHeight={430 / 3}
          gap={2}
          sx={{
            width: '100%',
            height: 430,
            objectFit: 'contain',
            overflow: 'hidden',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
          onClick={() => setOpenPopUp(!openPopUp)}
        >
          {attachments.slice(0, 3).map((item, i) => (
            <ImageListItem key={item} cols={itemCols(i)} rows={itemRows(i)}>
              <img
                {...srcset(item)}
                style={{
                  height: '100%',
                  objectFit: 'cover'
                }}
                alt={item}
                loading='lazy'
              />
            </ImageListItem>
          ))}
          {total === 3 && (
            <ImageListItem cols={itemCols(3)} rows={itemRows(3)} sx={{ position: 'relative' }}>
              <img
                {...srcset(attachments[3])}
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  backgroundColor: 'gray'
                }}
                alt={attachments[3]}
                loading='lazy'
              />
            </ImageListItem>
          )}
          {total > 3 && (
            <ImageListItem cols={itemCols(3)} rows={itemRows(3)} sx={{ position: 'relative' }}>
              <img
                {...srcset(attachments[3])}
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  backgroundColor: 'gray'
                }}
                alt='blurred'
                loading='lazy'
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: 'rgba(10, 12, 15, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}
              >
                <Typography sx={{ color: 'white', fontSize: 24 }}>+{total - 3}</Typography>
              </Box>
            </ImageListItem>
          )}
        </ImageList>
      ) : item.content_type === 'videos' ? (
        <CardMedia
          sx={{
            objectFit: 'contain',
            width: '100%',
            maxHeight: '450px',
            backgroundColor: '#1B1F23',
            cursor: 'pointer'
          }}
          component='video'
          controls
          src={`${AppConfig.baseUrl}/public/data/streaming?video=${attachments![0]}`}
        />
      ) : (
        <CardMedia
          component='img'
          src={attachments ? attachments[0] : '/images/no-image.jpg'}
          alt={item.content}
          loading='lazy'
          onClick={() => setOpenPopUp(!openPopUp)}
          sx={{
            objectFit: 'contain',
            height: '100%',
            maxHeight: '450px',
            backgroundColor: '#1B1F23',
            cursor: 'pointer'
          }}
        />
      )}

      {openPopUp && <PopUpFeed feed={item} openDialog={openPopUp} setOpenDialog={setOpenPopUp} />}
    </>
  )
}

export default ImageListFeed
