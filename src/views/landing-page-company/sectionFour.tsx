import { Grid, Box, Collapse, IconButton, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

const Accordion = ({
  summary,
  list,
  items,
  isOpen,
  onClick
}: {
  summary: string
  list?: boolean
  items: any[]
  isOpen: boolean
  onClick: () => void
}) => {
  return (
    <Grid item xs={12} md={10}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={24} fontWeight={700} mx={2}>
            {summary}
          </Typography>
          <IconButton onClick={onClick}>
            {isOpen ? (
              <Icon icon='flowbite:circle-minus-outline' fontSize={32} />
            ) : (
              <Icon icon='flowbite:circle-plus-outline' fontSize={32} />
            )}
          </IconButton>
        </Box>
        <Collapse in={isOpen}>
          {list ? (
            items.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 1, ml: 2 }}>
                <Icon icon='mdi:dot' fontSize={16} />
                <Typography
                  align='left'
                  sx={{ fontSize: 16, fontWeight: 400, maxWidth: '90%', ml: 1 }}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </Box>
            ))
          ) : (
            <Box
              sx={{
                ml: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '90%'
              }}
            >
              {items.map((item, index) => (
                <Typography
                  key={index}
                  align='left'
                  sx={{ fontSize: 16, fontWeight: 400, mt: 1 }}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </Box>
          )}
        </Collapse>
      </Box>
    </Grid>
  )
}

const Background = (props: { img: string; [key: string]: any }) => {
  const { img, ...rest } = props

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: '100% 100%',
        backgroundRepeat: 'no-repeat',
        ...rest
      }}
    />
  )
}

const SectionFour = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('lg'))

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleAccordionClick = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index))
  }

  return (
    <Grid item container sx={{ position: 'relative', px: 10, pt: { xs: 10, lg: 20 }, pb: { xs: 20, md: 40 } }}>
      <Typography sx={{ mb: 6, width: '100%' }} color={'black'} fontSize={32} fontWeight='700' align={'center'}>
        FAQ
      </Typography>
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', zIndex: 4 }}>
        <Accordion
          summary={t('landing_company_faq_1')}
          items={[t('landing_company_faq_1_1'), t('landing_company_faq_1_2')]}
          isOpen={openIndex === 0}
          onClick={() => handleAccordionClick(0)}
        />
        <Accordion
          list
          summary={t('landing_company_faq_2')}
          items={[
            t('landing_company_faq_2_1'),
            t('landing_company_faq_2_2'),
            t('landing_company_faq_2_3'),
            t('landing_company_faq_2_4')
          ]}
          isOpen={openIndex === 1}
          onClick={() => handleAccordionClick(1)}
        />
        <Accordion
          list
          summary={t('landing_company_faq_3')}
          items={[
            t('landing_company_faq_3_1'),
            t('landing_company_faq_3_2'),
            t('landing_company_faq_3_3'),
            t('landing_company_faq_3_4'),
            t('landing_company_faq_3_5'),
            t('landing_company_faq_3_6')
          ]}
          isOpen={openIndex === 2}
          onClick={() => handleAccordionClick(2)}
        />
        <Accordion
          summary={t('landing_company_faq_4')}
          items={[t('landing_company_faq_4_1')]}
          isOpen={openIndex === 3}
          onClick={() => handleAccordionClick(3)}
        />
        <Accordion
          summary={t('landing_company_faq_5')}
          items={[t('landing_company_faq_5_1')]}
          isOpen={openIndex === 4}
          onClick={() => handleAccordionClick(4)}
        />
        <Accordion
          summary={t('landing_company_faq_6')}
          items={[t('landing_company_faq_6_1')]}
          isOpen={openIndex === 5}
          onClick={() => handleAccordionClick(5)}
        />
      </Grid>
      <Background
        top={0}
        right={0}
        backgroundPosition='100% 0%'
        width={{ xs: '200px', md: '300px' }}
        height={{ xs: '200px', md: '300px' }}
        zIndex={-3}
        img='/images/backgrounds/company-background-dots2.png'
      />
      {!isMd && (
        <Background
          bottom={0}
          left={0}
          backgroundPosition='0% 100%'
          width={{ xs: '400px', md: '600px' }}
          height={{ xs: '300px', md: '500px' }}
          zIndex={-1}
          img='/images/backgrounds/company-gelombang-kiri.png'
        />
      )}
      <Background bottom={0} right={0} zIndex={-1} img='/images/backgrounds/company-gelombang-kanan.png' />
    </Grid>
  )
}

export default SectionFour
