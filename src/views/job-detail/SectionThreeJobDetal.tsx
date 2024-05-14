import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import Job from 'src/contract/models/job'
import Link from 'next/link'
import { Icon } from '@iconify/react'

interface ISectionThreeJobDetailProps {
  jobDetail: Job | null
  license: any[] | null
}

const SectionThreeJobDetail: React.FC<ISectionThreeJobDetailProps> = ({ jobDetail, license }) => {
  const companyLicenses: any[] = jobDetail?.license

  const findLicensesFromUser = (license: any[] | null, companyLicenses: any[]) => {
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

  const match = findLicensesFromUser(license, companyLicenses).match
  const missing = findLicensesFromUser(license, companyLicenses).missing

  return (
    <>
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
            <strong>How You match</strong>
          </Typography>
        </Box>
        <Grid ml='0.7rem' container>
          <Grid item>
            <Icon icon='clarity:certificate-solid' color='#32487A' fontSize={'35px'} />
          </Grid>
          <Grid item xs={11} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: 'text.primary', fontWeight: 900 }} ml='0.5rem' mt='0.2rem' fontSize={12}>
              <Box component='span' sx={missing.length != 0 ? { color: 'error.dark' } : {}}>
                {match.length}
              </Box>{' '}
              Certificates match your profile
            </Typography>
          </Grid>
        </Grid>
      </Box>
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
            <strong>Mandatory Certificates</strong>
          </Typography>
        </Box>
        <Grid ml='0.7rem' container>
          <Grid item>
            <Icon icon='el:check' color='#32487A' fontSize={'18px'} />
          </Grid>
          <Grid item xs={11}>
            <Typography sx={{ color: 'text.primary', fontWeight: 900 }} ml='0.5rem' mt='0.2rem' fontSize={12}>
              {companyLicenses.length} Certificates required by the company
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {companyLicenses.map((c, i) => {
                return (
                  <Typography key={i} sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={10}>
                    {c?.title} |
                  </Typography>
                )
              })}
            </Box>
          </Grid>
        </Grid>
        {missing.length > 0 && (
          <Grid ml='0.7rem' container>
            <Grid item>
              <Icon icon='healthicons:alert-negative' color='#d32f2f' fontSize={'18px'} />
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ color: 'text.primary', fontWeight: 900 }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                <Box component='span' sx={{ color: 'error.dark' }}>
                  {missing.length}
                </Box>{' '}
                Certificates missing on your profile
              </Typography>
              <Box sx={{ display: 'flex' }}>
                {companyLicenses.map((license, i) => {
                  return (
                    <Typography key={i} sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={10}>
                      {license?.title} |
                    </Typography>
                  )
                })}
              </Box>
            </Grid>
          </Grid>
        )}
        {license?.length == 0 && (
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
      </Box>
    </>
  )
}

export default SectionThreeJobDetail
