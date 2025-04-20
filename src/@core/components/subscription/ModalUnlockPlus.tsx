import { Icon } from '@iconify/react'
import { Box, Button, Dialog, DialogContent, Link, Typography } from '@mui/material'
import { useState } from 'react'

type ModalProps = {
  text: string
}

type BenefitListType = {
  icon: string,
  detail: string
}

const benefitsList: BenefitListType[] = [
  {
    icon: 'ph:note-pencil',
    detail: 'Unlimited Job Postings'
  },
  {
    icon: 'ph:rocket-launch',
    detail: 'Boosted Job Visibility'
  },
  {
    icon: 'ph:target',
    detail: 'Get smart candidate & pool recommendations'
  },
  {
    icon: 'ph:chart-bar',
    detail: 'Hiring Pipeline Control'
  },
  {
    icon: 'ph:chat-circle-dots',
    detail: 'Direct Messaging & Instant Offers'
  },
]

const quizList = [
  {
    
  }
]

const ModalUnlockPlus = ({ text }: ModalProps) => {

  const [isOpenFirst, setIsOpenFirst] = useState(false)
  const [isOpenSecond, setIsOpenSecond] = useState(false)


  const handleCloseFirst = () => setIsOpenFirst(false)


  return (
    <>
    {/* unlock plus button */}
      <Button onClick={() => setIsOpenFirst(true)} sx={{ borderRadius: 2, backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)', textTransform:'none', display:'flex', alignItems:'center', gap:2 }}>
        <Icon icon={'ph:crown-simple-fill'} fontSize={18} color='#FFFFFF' />
        <Typography sx={{ ml: 1, fontSize: 14, fontWeight: 400, color: '#FFFFFF' }}>{text}</Typography>
      </Button>

        {/* main dialog 1 */}
      <Dialog open={isOpenFirst} onClose={handleCloseFirst} fullWidth maxWidth={'lg'} sx={{ '& .MuiDialog-paper': {borderRadius:'12px !important'} }}>
        <DialogContent sx={{padding:0, borderRadius:'8px'}}>
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            {/* gambar */}
            <Box component={'img'} src='/images/plus_unlock.png' sx={{borderTopLeftRadius:12, borderBottomLeftRadius:12, objectFit:'contain', height:'100%'}}/>
            {/* text */}
            <Box sx={{padding:'40px', backgroundColor:'#FFFFFF'}}>
              <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Icon icon={''}/>
                <Box sx={{display:'flex', flexDirection:'column', gap:12}}>
                  <Box>
                    <Typography sx={{fontSize:32, fontWeigth:700, color:'#1F1F1F'}}>Try Profesea Plus for <span style={{backgroundImage:'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)', backgroundClip:'text', color:'transparent'}}>Free</span>!</Typography>
                    <Typography sx={{fontSize:16, fontWeigth:400, color:'#666666'}}>Everything you need to hire smarter — zero cost.</Typography>
                  </Box>

                  <Box sx={{display:'flex', flexDirection:'column', gap:4}}>
                    {benefitsList.map((item, i)=> {
                      return (
                        <Box key={i} sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:2}}>
                          <Icon icon={item.icon} color='#32497A' fontSize={24}/>
                          <Typography sx={{fontSize:16, fontWeight:400, color:'#32497A'}}>{item.detail}</Typography>
                        </Box>
                      )
                    })}
                  </Box>

                  <Typography sx={{fontSize:16, fontWeigth:400, color:'#666666'}}>Unlock premium hiring tools. No cost, no commitment. <Link href='#' sx={{color:'#2561EB', textDecoration:'underline'}}>Learn more.</Link></Typography>

                  <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                    <Button variant='contained' sx={{backgroundImage:"linear-gradient(270deg, #2561EB 0%, #968BEB 100%)", textTransform:'none', fontSize:14}}>Unlock now</Button>
                    <Button variant='text'  sx={{ textTransform:'none', fontSize:14, color:'#0B58A6'}}>Maybe later</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalUnlockPlus
