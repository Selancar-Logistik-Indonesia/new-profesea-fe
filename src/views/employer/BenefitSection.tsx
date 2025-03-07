import { Icon } from '@iconify/react'
import { Box, Button, Fade, Slide, Typography, Zoom } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const img =  ['/images/benefitSection/talent_1.png', '/images/benefitSection/talent_2.png']
  const [hover, setHover] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const [itemState, setItemState] = useState<any[]>([
    {
      id: 1,
      hover: false,
      active: true,
      title: t('employer_page.benefit_1'),
      detail: t('employer_page.benefit_1_detail'),
      icon: 'mdi:user-group',
      img:'/images/benefitSection/Talent Pool.png',
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
      img: '/images/benefitSection/gabung.png',
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

  const handleHover = (index: number, isHovering: boolean) => {
    setItemState(prev => {
      setHover(isHovering)
    
      return prev.map(item => {
        return item?.id === index ? { ...item, hover: isHovering } : { ...item, active: false }
      })
    })
  }

  const handleClick = (index: number) => {
    setItemState(prev => {
      return prev.map(item => {
        return item?.id === index ? { ...item, hover: false, active: true } : { ...item, active: false, hover: false }
      })
    })
  }

  return (
    <Box sx={{ backgroundImage: 'url(/images/backgrounds/ship-blur-background.png)', padding: '96px 120px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          border: '1px solid #F0F0F0',
          gap: '48px',
          padding: '48px',
          borderRadius: '24px',
          boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap:'48px' }}>
          <Typography
            variant='h2'
            sx={{ fontSize: '32px !important', fontWeight: 700 }}
            dangerouslySetInnerHTML={{ __html: t('employer_page.benefit_title') }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {itemState?.map(item => {
              return (
                <>
                  <ItemContent item={item} handleHover={handleHover} handleClick={handleClick} />
                </>
              )
            })}
          </Box>
          <Button variant='contained' size='small'>
            {t('employer_page.hero_button')}
          </Button>
        </Box>
        <Box sx={{ backgroundColor: '#F2F8FE', borderRadius: '48px', maxWidth:'567px',width:'100%', height:'699px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
          {itemState.map(item => {
            return (item.hover === true || item.active === true) && <ImageComponent item={item}/>
          })}
        </Box>
      </Box>
    </Box>
  )
}

function ItemContent({
  item,
  handleHover,
  handleClick
}: {
  item: ItemProps
  handleHover: (i: number, isHovering: boolean) => void
  handleClick: (i: number) => void
}) {
  return (
    <Box
      onMouseEnter={() => handleHover(item?.id, true)}
      onMouseLeave={() => handleHover(item?.id, false)}
      onClick={() => handleClick(item.id)}
      sx={{
        padding: '16px',
        borderRadius: '12px',
        transition: '0.8s ease',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:'12px',
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
      <Box sx={{ transition:'background-image 0.8s ease', borderRadius:'12px', backgroundImage:'linear-gradient(to left top, #0049C6,#CDF4FF)'}}>
        <Box sx={{backgroundColor: item.hover || item.active ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)', padding:'12px', transition:'1s ease'}}>
            <Typography sx={{transition:'0.8s ease', backgroundImage:'linear-gradient(to left, #0049C6,#CDF4FF)', backgroundClip:'text'}}>
                <Icon icon={item?.icon} color={item.active || item.hover ? '#ffffff' : ''}  fontSize={44} style={{transition:'0.8s ease'}}/>
            </Typography>
        </Box>
      </Box>

      {/* text */}
      <Box>
        <Typography
          sx={{
            transition: '1s ease',
            transform: item.hover || item.active ? 'translate(0px, -2px)' : 'translate(0px, 20px)',
            fontSize: '16px',
            fontWeight: 600,
            color: item?.hover || item?.active ? '#1F1F1F' : '#999999'
          }}
        >
          {item?.title}
        </Typography>
        <Fade in={item?.hover || item?.active} timeout={800} style={{}}>
        <Typography
          sx={{
            
            transform: item.hover || item.active ? 'translate(0px, -5px)' : 'translate(0px, 25px)',
            fontSize: '16px',
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

function ImageComponent({item} :{item: ItemProps} ){

    if(item.img.length === 2){
        return(
            <Zoom in={item.hover || item.active} timeout={800} style={{scale:'80%'}}>
                <Box sx={{display:'flex', flexDirection:'column',backgroundColor:'red !important',alignItems:'center', position:'relative',scale: item.active ? '120% !important' : '', transition:'0.8s ease !important', margin:'auto'}}>     
                    <Box  component={'img'} src={item.img[1]} sx={{objectFit:'cover', position:'absolute', margin:'auto', top:'-100px'}} />
                    <Box component={'img'} src={item.img[0]} sx={{objectFit:'cover', position:'absolute', margin:'auto', top:'10px'}} />
                </Box>
            </Zoom>
        )
    }


    return(
        <Zoom in={item.hover || item.active} timeout={800} style={{scale:'80%'}}>
            <Box sx={{scale: item.active ? '100% !important' : '', transition:'0.8s ease !important'}}>
                <Box component={'img'} src={item.img} sx={{objectFit:'cover'}} />
            </Box>
        </Zoom>
    )

}

export default BenefitSection
