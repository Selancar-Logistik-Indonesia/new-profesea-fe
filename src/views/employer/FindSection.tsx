import { Icon } from '@iconify/react'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const FindSection = ({isMobile} : {isMobile: boolean}) => {
  const { t } = useTranslation()
  const {locale} = useRouter()

  const rightItems = [
    {
      title: t('employer_page.find_1'),
      detail: t('employer_page.find_1_detail'),
      icon: 'game-icons:captain-hat-profile'
    },
    {
      title: t('employer_page.find_2'),
      detail: t('employer_page.find_2_detail'),
      icon: 'mingcute:user-setting-fill'
    },
    {
      title: t('employer_page.find_3'),
      detail: t('employer_page.find_3_detail'),
      icon: 'ic:baseline-work'
    },
    {
      title: t('employer_page.find_4'),
      detail: t('employer_page.find_4_detail'),
      icon: 'mdi:worker'
    }
  ]

  return (
    <Box sx={{ padding: '2.85rem 7.1rem', backgroundColor: '#FAFAFA', display: isMobile ? 'none' : '' }}>
      <Box
        sx={{
          border: '1px solid #F0F0F0',
          borderRadius: '48px',
          padding: '2.85rem',
          display: 'flex',
          flexDirection: 'row',
          gap: 11.5,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        {/* medium=none karena kalo show = gepeng */}
        <Box sx={{ minWidth: '528px', width:'100%',height: '559px', display:{xs:'none', lg:'block'} }}>
          <LeftImage />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 11.5, width: '100%' }}>
          <Typography variant='h2' sx={{ fontSize: '1.9rem !important', fontWeight: 700, color: '#1F1F1F' }} dangerouslySetInnerHTML={{ __html: t('employer_page.find_title') }}/>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {rightItems.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    padding: '.5rem .95rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: 'linear-gradient(283.95deg, #0049C6 -12.57%, #CDF4FF 126.88%)',
                      borderRadius: '19px',
                      padding: '.7rem',
                      boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <Icon icon={item.icon} fontSize={'2.5rem'} color={'#FFFFFF'} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ fontSize: '.95rem', fontWeight: 700, color: '#404040' }}>{item.title}</Typography>
                    <Typography sx={{ fontSize: '.95rem', fontWeight: 400, color: '#525252' }}>{item.detail}</Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
          <Link href='/register/employer' locale={locale}>
          <Button variant='contained' sx={{ textTransform: 'none', fontWeight: 700, fontSize: '16px', width:'100%' }}>
            {t('employer_page.hero_button')}
          </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

const LeftImage = () => {
  return (
    <Box sx={{ position: 'relative', top: '25px', left: '-4px' }}>
      <Box
        sx={{
          zIndex: 3,
          position: 'absolute',
          top: '225.75px',
          left: '302px',
          border: '1px solid #F0F0F0',
          borderRadius: '12px',
          padding: '8px 16px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Box component='img' src={'/images/icons/hat.png'} fontSize={'40px'} />
        <Typography sx={{ fontWeight: 600, fontSize: '16px', color: '#000000', whiteSpace: 'nowrap' }}>
          5,500+ Seafarer
        </Typography>
      </Box>

      <Box
        sx={{
          zIndex: 4,
          position: 'absolute',
          top: '426px',
          left: '10px',
          border: '1px solid #F0F0F0',
          borderRadius: '12px',
          padding: '8px 16px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          backgroundColor: '#FFFFFF'
        }}
      >
        <Box component='img' src={'/images/icons/suitcase.png'} fontSize={'40px'} />
        <Typography sx={{ fontWeight: 600, fontSize: '16px', color: '#000000', whiteSpace: 'nowrap' }}>
          2,000+ Office Talent
        </Typography>
      </Box>

      <Box
        sx={{
          zIndex: 3,
          width: '482px',
          height: '401px',
          position: 'absolute',
          top: '73px',
          left: '7px',
          borderRadius: '85px 85px 30px 48px',
          backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 72.68%, #FAFAFA 98.33%)'
        }}
      />

      <Box
        component='img'
        src={'/images/findSection/real-man.png'}
        alt={'engineer man'}
        sx={{
          zIndex: 2,
          position: 'absolute',
          height: 441,
          top: '20px',
          left: '138px',
          angle: '-180 deg'
        }}
      />

      <Box
        component='img'
        src={'/images/findSection/smiling-woman.png'}
        alt={'smiling woman'}
        sx={{
          zIndex: 1,
          position: 'absolute',
          top: '38px',
          //   left: '.69px',
          angle: '180deg'
        }}
      />

      <Box
        sx={{
          width: '482px',
          height: '401px',
          position: 'absolute',
          top: '73px',
          left: '7px',
          borderRadius: '85px 85px 30px 48px',
          backgroundImage: 'linear-gradient(180deg, rgba(133, 177, 215, 0.55) 0%, rgba(250, 250, 250, 0.55) 93.9%)'
        }}
      />
    </Box>
  )
}

export default FindSection
