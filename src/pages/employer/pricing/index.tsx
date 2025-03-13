import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
import FooterView from 'src/views/landing-page/footerView'

const Main = () => {
  return (
    <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <Box
        sx={{
          backgroundImage: 'linear-gradient(180deg, #FAFAFA 2.44%, rgba(161, 191, 234, 0.66) 38.56%, #3777D6 86.63%)',
          padding: '4rem 7.1rem',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            padding: '2.4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            textAlign: 'center'
          }}
        >
          <Typography sx={{ fontSize: '1.9rem', fontWeight: 700, color: '#404040' }}>
            Rekrutmen Lebih Efisien,{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(283.95deg, #0049C6 -12.57%, #CDF4FF 126.88%)',
                color: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Biaya Lebih Hemat
            </span>
          </Typography>
          <Typography sx={{ fontSize: '.95rem', fontWeight: 400, color: '#5E5E5E', width:'60%' }}>
            Jangkau kandidat terbaik tanpa menguras anggaran. Kami menawarkan solusi rekrutmen fleksibel yang dirancang
            untuk industri maritim & logistik.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          marginBottom: 20,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 2px 10px 0px #00000014',
          padding: '2.6rem',
          gap: 4,
          borderRadius: '14px',
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          width:'70%',
        }}
      >
        {/* Basic */}
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #F0F0F0',
            borderRadius: '12px',
            boxShadow: '0px 2px 10px 0px #00000014',
            flex:1
          }}
        >
          <Box sx={{borderBottom:'1px solid #E7E7E7',display: 'flex', flexDirection: 'column', gap: 3.9 }}>
          <Box sx={{ padding: '.6rem', backgroundColor: '#FFFFFF' ,borderRadius:'12px 12px 0px 0px'}}>
                <Typography sx={{ fontSize: '.6rem', fontWeight: 700, color: 'transparent', textAlign:'center'}}>a</Typography>
            </Box>
            <Box sx={{ padding: '0px .95rem', display: 'flex', flexDirection: 'column', gap: 3.9 }}>
              <Typography sx={{ fontSize: '.95rem', fontWeight: 700, color: '#1F1F1F' }}>Basic</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1F1F1F' }}>Rp. 750.000</Typography>
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#666666' }}>/month</Typography>
              </Box>
              <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#404040' }}>
                Unlimited Access to Advanced Features.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ padding: '.7rem' }}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/red cross icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Spotlight Posts</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/red cross icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Access candidate recommendations</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Up to 5 active job posts</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Direct communication with candidates</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Unlimited candidate saves</Typography>
            </Box>
          </Box>
          <Box sx={{padding:'1.2rem', borderTop:'1px solid #E7E7E7'}}>
            <Button variant='contained' sx={{textTransform:'none', width:'100%'}}>Unlock more opportunities</Button>
          </Box>
        </Box>

        {/* Premium */}
        <Box
          sx={{
            backgroundImage:'linear-gradient(357.5deg, rgba(37, 97, 235, 0.18) 20.56%, rgba(150, 139, 235, 0.0396) 71.04%)',
            border: '1px solid #F0F0F0',
            borderRadius: '12px',
            boxShadow: '0px 2px 10px 0px #00000014',
            flex:1
          }}
        >
          <Box sx={{borderBottom:'1px solid #E7E7E7',display: 'flex', flexDirection: 'column', gap: 3.9 }}>
            <Box sx={{ padding: '.6rem', backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)', borderRadius:'12px 12px 0px 0px'}}>
                <Typography sx={{ fontSize: '.6rem', fontWeight: 700, color: '#ffffff', textAlign:'center'}}>Best Value</Typography>
            </Box>
            <Box sx={{ padding: '0px .95rem', display: 'flex', flexDirection: 'column', gap: 3.9 }}>
              <Typography sx={{ fontSize: '.95rem', fontWeight: 700, color: '#1F1F1F' }}>Basic</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#1F1F1F' }}>Rp. 7.500.000</Typography>
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#666666' }}>/month</Typography>
              </Box>
              <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#404040' }}>
                Unlimited Access to Advanced Features.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ padding: '.7rem' }}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>3 Spotlight Posts</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Access to candidate recommendations</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Up to <b>20</b> active job posts</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Direct communication with candidates</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 4, padding:'1rem 1.2rem', alignItems:'center'}}>
                <Box component='img' src={'/images/icons/green check icon.png'} width={'20px'} height={'20px'} />
                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, color: '#1F1F1F' }}>Unlimited candidate saves</Typography>
            </Box>
          </Box>
          <Box sx={{padding:'1.2rem', borderTop:'1px solid #E7E7E7'}}>
            <Button variant='contained' sx={{textTransform:'none', width:'100%'}}>Unlock more opportunities</Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: '80vh' }}></Box>
      <FooterView />
    </Box>
  )
}

Main.guestGuard = false
Main.authGuard = false
Main.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Main
