import { Icon } from '@iconify/react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  LinearProgress,
  Typography,
  useMediaQuery
} from '@mui/material'
// import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import Training, { EBookingScheme } from 'src/contract/models/training'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { formatIDR, formatUSD, getUserAvatar } from 'src/utils/helpers'
// import PaymentDialog from 'src/views/payment/PaymentDialog'
// import OtherTraining from './OtherTraining'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import { SxProps, Theme, useTheme } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import styled from '@emotion/styled'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { AppConfig } from 'src/configs/api'
import toast from 'react-hot-toast'

interface IParticipants {
  fullname: string
  email: string
  number: string
  address: string
  companyName?: string
}

enum EEnrollType {
  FOR_INDIVIDUALS = 'for-individuals',
  FOR_COMPANIES = 'for-companies'
}

const formatTrainingDates = (startDate: string | Date, endDate: string | Date): string => {
  const formattedStart = format(new Date(startDate), 'd MMM')
  const formattedEnd = format(new Date(endDate), 'd MMM')

  return `Start at ${formattedStart} - Close at ${formattedEnd}`
}

const BootstrapInput = styled(InputBase)(() => {
  return {
    'label + &': {
      marginTop: '20px'
    },
    '& .MuiInputBase-input': {
      borderRadius: '12px',
      position: 'relative',
      border: '1px solid #E7E7E7',
      fontSize: 16,
      width: '100%',
      padding: '16px'
      // transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
    }
  }
})

const bannerHeroDetail: SxProps<Theme> = {
  backgroundSize: 'cover',
  backgroundPosition: {
    xs: '50% center',
    md: '85% center',
    lg: '85% center'
  },
  minHeight: '444px'
}

const renderList = (pageView: string, arr: Training[] | undefined, trainer: IUser) => {
  if (arr && arr.length) {
    return arr.map((item, i) => {
      const trainerNameUrl = trainer?.name?.toLowerCase().split(' ').join('-')
      const trainingTitleUrl = item.title ? item.title?.toLowerCase().split(' ').join('-') : ''
      const renderLink = `/${pageView === 'company' ? 'company' : 'candidate'}/trainings/${trainerNameUrl}/${
        item.id
      }/${trainingTitleUrl}`

      return (
        <Grid item xs={12} md={6} lg={4} key={i}>
          <Card sx={{ flex: 1 }} key={i}>
            <CardContent sx={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CardMedia
                component='div'
                image={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                sx={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  aspectRatio: '3/2',
                  mb: 3
                }}
              />
              {/* <Link href={`/candidate/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`}></Link> */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <TruncatedTypography fontSize={16} color={'#1F1F1F'} textTransform>
                    {item.title}
                  </TruncatedTypography>
                  <Box sx={{ padding: '8px', borderRadius: '8px', border: '1px solid #868686', textAlign: 'center' }}>
                    <TruncatedTypography fontSize={12} color={'#868686'} fontWeight={400}>
                      {item.category?.category}
                    </TruncatedTypography>
                  </Box>
                  <Box
                    height={35}
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} mr={3}>
                      <Avatar src={getUserAvatar(trainer)} alt='profile-picture' sx={{ width: 25, height: 25 }} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography sx={{ fontWeight: '400', color: '#303030' }} fontSize={12}>
                        {trainer?.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <TruncatedTypography fontSize={16} fontWeight={700} color={'#1F1F1F)'}>
                    {item.discounted_price ? formatIDR(item.discounted_price, true) : formatIDR(item.price, true)}
                  </TruncatedTypography>
                </Box>
              </Box>
              <Grid container>
                <Button
                  fullWidth
                  size='small'
                  LinkComponent={Link}
                  variant='contained'
                  color='primary'
                  href={renderLink}
                  sx={{ textTransform: 'capitalize' }}
                >
                  Learn More
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )
    })
  } else {
    return null
  }
}

const TruncatedTypography = (props: { children: any; line?: number; textTransform?: boolean; [key: string]: any }) => {
  const { children, line, textTransform, ...rest } = props
  const maxLine = line ? line : 1

  let value = children

  if (textTransform) {
    value = children.toLowerCase()
  }

  return (
    <Typography
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLine,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxHeight: `calc(${maxLine} * 1.2em)`,
        minHeight: '1.2em',
        lineHeight: '1.2em',
        fontWeight: 'bold',
        fontSize: '16px',
        textTransform: 'capitalize',
        ...rest
      }}
    >
      {value}
    </Typography>
  )
}

const TrainingDetailPage = ({ pageView = 'candidate' }: { pageView?: string }) => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const trainingId = router.query.id
  const [training, setTraining] = useState<Training | null>(null)
  const [openDialogOne, setOpenDialogOne] = useState(false)
  const [openDialogTwo, setOpenDialogTwo] = useState(false)
  const [openDialogThree, setOpenDialogThree] = useState(false)
  const [openDialogFour, setOpenDialogFour] = useState(false)
  const [showAlertDialogTwo, setShowAlertDialogTwo] = useState(false)

  // data
  const [enrollType, setEnrollType] = useState('')
  const [participants, setParticipants] = useState<IParticipants[]>([])
  const [enrollMySelf, setEnrollMySelf] = useState(false)
  const [fullname, setFullname] = useState('')
  const [errFullname, setErrFullname] = useState(false)
  const [email, setEmail] = useState('')
  const [errEmail, setErrEmail] = useState(false)
  const [wa, setWa] = useState('')
  const [errWa, setErrWa] = useState(false)
  const [address, setAddress] = useState('')
  const [errAddress, setErrAddress] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [errCompanyName, setErrCompanyName] = useState(false)
  const [showEnrollMySelf, setShowEnrollMySelf] = useState(true)
  const [countParticipant, setCountParticipant] = useState(0)
  const [quotaBasedProgress, setQuotaBasedProgress] = useState(0)

  const handleClickOpenDialogOne = () => {
    setOpenDialogOne(true)
  }

  const handleCloseDialogOne = () => {
    setOpenDialogOne(false)
  }

  const handleClickOpenDialogTwo = (enrollType: string) => {
    setEnrollType(enrollType)

    if (enrollType === EEnrollType.FOR_COMPANIES) {
      setOpenDialogOne(false)
      setOpenDialogThree(true)

      return
    }

    setOpenDialogOne(false)
    setOpenDialogTwo(true)
  }

  const handleCloseDialogTwo = () => {
    setOpenDialogTwo(false)
    setOpenDialogOne(true)
  }

  const handleClickOpenDialogThree = () => {
    setOpenDialogTwo(false)
    setOpenDialogThree(true)
  }

  const handleCloseDialogThree = () => {
    if (enrollType == EEnrollType.FOR_COMPANIES) {
      setOpenDialogThree(false)
      setOpenDialogOne(true)

      return
    }

    setOpenDialogThree(false)
    setOpenDialogTwo(true)
  }

  const handleClickOpenDialogFour = () => {
    if (enrollType == EEnrollType.FOR_COMPANIES) {
      setOpenDialogThree(false)
      setOpenDialogFour(true)

      return
    }

    setOpenDialogTwo(false)
    setOpenDialogFour(true)
  }

  const handleChangeEnrollMySelf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnrollMySelf(event.target.checked)
  }

  // enroll for individuals
  const handleEnrollForIndividuals = async () => {
    if (participants.length === 0) {
      setShowAlertDialogTwo(true)

      return
    }

    const users = participants.map(p => ({
      fullname: p.fullname,
      email: p.email,
      whatsapp_number: p.number,
      address: p.address,
      self_enroll: false
    }))

    try {
      const response = await HttpClient.post(AppConfig.baseUrl + '/training/enroll/individual', {
        training_id: training?.id,
        users: users
      })

      if (response.status === 200) {
        handleClickOpenDialogFour()
      }
    } catch (error) {
      console.log(error)
      toast.error('Error enroll training')
    }
  }

  // enroll for companies
  const handleEnrollForCompanies = async () => {
    if (fullname == '' || email == '' || wa == '' || address == '' || companyName == '') {
      setErrFullname(true)
      setErrEmail(true)
      setErrWa(true)
      setErrAddress(true)
      setErrCompanyName(true)

      return
    }

    setErrFullname(false)
    setErrEmail(false)
    setErrWa(false)
    setErrAddress(false)
    setErrCompanyName(false)

    const newParticipants: IParticipants = {
      fullname: fullname,
      email: email,
      number: wa,
      address: address,
      companyName: companyName
    }

    try {
      const response = await HttpClient.post(AppConfig.baseUrl + '/training/enroll/company', {
        training_id: training?.id,
        company_name: newParticipants.companyName,
        pic_name: newParticipants.fullname,
        email: newParticipants.email,
        address: newParticipants.address,
        whatsapp_number: newParticipants.number
      })

      if (response.status === 200) {
        // if success hit endpoint do this
        setFullname('')
        setEmail('')
        setWa('')
        setAddress('')
        setCompanyName('')

        handleClickOpenDialogFour()
      }
    } catch (error) {
      console.log(error)
      toast.error('Error enroll training')
    }
  }

  const handleSubmitParticipants = () => {
    if (fullname == '' || email == '' || wa == '' || address == '') {
      setErrFullname(true)
      setErrEmail(true)
      setErrWa(true)
      setErrAddress(true)

      return
    }

    setErrFullname(false)
    setErrEmail(false)
    setErrWa(false)
    setErrAddress(false)

    const newParticipants: IParticipants = {
      fullname: fullname,
      email: email,
      number: wa,
      address: address
    }

    if (enrollMySelf) {
      setShowEnrollMySelf(false)
    }

    // training?.participants ? (training.count_participant / training.participants) * 100 : 0
    if (training?.booking_scheme === EBookingScheme.QUOTA_BASED) {
      setCountParticipant(old => old + 1)
      setQuotaBasedProgress((training?.count_participant + 1 / training?.participants) * 100)
    }

    setParticipants(old => [...old, newParticipants])
    setOpenDialogThree(false)
    setOpenDialogTwo(true)
    setFullname('')
    setEmail('')
    setWa('')
    setAddress('')
    setEnrollMySelf(false)
  }

  const handleRemoveParticipants = (name: string) => {
    const filterParticipants = participants.filter(p => p.fullname != name)
    if (name === user?.name) {
      setShowEnrollMySelf(true)
    }
    setParticipants(filterParticipants)
  }

  const getDetailTraining = async () => {
    try {
      const resp = await HttpClient.get(`/public/data/training/${trainingId}`)

      if (resp.status !== 200) {
        alert(resp.data?.message ?? '')

        return
      }
      setTraining(resp.data.training)
      setCountParticipant(resp.data.training?.count_participant)
      setQuotaBasedProgress(
        resp.data.training?.participants
          ? (resp.data.training?.count_participant / resp.data.training?.participants) * 100
          : 0
      )
    } catch (error) {
      console.error('Error fetching training details:', error)
    }
  }

  const handleFillForm = () => {
    if (enrollMySelf) {
      setFullname(user?.name)
      setEmail(user?.email)
      setWa(user?.phone)
      setAddress(user?.address?.address)
    } else {
      setFullname('')
      setEmail('')
      setWa('')
      setAddress('')
    }
  }

  const renderSubDescriptionDialogTwo = () => {
    if (training?.booking_scheme === EBookingScheme.QUOTA_BASED) {
      return (
        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#666', mb: '24px' }}>
          You can only add participants based on the remaining available quota.
        </Typography>
      )
    }

    return (
      <>
        {participants.length == 0 ? (
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#666', mb: '24px' }}>
            Click the button below to start adding participants.
          </Typography>
        ) : (
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#666', mb: '24px' }}>
            Please fill in all fields correctly to ensure our team can contact you to process your booking.
          </Typography>
        )}
      </>
    )
  }

  useEffect(() => {
    handleFillForm()
  }, [enrollMySelf])

  useEffect(() => {
    if (trainingId) {
      getDetailTraining()
    }
  }, [trainingId])

  const renderBookScheme = (scheme: string) => {
    const progress = training?.participants ? (training.count_participant / training.participants) * 100 : 0

    if (scheme === EBookingScheme.QUOTA_BASED) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <Icon icon={'mdi:users'} fontSize={22} color='#FF9800' />
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#FF9800' }}>Quota Based</Typography>
            </Box>
            <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#404040' }}>
              {training?.count_participant} / {training?.participants} quotas filled
            </Typography>
          </Box>
          <Box>
            <LinearProgress variant='determinate' value={progress} />
          </Box>
        </Box>
      )
    }

    if (scheme === EBookingScheme.FIXED_DATE) {
      return (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <Icon icon={'radix-icons:calendar'} fontSize={22} color='#2662EC' />
            <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#2662EC' }}>Fixed Date</Typography>
          </Box>
          {training?.start_date && training?.end_date && (
            <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#525252' }}>
              {formatTrainingDates(training?.start_date, training?.end_date)}
            </Typography>
          )}
        </Box>
      )
    }

    // default instant access
    return (
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Icon icon={'material-symbols:rocket'} fontSize={22} color='#4CAF50' />
          <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#4CAF50' }}>Instant Access</Typography>
        </Box>
        {training?.start_date && training?.end_date && (
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#525252' }}>
            {formatTrainingDates(training?.start_date, training?.end_date)}
          </Typography>
        )}
      </Box>
    )
  }

  const renderButtonAddMoreParticipants = () => {
    if (training?.booking_scheme === EBookingScheme.QUOTA_BASED) {
      if (countParticipant != training?.participants) {
        return (
          <Box
            sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
            onClick={handleClickOpenDialogThree}
          >
            <Icon icon={'ic:round-plus'} fontSize={16} />
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#32497A' }}>Add more participant</Typography>
          </Box>
        )
      } else {
        return null
      }
    }

    return (
      <Box
        sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
        onClick={handleClickOpenDialogThree}
      >
        <Icon icon={'ic:round-plus'} fontSize={16} />
        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#32497A' }}>Add more participant</Typography>
      </Box>
    )
  }

  return !training ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${training.title}`}</title>
        {new Date() > new Date(training?.schedule) && <meta name='robots' content='noindex,nofollow,noarchive' />}
      </Head>

      {/* Dialog One */}
      <Dialog fullWidth open={openDialogOne} onClose={handleCloseDialogOne}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle sx={{ padding: '15px', fontSize: '18px', fontWeight: 700, color: '#1F1F1F' }}>
            How Would You Like to Enroll?
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleCloseDialogOne}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <Icon icon={'charm:cross'} fontSize={24} />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#666', mb: '24px' }}>
            Choose the option that best suits your enrollment needs.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px' }}>
            <Box
              onClick={() => handleClickOpenDialogTwo(EEnrollType.FOR_INDIVIDUALS)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                py: '16px',
                px: '24px',
                alignItems: 'center',
                borderRadius: '6px',
                border: '1px solid #868686',
                cursor: 'pointer'
              }}
            >
              <Icon icon={'mdi:users'} fontSize={32} color='#868686' />
              <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#868686', textAlign: 'center' }}>
                  For Individuals
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#868686', textAlign: 'center' }}>
                  Enroll <span style={{ fontWeight: 700 }}>up</span> to{' '}
                  <span style={{ fontWeight: 700 }}>5 participants</span> directly.
                </Typography>
              </Box>
            </Box>
            <Box
              onClick={() => handleClickOpenDialogTwo(EEnrollType.FOR_COMPANIES)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                py: '16px',
                px: '24px',
                alignItems: 'center',
                borderRadius: '6px',
                border: '1px solid #868686',
                cursor: 'pointer'
              }}
            >
              <Icon icon={'mdi:users'} fontSize={32} color='#868686' />
              <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#868686', textAlign: 'center' }}>
                  For Companies
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#868686', textAlign: 'center' }}>
                  Enroll <span style={{ fontWeight: 700 }}>more then 5 participants</span> in bulk.
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog Two */}
      <Dialog fullWidth open={openDialogTwo} onClose={() => setOpenDialogTwo(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle sx={{ padding: '15px', fontSize: '18px', fontWeight: 700, color: '#1F1F1F' }}>
            Let's Get You Enrolled!
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={() => setOpenDialogTwo(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <Icon icon={'charm:cross'} fontSize={24} />
          </IconButton>
        </Box>
        <DialogContent>
          {renderSubDescriptionDialogTwo()}

          {training?.booking_scheme === EBookingScheme.QUOTA_BASED && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', mb: '18px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <Icon icon={'mdi:users'} fontSize={22} color='#FF9800' />
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#FF9800' }}>Quota Based</Typography>
                </Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#404040' }}>
                  {countParticipant} / {training?.participants} quotas filled
                </Typography>
              </Box>
              <Box>
                <LinearProgress variant='determinate' value={quotaBasedProgress} />
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {participants.length == 0 ? (
              <Box
                onClick={handleClickOpenDialogThree}
                sx={{
                  width: '100%',
                  // height: 100, // Adjust as needed
                  padding: '24px 12px',
                  border: '1px dashed gray',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <AddIcon sx={{ color: 'gray', fontSize: 30 }} />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                {participants.map((p, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      border: '1px solid #404040',
                      borderRadius: '12px'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Icon icon={'mynaui:user-solid'} fontSize={18} />
                      <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#666' }}>{p?.fullname}</Typography>
                    </Box>
                    <Icon
                      icon={'charm:cross'}
                      fontSize={18}
                      onClick={() => handleRemoveParticipants(p.fullname)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                ))}
                {renderButtonAddMoreParticipants()}
                {/* <Box
                  sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                  onClick={handleClickOpenDialogThree}
                >
                  <Icon icon={'ic:round-plus'} fontSize={16} />
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#32497A' }}>
                    Add more participant
                  </Typography>
                </Box> */}
              </Box>
            )}

            {showAlertDialogTwo && (
              <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'red' }}>
                Please add participants before enroll!
              </Typography>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Button
                fullWidth
                variant='contained'
                sx={{ textTransform: 'capitalize' }}
                onClick={handleEnrollForIndividuals}
              >
                Enroll Now
              </Button>
              <Button fullWidth variant='text' sx={{ textTransform: 'capitalize' }} onClick={handleCloseDialogTwo}>
                Back
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog Three */}
      <Dialog fullWidth open={openDialogThree} onClose={() => setOpenDialogThree(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle sx={{ padding: '15px', fontSize: '18px', fontWeight: 700, color: '#1F1F1F' }}>
            {enrollType === EEnrollType.FOR_INDIVIDUALS
              ? "Let's Get You Enrolled!"
              : 'Bulk Enrollment for Your Company'}
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={() => setOpenDialogThree(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <Icon icon={'charm:cross'} fontSize={24} />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#666', mb: '24px' }}>
            {enrollType === EEnrollType.FOR_INDIVIDUALS
              ? '   Please fill in all fields correctly to ensure our team can contact you to process your booking.'
              : 'Please provide the details of the PIC (Person in Charge) for your company. Our team will contact you shortly to assist with bulk enrollment process.'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {showEnrollMySelf && enrollType != EEnrollType.FOR_COMPANIES && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enrollMySelf}
                    onChange={handleChangeEnrollMySelf}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label='I enroll myself.'
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', py: '24px', gap: '24px' }}>
            <FormControl variant='standard'>
              <InputLabel
                shrink
                htmlFor='bootstrap-input-fullname'
                sx={{ fontSize: '16px', fontWeight: 400, color: '#525252' }}
              >
                {enrollType == EEnrollType.FOR_INDIVIDUALS ? 'Full Name' : 'PIC Full Name'}
              </InputLabel>
              <BootstrapInput
                value={fullname}
                onChange={event => setFullname(event.target.value)}
                placeholder={
                  enrollType == EEnrollType.FOR_INDIVIDUALS ? 'Enter participant full name' : 'Enter PIC full name'
                }
                id='bootstrap-input-fullname'
              />
              {errFullname && (
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'red' }}>Please input full name</Typography>
              )}
            </FormControl>
            {enrollType == EEnrollType.FOR_COMPANIES && (
              <FormControl variant='standard'>
                <InputLabel
                  shrink
                  htmlFor='bootstrap-input-company-name'
                  sx={{ fontSize: '16px', fontWeight: 400, color: '#525252' }}
                >
                  Company Name
                </InputLabel>
                <BootstrapInput
                  value={companyName}
                  onChange={event => setCompanyName(event.target.value)}
                  placeholder='Enter your company name'
                  id='bootstrap-input-company-name'
                />
                {errCompanyName && (
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'red' }}>
                    Please input company name
                  </Typography>
                )}
              </FormControl>
            )}

            <FormControl variant='standard'>
              <InputLabel
                shrink
                htmlFor='bootstrap-input-email'
                sx={{ fontSize: '16px', fontWeight: 400, color: '#525252' }}
              >
                Email
              </InputLabel>
              <BootstrapInput
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder='Enter participant email'
                id='bootstrap-input-email'
              />
              {errEmail && (
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'red' }}>Please input email</Typography>
              )}
            </FormControl>
            <FormControl variant='standard'>
              <InputLabel
                shrink
                htmlFor='bootstrap-input-wa'
                sx={{ fontSize: '16px', fontWeight: 400, color: '#525252' }}
              >
                Whatsapp Number
              </InputLabel>
              <BootstrapInput
                value={wa}
                onChange={event => setWa(event.target.value)}
                placeholder='Enter participant active whatsapp number'
                id='bootstrap-input-wa'
              />
              {errWa && (
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'red' }}>
                  Please input whatsapp number
                </Typography>
              )}
              <Typography sx={{ fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: '#868686', mt: '24px' }}>
                * Ensure this number is active on WhatsApp to receive updates.
              </Typography>
            </FormControl>
            <FormControl variant='standard'>
              <InputLabel
                shrink
                htmlFor='bootstrap-input-address'
                sx={{ fontSize: '16px', fontWeight: 400, color: '#525252' }}
              >
                Address
              </InputLabel>
              <BootstrapInput
                value={address}
                onChange={event => setAddress(event.target.value)}
                placeholder='Enter pariticipant address'
                id='bootstrap-input-address'
              />
              {errAddress && (
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'red' }}>Please input address</Typography>
              )}
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {enrollType == EEnrollType.FOR_INDIVIDUALS ? (
              <Button
                fullWidth
                variant='contained'
                sx={{ textTransform: 'capitalize' }}
                onClick={handleSubmitParticipants}
              >
                Submit
              </Button>
            ) : (
              <Button
                fullWidth
                variant='contained'
                sx={{ textTransform: 'capitalize' }}
                onClick={handleEnrollForCompanies}
              >
                Enroll Now
              </Button>
            )}

            <Button fullWidth variant='text' sx={{ textTransform: 'capitalize' }} onClick={handleCloseDialogThree}>
              Back
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog Four */}
      <Dialog fullWidth open={openDialogFour} onClose={() => setOpenDialogFour(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            aria-label='close'
            onClick={() => setOpenDialogFour(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <Icon icon={'charm:cross'} fontSize={24} />
          </IconButton>
        </Box>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image src={'/images/success-asset.png'} alt='success-asset' width={250} height={160} />
            </Box>
            <Box>
              {enrollType === EEnrollType.FOR_INDIVIDUALS ? (
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#404040', textAlign: 'center' }}>
                  You're Successfully Enrolled Now!
                </Typography>
              ) : (
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#404040', textAlign: 'center' }}>
                  Enrollment Request Submitted
                </Typography>
              )}

              {enrollType === EEnrollType.FOR_INDIVIDUALS ? (
                <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#666', my: '12px', textAlign: 'center' }}>
                  You're all set! Our team will contact you soon with the next steps. Stay tuned for updates!
                </Typography>
              ) : (
                <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#666', my: '12px', textAlign: 'center' }}>
                  Our team will reach out shortly to assist with your enrollment process.
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button
                variant='contained'
                sx={{ textTransform: 'capitalize', fontSize: '14px', fontWeight: 400 }}
                onClick={() =>
                  router.push(`/candidate/trainings/?tab=${enrollType === EEnrollType.FOR_INDIVIDUALS ? 1 : 0}`)
                }
              >
                {enrollType === EEnrollType.FOR_INDIVIDUALS ? 'View Enrolled Training' : 'Explore Other Training'}
              </Button>
              <Button
                variant='text'
                sx={{ textTransform: 'capitalize', fontSize: '14px', fontWeight: 400, color: '#32497A' }}
                onClick={() => router.push('/home')}
              >
                Back to Home
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Box sx={{ position: 'relative' }}>
        <Grid container sx={{ position: 'absolute', top: '12px', left: '-72px' }}>
          <IconButton
            onClick={() => router.push(pageView === 'company' ? '/company/find-training' : '/candidate/trainings')}
          >
            <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
          </IconButton>
        </Grid>
        <Grid
          container
          spacing={4}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              <Box
                sx={{
                  ...bannerHeroDetail,
                  display: 'flex',
                  borderRadius: '12px',
                  flexDirection: 'column',
                  padding: isMobile ? '20px' : '44px',
                  backgroundImage: `url(${training?.thumbnail})`,
                  position: 'relative',
                  overflow: 'hidden',
                  gap: '24px'
                }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '24px',
                  backgroundColor: '#FFF',
                  borderRadius: '12px',
                  boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/*  */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '',
                          md: '24px'
                        },
                        fontWeight: 700,
                        color: '#1F1F1F',
                        mb: '12px'
                      }}
                    >
                      {training?.title}
                    </Typography>
                    <Box
                      sx={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #868686',
                        textAlign: 'center',
                        width: 'fit-content',
                        mb: '12px'
                      }}
                    >
                      <TruncatedTypography fontSize={12} color={'#868686'} fontWeight={400}>
                        {training?.category?.category}
                      </TruncatedTypography>
                    </Box>
                    <Box sx={{ width: isMobile ? '100%' : '70%' }}>{renderBookScheme(training?.booking_scheme)}</Box>
                  </Box>
                  {/*  */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: '24px',
                      borderTop: '1px solid #DDD',
                      borderBottom: '1px solid #DDD'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <Avatar
                        src={training?.trainer?.photo ? training?.trainer?.photo : '/images/avatars/default-user.png'}
                        sx={{ width: 70, height: 70 }}
                      />
                      <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#2D3436', mb: '4px' }}>
                          {training?.trainer?.name}
                        </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#525252', mb: '8px' }}>
                          Training Center
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Icon icon={'ph:book-bookmark-light'} fontSize={18} color='#32497A' />
                          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#32497A' }}>
                            {training?.trainer?.training_list?.length || 0} trainings
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/*  */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', py: '12px' }}>
                    <Box>
                      <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#32497A', mb: '12px' }}>
                        Description
                      </Typography>
                      <Typography
                        sx={{ fontSize: '16px', fontWeight: 400, color: '#303030' }}
                        dangerouslySetInnerHTML={{ __html: training?.short_description }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#32497A', mb: '12px' }}>
                        Requirements
                      </Typography>
                      <Typography
                        sx={{ fontSize: '16px', fontWeight: 400, color: '#303030' }}
                        dangerouslySetInnerHTML={{ __html: training?.requirements as any }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#1F1F1F' }}>
                    Another training from this trainer
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>View All</Typography>
                    <Icon icon={'ep:arrow-right'} fontSize={18} />
                  </Box>
                </Box>
                <Grid container spacing={3}>
                  {renderList(pageView, training?.trainer?.training_list?.slice(0, 3), training?.trainer)}
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#1F1F1F' }}>
                    You might also like...
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>View All</Typography>
                    <Icon icon={'ep:arrow-right'} fontSize={18} />
                  </Box>
                </Box>
                <Grid container spacing={3}>
                  {renderList(pageView, training?.trainer?.training_list?.slice(3, 6), training?.trainer)}
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#525252',
                      mb: '9px'
                    }}
                  >
                    Subtotal
                  </Typography>
                  {training.discounted_price ? (
                    <Box>
                      <Typography fontSize={14} sx={{ textDecoration: 'line-through', color: 'gray' }}>
                        {training?.currency === 'IDR'
                          ? formatIDR(training?.price as number, true)
                          : formatUSD(training?.price as number, true)}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#32497A',
                          mb: '9px'
                        }}
                      >
                        {training?.currency === 'IDR'
                          ? formatIDR(training?.discounted_price as number, true)
                          : formatUSD(training?.discounted_price as number, true)}
                      </Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#868686' }}>
                        *harga belum termasuk PPN
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#32497A',
                          mb: '9px'
                        }}
                      >
                        {training?.currency === 'IDR'
                          ? formatIDR(training?.price as number, true)
                          : formatUSD(training?.price as number, true)}
                      </Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#868686' }}>
                        *harga belum termasuk PPN
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box>
                  <Button
                    fullWidth
                    variant='contained'
                    sx={{ textTransform: 'capitalize' }}
                    onClick={handleClickOpenDialogOne}
                    disabled={
                      training?.booking_scheme === EBookingScheme.QUOTA_BASED &&
                      training?.count_participant === training?.participants
                    }
                  >
                    Enroll Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

TrainingDetailPage.acl = {
  action: 'read',
  subject: 'home'
}

export default TrainingDetailPage
