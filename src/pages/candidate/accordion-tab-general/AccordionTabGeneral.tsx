import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import { useTheme } from '@mui/material/styles'
import FormPersonalData from './FormPersonalData'
import FormSocialMedia from './FormSocialMedia'

interface IAccordionTabGeneral {}

const AccordionTabGeneral: React.FC<IAccordionTabGeneral> = () => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  return (
    <>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<MdExpandMore size={24} />}
          aria-controls='panel1-content'
          id='panel1-header'
          onClick={() => setShow1(!show1)}
        >
          <Box>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: 700,
                fontFamily: 'Figtree'
              }}
            >
              Personal Data
            </Typography>
            {show1 && (
              <Typography sx={{ fontFamily: 'Figtree', fontSize: '14px', fontWeight: 400 }}>
                Fill in the data according to your ID card.
              </Typography>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormPersonalData />
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<MdExpandMore size={24} />}
          aria-controls='panel2-content'
          id='panel2-header'
          onClick={() => setShow2(!show2)}
        >
          <Box>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: 700,
                fontFamily: 'Figtree'
              }}
            >
              Social Media Info
            </Typography>
            {show2 && (
              <Typography sx={{ fontFamily: 'Figtree', fontSize: '14px', fontWeight: 400 }}>
                Fulfill you Social Media Info
              </Typography>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormSocialMedia />
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<MdExpandMore size={24} />}
          aria-controls='panel3-content'
          id='panel3-header'
          sx={{ color: '#32497A', fontSize: isMobile ? '14px' : '16px', fontWeight: 700, fontFamily: 'Figtree' }}
        >
          Preferences
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </>
  )
}

export default AccordionTabGeneral
