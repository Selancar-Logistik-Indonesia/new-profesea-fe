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
  SxProps,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import Lottie from 'lottie-react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { HttpClient } from 'src/services'

type ModalProps = {
  text: string
  param?: string
  sx?: SxProps
  condition?: boolean
}

type BenefitListType = {
  icon: string
  detail: string
}

const benefitsList: BenefitListType[] = [
  {
    icon: 'ph:rocket-launch',
    detail: 'Boosted Recommendation'
  },
  {
    icon: 'ph:bookmarks',
    detail: 'Saved Jobs'
  },
  {
    icon: 'ph:suitcase',
    detail: 'Recommended Jobs'
  },
  {
    icon: 'ph:clock-counter-clockwise',
    detail: 'Application History'
  },
  {
    icon: 'ph:upload-simple',
    detail: 'Upload Your Resume'
  }
]

const quizList: { question: string; detail: string; value: string }[] = [
  {
    question: 'Boosted Recommendation',
    detail: 'Appear at the top of recruiter searches and stand out.',
    value: 'BRC'
  },
  {
    question: 'CV Upload',
    detail: 'Upload your existing CV for quick profile building and storage.',
    value: 'CVU'
  },
  {
    question: 'Apply with Uploaded CV',
    detail: 'Instantly apply for jobs using your uploaded resume.',
    value: 'ACV'
  },
  {
    question: 'Saved Jobs',
    detail: 'Keep track of interesting job listings in one place.',
    value: 'SVJ'
  },
  {
    question: 'Application History',
    detail: "View where you've applied and manage next steps.",
    value: 'APH'
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

const ModalUnlockPlusCandidate = ({ text, param, sx, condition = false }: ModalProps) => {
  const router = useRouter()
  const path = usePathname()
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
    if (param) {
      router.push(`${path}?${param}`)
    }
    router.reload()
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await HttpClient.post('/transaction/v2/create', {
        payment_type: 'FREE',
        purchase_item: 'PLS-3M-TRIAL',
        purchase_type: 'subscription',
        user_type: 'candidate'
      })
      await HttpClient.post('/feedback/user-feedback', {
        section: 'Feedback Candidate 1',
        feedback_codes: answers,
        user_type: 'candidate'
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
        disabled={condition}
        variant='contained'
        onClick={e => {
          setIsOpenFirst(true)
          e.stopPropagation()
        }}
        sx={{
          borderRadius: 2,
          backgroundImage: condition ? '' : 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          whiteSpace: 'nowrap',
          ...sx
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
        sx={{ '& .MuiDialog-paper': { borderRadius: '12px !important' }, display: { xs: 'none', md: 'block' } }}
      >
        {content === 'content1' ? (
          // content 1
          <DialogContent sx={{ padding: 0, borderRadius: '8px' }} onClick={e => e.stopPropagation()}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'strech' }}>
              {/* gambar */}
              <Box
                component={'img'}
                src='/images/plus_unlock_candidate_1.png'
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
                        Try Profesea Plus for{' '}
                        <span
                          style={{
                            backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                            backgroundClip: 'text',
                            color: 'transparent'
                          }}
                        >
                          Free
                        </span>
                        !
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#666666' }}>
                        Everything you need to get a job easier—{' '}
                        <span
                          style={{
                            backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                            color: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          zero cost.
                        </span>
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
                      Unlock premium features. No cost, no commitment.{' '}
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
                src='/images/unlock_plus_candidate_2.png'
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
                        Please select 1 or more features from the list:
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
                        disabled={answers.length < 1}
                        variant='contained'
                        sx={{
                          backgroundImage:
                            answers.length < 1 ? '' : 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
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
                  Try Profesea Plus for{' '}
                  <span
                    style={{
                      backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Free
                  </span>
                  !
                </Typography>
                <Icon
                  onClick={handleCloseFirst}
                  icon={'ph:x'}
                  fontSize={20}
                  style={{ alignSelf: 'flex-end', cursor: 'pointer', marginBottom: 2 }}
                />
              </Box>
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#666666' }}>
                Everything you need to hire smarter —{' '}
                <span
                  style={{
                    backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                    color: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  zero cost.
                </span>
              </Typography>
            </Box>
            <Box
              component={'img'}
              src={isMobileSm ? '/images/plus_unlock_candidate_mobile_1.png' : '/images/plus_unlock_candidate_1.png'}
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
              Unlock premium features. No cost, no commitment.{' '}
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
                Please select 1 or more features from the list:
              </Typography>
            </Box>
            <Box
              component={'img'}
              src={isMobileSm ? '/images/unlock_plus_candidate_mobile_2.png' : '/images/unlock_plus_candidate_2.png'}
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
                disabled={answers.length < 1}
                variant='contained'
                sx={{
                  backgroundImage: answers.length < 1 ? '' : 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
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

export default ModalUnlockPlusCandidate
