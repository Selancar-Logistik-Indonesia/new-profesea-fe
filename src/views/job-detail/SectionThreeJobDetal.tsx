import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import Job from 'src/contract/models/job'
// import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useAuth } from 'src/hooks/useAuth'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

interface ISectionThreeJobDetailProps {
  jobDetail: Job | null
  license?: any[]
}

const SectionThreeJobDetail: React.FC<ISectionThreeJobDetailProps> = ({ jobDetail, license }) => {
  const router = useRouter()
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const { user } = useAuth()
  const companyLicenses: any[] = jobDetail?.license
  const isUser = user && user.team_id === 2

  const findLicensesFromUser = (license: any[] | undefined, companyLicenses: any[]) => {
    const match: any[] = []
    const missing: any[] = []

    companyLicenses.forEach(l => {
      const foundUserLicense =
        l.parent === 'COC' ? license?.find(u => u.coc_id === l.id) : license?.find(u => u.cop_id === l.id)

      if (foundUserLicense) {
        match.push(l)
      } else {
        const isMissing = missing.some(m => m.id === l.id)

        if (!isMissing) {
          missing.push(l)
        }
      }
    })

    return {
      match,
      missing
    }
  }

  const renderHowYouMatch = (missing: any[], match: any[]) => {
    // full match
    if (missing.length === 0) {
      return 'full'
    }

    // partial match
    if (match.length != 0 && missing.length != 0) {
      return 'partial'
    }

    // zero match
    if (match.length === 0 && missing.length != 0) {
      return 'zero'
    }
  }

  const renderCheckList = (licenseId: any, license: any[], type: any, index: any, title: any) => {
    const check =
      type === 'COC'
        ? license.findIndex((l: any) => l.coc_id === licenseId)
        : license.findIndex((l: any) => l.cop_id === licenseId)

    if (check !== -1) {
      return (
        <Typography
          key={index}
          sx={{ color: '#4CAF50', display: 'flex', alignItems: 'center', gap: 2 }}
          ml='0.5rem'
          mt='0.2rem'
          fontSize={10}
        >
          <Icon icon='ion:checkbox-outline' color='#4CAF50' fontSize={'18px'} /> {title}
        </Typography>
      )
    }

    return (
      <Typography
        key={index}
        sx={{ color: 'text.primary', display: 'flex', alignItems: 'center', gap: 2 }}
        ml='0.5rem'
        mt='0.2rem'
        fontSize={10}
      >
        <Icon icon='carbon:checkbox' color='#32487A' fontSize={'18px'} /> {title}
      </Typography>
    )
  }

  const match = findLicensesFromUser(license, companyLicenses).match
  const missing = findLicensesFromUser(license, companyLicenses).missing

  if (isUser && license?.length != 0 && jobDetail?.license.length != 0) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid ${
              renderHowYouMatch(missing, match) === 'full'
                ? '#29CC6A'
                : renderHowYouMatch(missing, match) === 'partial'
                ? '#FF9800'
                : '#F22'
            }`,
            background: `${
              renderHowYouMatch(missing, match) === 'full'
                ? '#F4FEF2'
                : renderHowYouMatch(missing, match) === 'partial'
                ? '#FEFBF2'
                : '#FEF2F2'
            }`
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: `${
                    renderHowYouMatch(missing, match) === 'full'
                      ? '#4CAF50'
                      : renderHowYouMatch(missing, match) === 'partial'
                      ? '#FF9800'
                      : '#F22'
                  }`
                }}
              >
                {match.length} / {companyLicenses.length} Certificate Match
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#525252' }}>
                {renderHowYouMatch(missing, match) === 'full'
                  ? "Your Certifications Match! You're ready for the job!"
                  : renderHowYouMatch(missing, match) === 'partial'
                  ? 'Find out if you qualify for this job. Missing a certification? Complete it today!'
                  : 'Find out if you qualify for this job. Missing a certification? Complete it today!'}
              </Typography>
            </Box>
            <Button
              variant='contained'
              color='primary'
              sx={{
                width: isMobile ? '100%' : '35%',
                textTransform: 'capitalize',
                alignSelf: 'flex-start'
              }}
              size='small'
              onClick={() => router.push('/candidate')}
            >
              Complete Your Profile
            </Button>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {companyLicenses.map((c, i) => {
                return renderCheckList(c?.id, license as unknown as any[], c.parent, i, c?.title)
              })}
            </Box>
          </Box>
        </Box>

        {/* {isUser && companyLicenses.length !== 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingBottom: '10px',
              borderBottom: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <Box>
              <Typography mt='0.2rem' sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={16}>
                <strong>See How You match</strong>
              </Typography>
            </Box>
            <Box>
              <Typography mt='0.2rem' sx={{ fontWeight: '400' }} fontSize={14}>
                Easily track your progress with our certificate matching feature. Find out how well your certifications
                align with the job's requirements
              </Typography>
            </Box>
            <Grid ml='0.7rem' container>
              <Grid item>
                <Icon icon='clarity:certificate-solid' color='#32487A' fontSize={'35px'} />
              </Grid>
              <Grid item xs={11} sx={{ display: 'flex', alignItems: 'center' }}>
                {renderHowYouMatch(missing, match, companyLicenses)}
              </Grid>
            </Grid>
          </Box>
        )}
  
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingBottom: '10px',
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          {companyLicenses.length != 0 && (
            <Box>
              <Typography mt='0.2rem' sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={16}>
                <strong>Mandatory Certificates</strong>
              </Typography>
            </Box>
          )}
  
          {isUser && (
            <Grid ml='0.7rem' container>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {companyLicenses.map((c, i) => {
                  return renderCheckList(c?.id, license as unknown as any[], c.parent, i, c?.title)
                })}
              </Box>
            </Grid>
          )}
  
          {isUser && match?.length == 0 && companyLicenses.length !== 0 && (
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#d5e7f7',
                  py: '10px',
                  gap: '5px'
                }}
              >
                <Box>
                  <Icon icon='lets-icons:lamp' color='#32487A' fontSize={'20px'} />
                </Box>
                <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                  Add certificates you have to your profile to meets the criteria required by the company.
                </Typography>
                <Button variant='text' LinkComponent={Link} href='/candidate' sx={{ px: 0 }}>
                  <Typography sx={{ color: '#0a66c2', textTransform: 'capitalize' }} fontSize={12}>
                    Add certificates
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </Box> */}
      </>
    )
  } else {
    return null
  }
}

export default SectionThreeJobDetail
