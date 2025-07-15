// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { Button, Link as MuiLink } from '@mui/material'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Error = ({ error }: { statusCode: number; error?: any }) => {
  const { t } = useTranslation()
  if (error) {
    console.error('An error occurred:', error)
  }

  return (
    <Box className='content-center'>
      <Box
        sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}
      >
        <Image alt='error-illustration' src='/images/pages/maintenance.svg' width={350} height={350} />
        <BoxWrapper>
          <Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.5rem !important' }}>
            {t('default_error_page.title')}
          </Typography>
          <Typography variant='body2' sx={{ fontSize: '20px', fontWeight: 400 }}>
            {t('default_error_page.description_1')}
          </Typography>
          <Typography variant='body2' sx={{ fontSize: '20px', fontWeight: 400 }}>
            {t('default_error_page.description_2') + ' '}
            <MuiLink href='mailto:hello@profesea.id' color='#32497A' underline='hover'>
              hello@profesea.id
            </MuiLink>
          </Typography>
          <Button href='/' component={Link} variant='contained' sx={{ px: 5.5, mt: 2.5 }}>
            Back to Home
          </Button>
        </BoxWrapper>
      </Box>
    </Box>
  )
}

Error.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Error.getInitialProps = async ({ res, err }: { res?: any; err?: any }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500

  return { statusCode, error: err }
}

export default Error
