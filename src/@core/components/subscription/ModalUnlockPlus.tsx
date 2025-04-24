import { Icon } from '@iconify/react'
import { Box, Button, Checkbox, Dialog, DialogContent, FormControlLabel, IconButton, Link, Tooltip, Typography } from '@mui/material'
import Lottie from 'lottie-react'
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

const quizList: {question: string, detail: string, value:string}[] = [
  {
    question: 'Unlimited Active Job Postings',
    detail: 'Post as many jobs as you need. No limits.',
    value:'job_post'
  },
  {
    question: 'Boost Job Visibility',
    detail: 'Make one of your job appear at the top of search results and get more views to reach more candidates faster.',
    value:'boost_job'
  },
  {
    question: 'Message Candidates Directly',
    detail: 'Send messages to candidates directly — no middle steps.',
    value:'message_candidate'
  },
  {
    question: 'Offer Job Instantly',
    detail: 'Send offers right away to the candidates you want to hire, with no waiting.',
    value:'offer_job'
  },
  {
    question: 'Customized URLs',
    detail: 'Customize your profile link for easy sharing.',
    value:'customize_url'
  },
  {
    question: 'Access Smart Candidate Recommendations',
    detail: 'View a curated list of candidates matched to your job by skills and experience.',
    value:'smart_candidate'
  },
  {
    question: 'Manage Your Hiring Pipeline',
    detail: 'Track and manage candidates through every hiring stage — from application to hire.',
    value:'hiring_pipeline'
  },
  {
    question: 'Saved Candidates',
    detail: 'Save standout candidates to revisit anytime.',
    value:'saved_candidates'
  },
]

const ModalUnlockPlus = ({ text }: ModalProps) => {

  const [isOpenFirst, setIsOpenFirst] = useState(false)
  const [isOpenSecond, setIsOpenSecond] = useState(false)
  const [content, setContent] = useState<string>('content1')
  const [answers, setAnswers] = useState<string[]>([])


  const handleCloseFirst = () => {
    setContent('content1')
    setIsOpenFirst(false)
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAnswers([...answers, e.target.value])
    }else(
      setAnswers(answers.filter(answer => answer !== e.target.value))
    )
  }

  const handleCloseSecond = () => setIsOpenSecond(false)

  const handleSubmit = () => {
    console.log(answers)
    setIsOpenSecond(true)
    handleCloseFirst()
  }


  return (
    <>
    {/* unlock plus button */}
      <Button onClick={() => setIsOpenFirst(true)} sx={{ borderRadius: 2, backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)', textTransform:'none', display:'flex', alignItems:'center', gap:2 }}>
        <Icon icon={'ph:crown-simple-fill'} fontSize={18} color='#FFFFFF' />
        <Typography sx={{ ml: 1, fontSize: 14, fontWeight: 400, color: '#FFFFFF' }}>{text}</Typography>
      </Button>

        {/* main dialog  */}
      <Dialog scroll='body' open={isOpenFirst} onClose={handleCloseFirst} fullWidth maxWidth={'lg'} sx={{ '& .MuiDialog-paper': {borderRadius:'12px !important'} }}>
        {content === 'content1' ? (
          // content 1
          <DialogContent sx={{padding:0, borderRadius:'8px'}}>
          <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            {/* gambar */}
            <Box component={'img'} src='/images/plus_unlock.png' sx={{borderTopLeftRadius:12, borderBottomLeftRadius:12, objectFit:'cover', height:'100%', flex:1, display:{xs:'none', md:'block'}}}/>
            {/* text */}
            <Box sx={{padding:'30px 40px 40px 40px', backgroundColor:'#FFFFFF', display:'flex', flexDirection:'column'}}>
              <Icon onClick={handleCloseFirst} icon={'ph:x'} fontSize={24} style={{alignSelf:'flex-end', cursor:'pointer', marginBottom:'20px'}}/>
              <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
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
                    <Button onClick={() => setContent('content2')} variant='contained' sx={{backgroundImage:"linear-gradient(270deg, #2561EB 0%, #968BEB 100%)", textTransform:'none', fontSize:14}}>Unlock now</Button>
                    <Button onClick={handleCloseFirst} variant='text'  sx={{ textTransform:'none', fontSize:14, color:'#0B58A6'}}>Maybe later</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>) : (
          // content 2
          <DialogContent sx={{padding:0, borderRadius:'8px'}}>
          <Box sx={{display:'flex', flexDirection:'row-reverse', alignItems:'stretch', padding:'0px'}}>
            {/* gambar */}
            <Box component={'img'} src='/images/plus_unlock_2.png' sx={{borderTopRightRadius:12, borderBottomRightRadius:12, objectFit:'cover', width:'690px', height:'100%',display:{xs:'none', md:'block'}}}/>
            {/* text */}
            <Box sx={{padding:'40px', backgroundColor:'#FFFFFF', flex:1}}>
              <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Box sx={{display:'flex', flexDirection:'column', gap:10}}>
                  <Box sx={{display:'flex', flexDirection:'column', gap:4, justifyContent:'center', alignItems:'center'}}>
                    <Typography sx={{fontSize:14, fontWeigth:700, color:'#1F1F1F'}}>One step closer to unlock Profesea Plus!</Typography>
                    <Typography sx={{fontSize:32, fontWeigth:700, color:'#1F1F1F', textAlign:'center'}}>Which features do you think will be most useful for you?</Typography>
                    <Typography sx={{fontSize:16, fontWeigth:400, color:'#1F1F1F'}}>Please select 3 or more features from the list:</Typography>
                  </Box>

                  <Box sx={{display:'flex', flexDirection:'column'}}>
                    {quizList.map((item, i)=> {
                      return (
                        <Box key={i} sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                          <Box>
                            <FormControlLabel control={<Checkbox onChange={(e) => handleCheck(e)}/>} label={item.question} sx={{fontSize:16, fontWeight:400, color:'##1F1F1F'}}/>
                          </Box>
                          <Tooltip title={item.detail}><Icon icon={'ph:info'} fontSize={20}/></Tooltip>
                        </Box>
                      )
                    })}
                  </Box>

                  <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                    <Button onClick={() => handleSubmit()} disabled={answers.length < 3} variant='contained' sx={{backgroundImage:"linear-gradient(270deg, #2561EB 0%, #968BEB 100%)", textTransform:'none', fontSize:14}}>Continue</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        )}
      </Dialog>

      {/* congrats dialog */}
      <Dialog scroll='body' open={isOpenSecond} onClose={handleCloseSecond} fullWidth maxWidth={'xs'} sx={{ '& .MuiDialog-paper': {borderRadius:'12px !important'} }}>
        <DialogContent sx={{padding:0}}>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            {/* image */}
            <Box sx={{display:'flex', flexDirection:'column', backgroundImage:'linear-gradient(180deg, #2662EC 0%, #163886 100%)', alignItems:'center'}}>
              <IconButton onClick={handleCloseSecond} sx={{alignSelf:'flex-end'}}>
                <Icon icon={'ph:x'} fontSize={20} color='#FFFFFF'/>
              </IconButton>
              <Box sx={{position:'relative'}}>
                <Lottie animationData={require('/public/animated-images/spark.json')} style={{position:'absolute', zIndex:1}}/>
                <Lottie animationData={require('/public/animated-images/confetti.json')} style={{position:'absolute', zIndex:1}}/>
                <Box component={'img'} src="/images/hooray.png" sx={{zIndex:2, position:'relative'}}/>
              </Box>
            </Box>
            {/* text */}
            <Box sx={{display:'flex', flexDirection:'column', gap:4, alignItems:'center', padding:'10px 16px'}}>
              <Typography sx={{fontSize:24, fontWeight:700, color:'#1F1F1F'}}>Congratulations!</Typography>
              <Typography sx={{fontSize:14, fontWeight:400, color:'#1F1F1F', textAlign:'center'}}>All exclusive features unlocked — enjoy the full potential Profesea!</Typography>
              <Button onClick={handleCloseSecond} variant='contained' size='small' sx={{textTransform:'none', color:'#FFFFFF', fontSize:14, fontWeight:400, width:'100%'}}>Continue</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModalUnlockPlus
