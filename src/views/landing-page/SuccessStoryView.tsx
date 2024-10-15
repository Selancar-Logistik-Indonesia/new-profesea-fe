import { Avatar, Box, Button, Card, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CarouselEvent from './carouselevent'
import Link from 'next/link'
import { TFunction } from 'i18next'

const personData = (t: TFunction) => {
  return [
    {
      name: 'M. Daffa Atlantic Putra',
      position: 'Seafarer',
      company: 'PT KSM Indonesia',
      quotes: t('landing_page.success_story.quotes_1'),
      profile: '/images/seafarer-daffa.jpg'
    },
    {
      name: 'Tohom Yogi Emerson Simatupang',
      position: 'Crewing Manager',
      company: 'Global Lingkar Cemerlang',
      quotes: t('landing_page.success_story.quotes_2'),
      profile: '/images/glc-crewing-manager.jpg'
    },
    {
      name: 'Nanis Widiatiningsih',
      position: 'Director',
      company: 'Hugos Training Service',
      quotes: t('landing_page.success_story.quotes_3'),
      profile: '/images/hugos-director.png'
    }
  ]
}

const PersonCard = ({ item }: { item: any }) => {
  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          backgroundColor: 'rgba(191, 191, 191, 0.2)',
          padding: '24px',
          border: '1px solid white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          height: '100%',
          transition: '1s',
          '&:hover': { boxShadow: 3, transform: 'scale(1.05)' }
        }}
      >
        <Typography
          sx={{
            WebkitTextStrokeWidth: 1,
            WebkitTextStrokeColor: 'var(--Neutral-0, white)',
            color: 'transparent',
            fontFamily: 'Recoleta',
            lineHeight: 1,
            fontSize: 64,
            fontWeight: 700,
            mb: '-20px'
          }}
        >
          “
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: 20, md: 17 },
            fontWeight: 400,
            lineHeight: '21px',
            textAlign: 'center',
            flexGrow: 1
          }}
          dangerouslySetInnerHTML={{ __html: `"${item.quotes}"` }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            flexGrow: 1
          }}
        >
          <Avatar
            src={item.profile ?? '/images/no-image.jpg'}
            alt={item.name}
            sx={{ border: '3px solid white', width: '76px', height: '76px' }}
          >
            {item.name}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '4px' }}>
            <Typography sx={{ color: 'white', fontSize: { xs: 18, md: 14 }, fontWeight: 700 }}>{item.name}</Typography>
            <Typography sx={{ color: 'white', fontSize: { xs: 18, md: 14 }, fontWeight: 400 }}>
              {`${item.position}${item.company ? `, ${item.company}` : ''}`}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}

const SuccessStoryView = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isHidden = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Grid
      container
      sx={{
        backgroundColor: '#2E50A2',
        borderRadius: { xs: 0, md: '20px' },
        p: { xs: '24px', md: '64px 49px' },
        display: 'flex',
        flexWrap: { xs: null, md: 'nowrap' },
        alignItems: 'flex-start',
        gap: { xs: '24px', md: '32px' }
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: 'fit-content' },
          display: 'flex',
          flexShrink: 0,
          alignItems: 'flex-start',
          flexDirection: 'column',
          gap: { xs: '24px', md: '32px' }
        }}
      >
        <Typography
          sx={{ width: { xs: '100%', md: '185px' }, color: 'white', fontSize: { xs: 32, md: 40 }, fontWeight: 700 }}
        >
          {t('landing_page.success_story.title')}
        </Typography>
        {isHidden && (
          <Button
            component={Link}
            href='/register'
            variant='contained'
            size='large'
            sx={{
              width: { xs: '100%', md: 'fit-content' },
              backgroundColor: '#FFF',
              color: '#1F57C3',
              textTransform: 'none',
              fontWeight: 400,
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            {t('landing_page.success_story.button')}
          </Button>
        )}
      </Box>
      {isHidden ? (
        <Grid
          item
          container
          sx={{ flexGrow: 1, flexWrap: { xs: null, md: 'nowrap' }, gap: { xs: '24px', md: '32px' } }}
        >
          {personData(t).map((person, i) => (
            <PersonCard key={i} item={person} />
          ))}
        </Grid>
      ) : (
        <CarouselEvent>
          {personData(t).map((person, i) => (
            <PersonCard key={i} item={person} />
          ))}
        </CarouselEvent>
      )}
      {!isHidden && (
        <Button
          component={Link}
          href='/register'
          variant='contained'
          size='large'
          sx={{
            width: { xs: '100%', md: 'fit-content' },
            backgroundColor: '#FFF',
            color: '#1F57C3',
            textTransform: 'none',
            fontSize: 18,
            fontWeight: 400,
            '&:hover': { backgroundColor: '#f0f0f0' }
          }}
        >
          {t('landing_page.success_story.button')}
        </Button>
      )}
    </Grid>
  )
}

export default SuccessStoryView
