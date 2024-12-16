import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdExpandMore } from 'react-icons/md'
import { useTheme } from '@mui/material/styles'
import FormPersonalData from './FormPersonalData'
import FormSocialMedia from './FormSocialMedia'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import FormPreference from './FormPreference'

const AccordionTabGeneral: React.FC = () => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const userLocalStorage = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  const [loadingUser, setLoadingUser] = useState(false)

  const fetchUser = () => {
    setLoadingUser(true)
    HttpClient.get(AppConfig.baseUrl + '/user/' + userLocalStorage.id)
      .then(response => {
        const resUser = response.data.user as IUser
        setUser(resUser)
      })
      .finally(() => {
        setLoadingUser(false)
      })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      <Accordion sx={{ boxShadow: 'none' }} defaultExpanded>
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
      <Accordion sx={{ boxShadow: 'none' }} defaultExpanded>
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

      {user?.role !== 'Company' && (
        <Accordion sx={{ boxShadow: 'none' }} defaultExpanded>
          <AccordionSummary
            expandIcon={<MdExpandMore size={24} />}
            aria-controls='panel3-content'
            id='panel3-header'
            sx={{ color: '#32497A', fontSize: isMobile ? '14px' : '16px', fontWeight: 700, fontFamily: 'Figtree' }}
            onClick={() => setShow3(!show3)}
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
                Preferences
              </Typography>
              {show3 && (
                <Typography sx={{ fontFamily: 'Figtree', fontSize: '14px', fontWeight: 400 }}>
                  See your job preference so company can find the perfect fit
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>{loadingUser ? 'Loading...' : <FormPreference dataUser={user} />}</AccordionDetails>
        </Accordion>
      )}
    </>
  )
}

export default AccordionTabGeneral
