import Icon from 'src/@core/components/icon'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
  Box,
  Fade,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const FaqSection = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 11, padding: '5.7rem 7.1rem' }}>
      <Typography
        variant='h2'
        sx={{ fontSize: '2rem !important', fontWeight: 700, color: '#404040', textAlign: 'center' }}
      >
        Frequently Asked Question
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {Array.from({ length: 6 }, (_, index) => (
          <AccordionItem key={index} num={index} />
        ))}
      </Box>
    </Box>
  )
}

const AccordionItem = ({ num }: { num: number }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: '12px !important',
        backgroundColor: isOpen ? '#F2F8FE' : '#FFFFF',
        border: '1px solid #E7E7E7',
        '&, & > *': { transition: ' .5s ease !important' }
      }}
    >
      <AccordionSummary
        onClick={() => setIsOpen(!isOpen)}
        expandIcon={<Icon icon={'weui:arrow-outlined'} fontSize={'1.5rem !important'} rotate={45} />}
        sx={{
          padding: 4,
          borderRadius: '12px !important',
          [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
            transition: '.6s ease-in-out !important'
          },
          
        }}
      >
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: isOpen ? '#32497A' : '#404040' }}>
          {t(`employer_page.landing_company_faq_${num + 1}`)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ backgroundColor: '#FFFFFF !important', borderRadius: '0px 0px 12px 12px', padding: '1.5rem !important' }}
      >
        <Fade in={isOpen} timeout={700}>
          <Typography
            sx={{ fontSize: 16, fontWeight: 400, color: '#404040' }}
            dangerouslySetInnerHTML={{ __html: t(`employer_page.landing_company_faq_${num + 1}_1`) }}
          />
        </Fade>
      </AccordionDetails>
    </Accordion>
  )
}

export default FaqSection
