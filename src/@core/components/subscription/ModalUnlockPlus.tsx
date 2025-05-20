import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Drawer,
  FormControlLabel,
  IconButton,
  Link,
  Slide,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import Lottie from 'lottie-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { HttpClient } from 'src/services'

type ModalProps = {
  text: string
}

type BenefitListType = {
  icon: string
  detail: string
}

const benefitsList: BenefitListType[] = [
  {
    icon: 'ph:note-pencil',
    detail: 'Unlimited Job Postings'
  },
  {
    icon: 'ph:rocket-launch',
    detail: 'Get your jobs seen by more candidate'
  },
  {
    icon: 'ph:target',
    detail: 'Get smart candidate & pool recommendations'
  },
  {
    icon: 'ph:chart-bar',
    detail: 'End-to-end control of your hiring process  '
  },
  {
    icon: 'ph:chat-circle-dots',
    detail: 'Direct Messaging & Instant Offers'
  }
]

const quizList: { question: string; detail: string; value: string }[] = [
  {
    question: 'Unlimited Active Job Postings',
    detail: 'Post as many jobs as you need. No limits.',
    value: 'UJP'
  },
  {
    question: 'Boost Job Visibility',
    detail:
      'Make one of your job appear at the top of search results and get more views to reach more candidates faster.',
    value: 'BJV'
  },
  {
    question: 'Message Candidates Directly',
    detail: 'Send messages to candidates directly — no middle steps.',
    value: 'MCD'
  },
  {
    question: 'Offer Job Instantly',
    detail: 'Send offers right away to the candidates you want to hire, with no waiting.',
    value: 'OJI'
  },
  {
    question: 'Customized URLs',
    detail: 'Customize your profile link for easy sharing.',
    value: 'CURL'
  },
  {
    question: 'Access Smart Candidate Recommendations',
    detail: 'View a curated list of candidates matched to your job by skills and experience.',
    value: 'SR'
  },
  {
    question: 'Manage Your Hiring Pipeline',
    detail: 'Track and manage candidates through every hiring stage — from application to hire.',
    value: 'MHP'
  },
  {
    question: 'Saved Candidates',
    detail: 'Save standout candidates to revisit anytime.',
    value: 'SC'
  }
]

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />
})

const ModalUnlockPlus = ({ text }: ModalProps) => {
  const router = useRouter()
  const isMobileMd = useMediaQuery(useTheme().breakpoints.down('md'))
  const isMobileSm = useMediaQuery(useTheme().breakpoints.down('sm'))

  const [isOpenFirst, setIsOpenFirst] = useState(false)
  const [isOpenSecond, setIsOpenSecond] = useState(false)
  const [content, setContent] = useState<string>('content1')
  const [answers, setAnswers] = useState<string[]>([])

  const handleCloseFirst = (e: React.MouseEvent) => {
    e.stopPropagation()
    setContent('content1')
    setIsOpenFirst(false)
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.target.checked) {
      setAnswers([...answers, e.target.value])
    } else setAnswers(answers.filter(answer => answer !== e.target.value))
  }

  const handleCloseSecond = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpenSecond(false)
    router.reload()
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await HttpClient.post('/transaction/v2/create', {
        payment_type: 'FREE',
        purchase_item: 'PLS-3M-TRIAL',
        purchase_type: 'subscription',
        user_type: 'company'
      })

      await HttpClient.post('/feedback/user-feedback', {
        section: 'Feedback Company 1',
        feedback_codes: answers,
        user_type: 'company'
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsOpenSecond(true)
      handleCloseFirst(e)

      setAnswers([])
    }
  }

  return (
    <>
      {/* unlock plus button */}
      <Button
        onClick={e => {
          setIsOpenFirst(true)
          e.stopPropagation()
        }}
        sx={{
          borderRadius: 2,
          backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          whiteSpace: 'nowrap'
        }}
      >
        <Icon icon={'ph:crown-simple-fill'} fontSize={18} color='#FFFFFF' />
        <Typography sx={{ ml: 1, fontSize: 14, fontWeight: 400, color: '#FFFFFF' }}>{text}</Typography>
      </Button>

      {/* main dialog  */}
      <Dialog
        scroll='body'
        open={isOpenFirst && !isMobileMd}
        onClose={handleCloseFirst}
        fullWidth
        maxWidth={'md'}
        sx={{ '& .MuiDialog-paper': { borderRadius: '12px !important' } }}
      >
        {content === 'content1' ? (
          // content 1
          <DialogContent sx={{ padding: 0, borderRadius: '8px' }} onClick={e => e.stopPropagation()}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'strech' }}>
              {/* gambar */}
              <Box
                component={'img'}
                src='/images/plus_unlock.png'
                sx={{
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                  objectFit: 'cover',
                  width: '50%',
                  height: 'auto',
                  display: { xs: 'none', md: 'block' }
                }}
              />
              {/* text */}
              <Box
                sx={{
                  padding: '30px 40px 40px 40px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Icon
                  onClick={handleCloseFirst}
                  icon={'ph:x'}
                  fontSize={20}
                  style={{ alignSelf: 'flex-end', cursor: 'pointer', marginBottom: 2 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <Box>
                      <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#1F1F1F' }}>
                        Thousands of Recruiters Are Already Using These Tools
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeighy: 400, color: '#666666' }}>
                        All the tools to help you hire smarter—just one click away.
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {benefitsList.map((item, i) => {
                        return (
                          <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <Icon icon={item.icon} color='#32497A' fontSize={24} />
                            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#32497A' }}>
                              {item.detail}
                            </Typography>
                          </Box>
                        )
                      })}
                    </Box>

                    <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#666666' }}>
                      Let’s get you that perfect hire.{' '}
                      <Link href='#' sx={{ color: '#2561EB', textDecoration: 'underline' }}>
                        Learn more.
                      </Link>
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        onClick={e => {
                          e.stopPropagation()
                          setContent('content2')
                        }}
                        variant='contained'
                        sx={{
                          backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                          textTransform: 'none',
                          fontSize: 12
                        }}
                      >
                        Unlock now
                      </Button>
                      <Button
                        onClick={e => handleCloseFirst(e)}
                        variant='text'
                        sx={{ textTransform: 'none', fontSize: 12, color: '#0B58A6' }}
                      >
                        Maybe later
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        ) : (
          // content 2
          <DialogContent sx={{ padding: 0, borderRadius: '8px' }} onClick={e => e.stopPropagation()}>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'stretch', padding: '0px' }}>
              {/* gambar */}
              <Box
                component={'img'}
                src='/images/unlock_plus_2_new.png'
                sx={{
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                  objectFit: 'cover',
                  width: '50%',
                  height: 'auto',
                  display: { xs: 'none', md: 'block' }
                }}
              />
              {/* text */}
              <Box sx={{ padding: '40px', backgroundColor: '#FFFFFF' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1F1F1F' }}>
                        One step closer to unlock Profesea Plus!
                      </Typography>
                      <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#1F1F1F', textAlign: 'center' }}>
                        Which features do you think will be most useful for you?
                      </Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#1F1F1F', whiteSpace: 'nowrap' }}>
                        Please select 3 or more features from the list:
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      {quizList.map((item, i) => {
                        return (
                          <Box
                            key={i}
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <Box>
                              <FormControlLabel
                                onClick={e => e.stopPropagation()}
                                control={
                                  <Checkbox
                                    size='small'
                                    value={item.value}
                                    onChange={e => {
                                      e.stopPropagation()
                                      handleCheck(e)
                                    }}
                                  />
                                }
                                label={item.question}
                                sx={{ fontSize: 14, fontWeight: 400, color: '##1F1F1F' }}
                              />
                            </Box>
                            <Tooltip title={item.detail}>
                              <Icon icon={'ph:info'} fontSize={20} />
                            </Tooltip>
                          </Box>
                        )
                      })}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Button
                        size='small'
                        onClick={e => {
                          e.stopPropagation()
                          handleSubmit(e)
                        }}
                        disabled={answers.length < 3}
                        variant='contained'
                        sx={{
                          backgroundImage:
                            answers.length < 3 ? '' : 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                          textTransform: 'none',
                          fontSize: 14
                        }}
                      >
                        Continue
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>

      {/* mobile sheet */}
      <Drawer anchor={'bottom'} open={isOpenFirst && isMobileMd} onClose={handleCloseFirst}>
        {content === 'content1' ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ padding: '24px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F1F1F' }}>
                Thousands of Recruiters Are Already Using These Tools
                </Typography>
                <Icon
                  onClick={handleCloseFirst}
                  icon={'ph:x'}
                  fontSize={20}
                  style={{ alignSelf: 'flex-end', cursor: 'pointer', marginBottom: 2 }}
                />
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#666666' }}>
              All the tools to help you hire smarter—just one click away.
              </Typography>
            </Box>
            <Box
              component={'img'}
              src={isMobileSm ? '/images/plus_unlock_company_mobile.png' : '/images/plus_unlock.png'}
              sx={{
                objectFit: 'contain',
                width: '100%',
                height: 'auto'
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '0px 24px' }}>
              {benefitsList.map((item, i) => {
                return (
                  <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Icon icon={item.icon} color='#32497A' fontSize={24} />
                    <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#32497A' }}>{item.detail}</Typography>
                  </Box>
                )
              })}
            </Box>

            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#666666', padding: '0px 24px' }}>
            Let’s get you that perfect hire.{' '}
              <Link href='#' sx={{ color: '#2561EB', textDecoration: 'underline' }}>
                Learn more.
              </Link>
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: '12px 24px',
                boxShadow: '0px 2px 18.6px 0px #0000001A'
              }}
            >
              <Button
                onClick={e => {
                  e.stopPropagation()
                  setContent('content2')
                }}
                variant='contained'
                sx={{
                  backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                  textTransform: 'none',
                  fontSize: 12
                }}
              >
                Unlock now
              </Button>
              <Button
                onClick={e => handleCloseFirst(e)}
                variant='text'
                sx={{ textTransform: 'none', fontSize: 12, color: '#0B58A6' }}
              >
                Maybe later
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ padding: '24px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                <Icon
                  onClick={handleCloseFirst}
                  icon={'ph:x'}
                  fontSize={20}
                  style={{ cursor: 'pointer', marginBottom: 2 }}
                />
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F1F1F' }}>
                  Which features do you think will be most useful for you?
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#666666' }}>
                Please select 3 or more features from the list:
              </Typography>
            </Box>
            <Box
              component={'img'}
              src={isMobileSm ? '/images/plus_unlock_company_mobile_2.png' : '/images/unlock_plus_2_new.png'}
              sx={{
                objectFit: 'contain',
                width: '100%',
                height: 'auto'
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0px 24px' }}>
              {quizList.map((item, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <FormControlLabel
                        onClick={e => e.stopPropagation()}
                        control={
                          <Checkbox
                            size='small'
                            value={item.value}
                            onChange={e => {
                              e.stopPropagation()
                              handleCheck(e)
                            }}
                          />
                        }
                        label={item.question}
                        sx={{ fontSize: 14, fontWeight: 400, color: '##1F1F1F' }}
                      />
                    </Box>
                    <Tooltip title={item.detail}>
                      <Icon icon={'ph:info'} fontSize={20} />
                    </Tooltip>
                  </Box>
                )
              })}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '12px 24px 12px 24px',
                boxShadow: '0px 2px 18.6px 0px #0000001A'
              }}
            >
              <Button
                size='small'
                onClick={e => {
                  e.stopPropagation()
                  handleSubmit(e)
                }}
                disabled={answers.length < 3}
                variant='contained'
                sx={{
                  backgroundImage: answers.length < 3 ? '' : 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                  textTransform: 'none',
                  fontSize: 14
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* congrats dialog */}
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        scroll='body'
        open={isOpenSecond && !isMobileMd}
        onClose={handleCloseSecond}
        fullWidth
        maxWidth={'xs'}
        sx={{ '& .MuiDialog-paper': { borderRadius: '12px !important' } }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* image */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'linear-gradient(180deg, #2662EC 0%, #163886 100%)',
                alignItems: 'center'
              }}
            >
              <IconButton onClick={handleCloseSecond} sx={{ alignSelf: 'flex-end' }}>
                <Icon icon={'ph:x'} fontSize={20} color='#FFFFFF' />
              </IconButton>
              <Box sx={{ position: 'relative' }}>
                <Lottie
                  animationData={require('/public/animated-images/spark.json')}
                  style={{ position: 'absolute', zIndex: 1 }}
                />
                <Lottie
                  animationData={require('/public/animated-images/confetti.json')}
                  style={{ position: 'absolute', zIndex: 1 }}
                />
                <Box component={'img'} src='/images/hooray.png' sx={{ zIndex: 2, position: 'relative' }} />
              </Box>
            </Box>
            {/* text */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', padding: '10px 16px' }}>
              <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#1F1F1F' }}>Congratulations!</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#1F1F1F', textAlign: 'center' }}>
                All exclusive features unlocked — enjoy the full potential Profesea!
              </Typography>
              <Button
                onClick={handleCloseSecond}
                variant='contained'
                size='small'
                sx={{ textTransform: 'none', color: '#FFFFFF', fontSize: 14, fontWeight: 400, width: '100%' }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* congrats drawer */}
      <Drawer anchor={'bottom'} open={isOpenSecond && isMobileMd} onClose={handleCloseFirst}>
        <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1F1F1F' }}>Congratulations!</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#666666' }}>
              All exclusive features unlocked — enjoy the full potential Profesea!
            </Typography>
          </Box>

          <Icon
            onClick={handleCloseSecond}
            icon={'ph:x'}
            fontSize={20}
            style={{ cursor: 'pointer', marginBottom: 2 }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            backgroundImage: 'linear-gradient(180deg, #2661E9 0%, #153783 100%)',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Lottie
            animationData={require('/public/animated-images/spark.json')}
            style={{ position: 'absolute', zIndex: 1 }}
          />
          <Lottie
            animationData={require('/public/animated-images/confetti.json')}
            style={{ position: 'absolute', zIndex: 1 }}
          />
          <Box
            component={'img'}
            src='/images/hooray_mobile.png'
            sx={{ zIndex: 2, position: 'relative', left: 'auto', right: 'auto', top: 6 }}
          />
        </Box>
        <Box sx={{ padding: '16px 16px 32px 16px' }}>
          <Button
            onClick={handleCloseSecond}
            variant='contained'
            size='small'
            sx={{ textTransform: 'none', color: '#FFFFFF', fontSize: 14, fontWeight: 400, width: '100%' }}
          >
            Continue
          </Button>
        </Box>
      </Drawer>
    </>
  )
}

export default ModalUnlockPlus
