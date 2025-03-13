import { Icon } from '@iconify/react'
import { Box, Button, Fade, Typography, Zoom } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Transform } from 'stream'

type ItemProps = {
  id: number
  hover: boolean
  active: boolean
  title: string
  detail: string
  icon: string
  img: string
}

const BenefitSection = () => {
  const { t } = useTranslation()
  // const img =
  const [itemState, setItemState] = useState<any[]>([
    {
      id: 1,
      hover: false,
      active: true,
      title: t('employer_page.benefit_1'),
      detail: t('employer_page.benefit_1_detail'),
      icon: 'mdi:user-group',
      img: ['/images/benefitSection/talent_1.png', '/images/benefitSection/talent_2.png'],
      scale: '110%'
    },
    {
      id: 2,
      hover: false,
      active: false,
      title: t('employer_page.benefit_2'),
      detail: t('employer_page.benefit_2_detail'),
      icon: 'material-symbols:cases-rounded',
      img: '/images/benefitSection/Job Posting.png',
      scale: '100%'
    },
    {
      id: 3,
      hover: false,
      active: false,
      title: t('employer_page.benefit_3'),
      detail: t('employer_page.benefit_3_detail'),
      icon: 'healthicons:forum',
      img: [
        '/images/benefitSection/pisah_1.png',
        '/images/benefitSection/pisah_2.png',
        '/images/benefitSection/pisah_3.png',
        '/images/benefitSection/pisah_4.png'
      ],
      scale: '100%'
    },
    {
      id: 4,
      hover: false,
      active: false,
      title: t('employer_page.benefit_4'),
      detail: t('employer_page.benefit_4_detail'),
      icon: 'famicons:share-social',
      img: '/images/benefitSection/Media Sosial.png',
      scale: '100%'
    }
  ])
  const [prevActive, setPrevActive] = useState<ItemProps>(itemState[0])

  const handleHover = (index: number, isHovering: boolean) => {
    setItemState(prev => {
      return prev.map(item => {
        return item?.id === index ? { ...item, hover: isHovering, active:false } : { ...item, active: false }
      })
    })
  }

  const handleClick = (index: number) => {
    setItemState(prev => {
      return prev.map(item => {
        if (item.id === index) {
          setPrevActive(item)
        }

        return item?.id === index ? { ...item, hover: false, active: true } : { ...item, active: false, hover: false }
      })
    })
  }

  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/backgrounds/ship-blur-background.png)',
        padding: '5.7rem 5.1rem',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          border: '1px solid #F0F0F0',
          gap: 11.5,
          padding: '2.85rem',
          borderRadius: '24px',
          boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 11.5 }}>
          <Typography
            variant='h2'
            sx={{ fontSize: '32px !important', fontWeight: 700 }}
            dangerouslySetInnerHTML={{ __html: t('employer_page.benefit_title') }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {itemState?.map(item => {
              return (
                <>
                  <ItemContent item={item} handleHover={handleHover} handleClick={handleClick} prevItem={prevActive} />
                </>
              )
            })}
          </Box>
          <Button variant='contained' size='small'>
            {t('employer_page.hero_button')}
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: '#F2F8FE',
            borderRadius: '48px',
            minWidth: '567px',
            height: '699px',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {itemState.map(item => {
            return (item.hover === true || item.active === true) && <ImageComponent item={item} />
          })}
        </Box>
      </Box>
    </Box>
  )
}

function ItemContent({
  item,
  handleHover,
  handleClick,
  prevItem
}: {
  item: ItemProps
  handleHover: (i: number, isHovering: boolean) => void
  handleClick: (i: number) => void
  prevItem: ItemProps
}) {
  return (
    <Box
      onMouseEnter={() => handleHover(item?.id, true)}
      onMouseLeave={() => {
        handleHover(item?.id, false)
        handleClick(prevItem.id)
      }}
      onClick={() => handleClick(item.id)}
      sx={{
        padding: '.95rem',
        borderRadius: '12px',
        transition: '0.8s ease',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        border: '1px solid transparent',
        overflow: 'hidden',
        cursor: item.hover ? 'pointer' : '',
        ...(item?.hover && {
          border: '1px solid #428FDC',
          boxShadow: '0px 2px 10px 0px rgba(0,0,0, 0.08)',
          backgroundColor: '#F2F8FE'
        }),
        ...(item?.active && {
          border: '1px solid #F0F0F0',
          boxShadow: '-8px 11px 8px 0px rgba(38, 105, 209, 0.15)',
          backgroundColor: '#FFFFFF'
        })
      }}
    >
      {/* Icons */}
      <Box
        sx={{
          transition: 'background-image 0.8s ease',
          borderRadius: '12px',
          backgroundImage: item.hover || item.active ? 'linear-gradient(to left top, #0049C6,#CDF4FF)' : ''
        }}
      >
        <Box
          sx={{
            backgroundColor: item.hover || item.active ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
            padding: '12px',
            transition: '1s ease'
          }}
        >
          <Icon
            icon={item?.icon}
            color={item.active || item.hover ? '#ffffff' : '#9E9E9E'}
            fontSize={'2.6rem'}
            style={{ transition: '0.8s ease' }}
          />
        </Box>
      </Box>

      {/* text */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap:3 }}>
        <Typography
          sx={{
            transition: '1s ease',
            transform: item.hover || item.active ? 'translate(0px, 5px)' : 'translate(0px, 25px)',
            fontSize: 16,
            fontWeight: 600,
            color: item?.hover || item?.active ? '#1F1F1F' : '#999999'
          }}
        >
          {item?.title}
        </Typography>
        <Fade in={item?.hover || item?.active} timeout={800}>
          <Typography
            sx={{
              transform: item.hover || item.active ? 'translate(0px, -5px)' : 'translate(0px, 25px)',
              fontSize: 16,
              fontWeight: 400,
              color: '#868686',
              transition: '0.8s ease-in-out !important'
            }}
            dangerouslySetInnerHTML={{ __html: item?.detail }}
          />
        </Fade>
      </Box>
    </Box>
  )
}

function ImageComponent({ item }: { item: ItemProps }) {
  if (item.img.length === 4) {
    return (
      <>
        <Zoom in={item.hover || item.active} timeout={800} style={{scale:'.8', marginBottom:'5px'}}>
          <Box
            component='img'
            src={item.img[3]}
            sx={{
              maxWidth: item.active ? '100%' : '90%',
              maxHeight: item.active ? '100%' : '90%',
              objectFit: 'contain',
              position: 'absolute',
              top: '131px',
              left: '93px',
              translate: item.active ? '107px 0px' : '',
              transition: '0.8s ease !important',
              transform: item.active ? 'scale(1.3) !important' : '',
              
            }}
          />
        </Zoom>
        <Zoom in={item.hover || item.active} timeout={800} style={{scale:'.8'}}>
          <Box
            component='img'
            src={item.img[2]}
            sx={{
              maxWidth: item.active ? '100%' : '90%',
              maxHeight: item.active ? '100%' : '90%',
              objectFit: 'contain',
              position: 'absolute',
              top: '253px',
              left: '236px',
              translate: item.active ? '-171px 5px' : '',
              transition: '0.8s ease !important',
              transform: item.active ? 'scale(1.3) !important' : ''
            }}
          />
        </Zoom>
        <Zoom in={item.hover || item.active} timeout={800} style={{scale:'.8'}}>
          <Box
            component='img'
            src={item.img[1]}
            sx={{
              maxWidth: item.active ? '100%' : '90%',
              maxHeight: item.active ? '100%' : '90%',
              objectFit: 'contain',
              position: 'absolute',
              top: '369px',
              left: '92px',
              translate: item.active ? '107px 15px' : '',
              transition: '0.8s ease !important',
              transform: item.active ? 'scale(1.3) !important' : ''
            }}
          />
        </Zoom>
        <Zoom in={item.hover || item.active} timeout={800} style={{scale:'.8'}}>
          <Box
            component='img'
            src={item.img[0]}
            sx={{
              maxWidth: item.active ? '100%' : '90%',
              maxHeight: item.active ? '100%' : '90%',
              objectFit: 'contain',
              position: 'absolute',
              top: '485px',
              left: '249px',
              translate: item.active ? '-184px 25px' : '',
              transition: '0.8s ease !important',
              transform: item.active ? 'scale(1.3) !important' : ''
            }}
          />
        </Zoom>
      </>
    )
  }

  return (
    <Zoom in={item.hover || item.active} timeout={800}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '400px', // Fixed container width
          height: '400px', // Fixed container height
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          transition: '0.8s ease'
        }}
      >
        {/* Case for Two Images */}
        {Array.isArray(item.img) ? (
          <>
            <Box
              component='img'
              src={item.img[1]}
              sx={{
                maxWidth: item.active ? '100%' : '90%',
                maxHeight: item.active ? '100%' : '90%',
                objectFit: 'contain',
                // position: 'absolute',
                // top: '10px',
                transition: '0.8s ease',
                transform: item.active ? 'scale(1.6)' : item.hover ? 'scale(1.4)' : 'scale(1)'
              }}
            />
            <Box
              component='img'
              src={item.img[0]}
              sx={{
                maxWidth: item.active ? '100%' : '90%',
                maxHeight: item.active ? '100%' : '90%',
                objectFit: 'contain',
                // position: 'absolute',
                // top: '-100px',
                transition: '0.8s ease',
                transform: item.active ? 'scale(1.6)' : item.hover ? 'scale(1.4)' : 'scale(1)'
              }}
            />
          </>
        ) : (
          // Case for Single Image
          <Box
            component='img'
            src={item.img}
            sx={{
              maxWidth: item.active ? '100%' : '90%',
              maxHeight: item.active ? '100%' : '90%',
              objectFit: 'contain',
              transition: '0.8s ease',
              transform: item.active ? 'scale(1.4)' : item.hover ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        )}
      </Box>
    </Zoom>
  )
}

export default BenefitSection
