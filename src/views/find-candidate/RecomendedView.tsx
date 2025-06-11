import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Button, Chip, Paper, useMediaQuery, useTheme } from '@mui/material'
import { IUser } from 'src/contract/models/user'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'

import { toLinkCase } from 'src/utils/helpers'
import { calculateAge, getMonthYear } from 'src/utils/helpers'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useCandidate } from 'src/hooks/useCandidate'

const ModalUnlockPlus = dynamic(() => import('src/@core/components/subscription/ModalUnlockPlus'), { ssr: false })

interface Props {
  listCandidate: IUser[]
  setOpenDialogOfferCandidate: (candidateId: any) => void
}

const handleChatWhatsapp = (phone: string) => {
  if (!phone) return

  const formattedPhone = phone.startsWith('0') ? phone.replace(/^0/, '+62') : `+62${phone}`
  const whatsappUrl = `https://wa.me/${formattedPhone}`

  window.open(whatsappUrl, '_blank')
}

const BoxedText = ({ children }: { children: string }) => {
  if (!children) return null

  return (
    <Box
      component='span'
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid #32497A',
        backgroundColor: '#F1F6FF',
        color: 'primary.main',
        borderRadius: '4px',
        padding: '2.5px 8px',
        fontSize: 14,
        fontWeight: 300,
        wordBreak: 'break-word',
        flexShrink: 0
      }}
    >
      {children}
    </Box>
  )
}

const RenderList = (listCandidate: IUser[], isXs: boolean, setOpenDialogOfferCandidate: (candidateId: any) => void) => {
  const router = useRouter()
  const { abilities } = useAuth()
  const [isSubs, setIsSubs] = useState<boolean>(false)

  const { handleCandidateSave } = useCandidate()

  useEffect(() => {
    setIsSubs(abilities?.plan_type !== 'BSC-ALL')
  }, [abilities])

  if (!listCandidate || listCandidate.length == 0) {
    return
  }

  return listCandidate?.map(item => {
    const type = item.employee_type
    const userPhoto = item.photo ?? '/images/avatars/default-user-new.png'
    const isSaved = item?.is_saved ? true : false

    return (
      <Grid item xs={12} key={item.id}>
        <Paper
          sx={{
            marginTop: '24px',
            border: item.is_boosted ? '1px solid #F9D976' : '1px solid #DDDDDD',
            borderRadius: '8px',
            padding: isXs ? '12px' : '24px',
            '&:hover': {
              border: item.is_boosted ? '1px solid #F39C12' : '1px solid #32497A'
            }
          }}
          elevation={0}
          onClick={() => router.push(`/profile/${toLinkCase(item.username)}`)}
        >
          <Box sx={{ display: 'flex', alignContent: 'flex-start', gap: '12px' }}>
            <Avatar
              src={userPhoto}
              alt='profile-picture'
              sx={{ width: isXs ? 64 : 76, height: isXs ? 64 : 76, border: item.is_boosted ? '1px solid #F39C12' : '' }}
            />
            <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', gap: '4px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <Typography
                    sx={{
                      color: 'primary.main',
                      fontSize: 16,
                      fontWeight: 'bold',
                      display: 'flex',
                      flexDirection: isXs ? 'column' : 'row',
                      gap: isXs ? 1 : 2,
                      alignItems: isXs ? '' : 'center'
                    }}
                  >
                    {item.name ?? ''}{' '}
                    <Chip
                      label={'recommendation'}
                      size='small'
                      color='secondary'
                      sx={{
                        color: '#FFFFFF',
                        backgroundImage: 'linear-gradient(180deg, #F9D976 0%, #F39C12 100%)',
                        fontWeight: 400,
                        fontSize: 10,
                        display: item.is_boosted ? 'flex' : 'none',
                        width: 'fit-content'
                      }}
                    />
                  </Typography>
                  {item.date_of_birth !== null && (
                    <Typography sx={{ fontSize: 14, fontWeight: 300 }}>
                      {calculateAge(item.date_of_birth)} years old
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'nowrap', gap: '16px' }}>
                  {!isXs && isSubs && (
                    <>
                      <Button
                        disabled={!item.phone}
                        variant='contained'
                        onClick={e => {
                          e.stopPropagation()
                          handleChatWhatsapp(item.phone ?? '')
                        }}
                        startIcon={<Icon icon='ph:whatsapp-logo' />}
                        sx={{ height: '34px', textTransform: 'none', fontSize: 14, fontWeight: 300 }}
                      >
                        Message
                      </Button>
                      <Button
                        variant='outlined'
                        onClick={e => {
                          e.stopPropagation()
                          setOpenDialogOfferCandidate(item?.id)
                        }}
                        sx={{ height: '34px', textTransform: 'none', fontSize: 14, fontWeight: 300 }}
                      >
                        Offer Job
                      </Button>
                      <Box
                        ml={1}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'right'
                        }}
                      >
                        <Icon
                          icon={isSaved ? 'iconoir:bookmark-solid' : 'iconoir:bookmark'}
                          color='rgba(50, 73, 122, 1)'
                          fontSize={'24px'}
                          style={{ cursor: 'pointer' }}
                          onClick={e => {
                            e.stopPropagation()
                            handleCandidateSave(item?.id, isSaved)
                          }}
                        />
                      </Box>
                    </>
                  )}
                  {!isXs && !isSubs && <ModalUnlockPlus text='Unlock to Offer and Message Candidate' />}
                  {/* {isXs ? (
                      <IconButton>
                        <Icon icon='ph:bookmark-simple' />
                      </IconButton>
                    ) : (
                      <Button
                        variant='outlined'
                        startIcon={<Icon icon='ph:bookmark-simple' />}
                        sx={{ height: '34px', textTransform: 'none', fontSize: 14 }}
                      >
                        Save
                      </Button>
                    )} */}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {!isXs && <Typography sx={{ color: '#949EA2', fontSize: 14, fontWeight: 300 }}>Preference:</Typography>}
                {type === 'onship' ? (
                  <>
                    <Typography sx={{ fontSize: 14, fontWeight: 300 }}>
                      {item.field_preference?.role_type?.name ?? '-'}
                    </Typography>
                    <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />
                    <Typography sx={{ fontSize: 14, fontWeight: 300 }}>
                      {item.field_preference?.vessel_type?.name ?? '-'}
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ fontSize: 14 }}>{`${item.field_preference?.job_category?.name ?? '-'}`}</Typography>
                )}
              </Box>
              <Typography sx={{ color: '#949EA2', fontSize: 14, fontWeight: 300 }}>{`${
                item.address?.city?.city_name ?? '-'
              }, ${item.address?.country?.nicename ?? '-'}`}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: '16px' }}>
            {item.employee_type === 'onship' && item.last_sea_experience && (
              <Box
                sx={{
                  mb: '16px',
                  display: 'flex',
                  flexDirection: isXs ? 'column' : 'row',
                  alignItems: 'start'
                }}
              >
                <Typography sx={{ width: '150px', fontSize: 16, fontWeight: 'bold', mb: isXs ? '4px' : 0 }}>
                  Last Experience
                </Typography>
                <Typography
                  sx={{
                    display: 'block',
                    wordBreak: 'break-word'
                  }}
                >
                  <BoxedText>{item.last_sea_experience?.vessel_name ?? '-'}</BoxedText>{' '}
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >
                    at {item.last_sea_experience?.company ?? '-'}
                  </span>{' '}
                  <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />{' '}
                  <span style={{ color: '#949EA2', fontSize: 14, fontWeight: 300 }}>{`${
                    getMonthYear(item.last_sea_experience.sign_in, true) ?? '-'
                  } - ${
                    item.last_education?.end_date ? getMonthYear(item.last_sea_experience?.sign_off, true) : 'Present'
                  }`}</span>
                </Typography>
              </Box>
            )}
            {item.employee_type === 'offship' && item.last_experience && (
              <Box
                sx={{
                  mb: '16px',
                  display: 'flex',
                  flexDirection: isXs ? 'column' : 'row',
                  alignItems: 'start'
                }}
              >
                <Typography
                  sx={{ flexShrink: 0, width: '150px', fontSize: 16, fontWeight: 'bold', mb: isXs ? '4px' : 0 }}
                >
                  Last Experience
                </Typography>
                <Typography
                  sx={{
                    display: 'block',
                    wordBreak: 'break-word'
                  }}
                >
                  <BoxedText>{item.last_experience.position ?? '-'}</BoxedText>{' '}
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >
                    at {item.last_experience.institution ?? '-'}
                  </span>{' '}
                  <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />{' '}
                  <span style={{ color: '#949EA2', fontSize: 14, fontWeight: 300 }}>{`${
                    getMonthYear(item.last_experience.start_date, true) ?? '-'
                  } - ${
                    item.last_experience.end_date ? getMonthYear(item.last_experience.end_date, true) : 'Present'
                  }`}</span>
                </Typography>
              </Box>
            )}
            {item.last_education && (
              <Box
                sx={{
                  mb: '16px',
                  display: 'flex',
                  flexDirection: isXs ? 'column' : 'row',
                  alignItems: 'start'
                }}
              >
                <Typography
                  sx={{ flexShrink: 0, width: '150px', fontSize: 16, fontWeight: 'bold', mb: isXs ? '4px' : 0 }}
                >
                  Education
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Typography
                    sx={{
                      display: 'block',
                      wordBreak: 'break-word'
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold'
                      }}
                    >
                      {item.last_education?.title ?? '-'}
                    </span>{' '}
                    <Icon icon='ion:ellipse' fontSize={6} style={{ color: '#949EA2' }} />{' '}
                    <span style={{ color: '#949EA2', fontSize: 14, fontWeight: 300 }}>{`${
                      getMonthYear(item.last_education?.start_date, true) ?? '-'
                    } - ${
                      item.last_education?.end_date ? getMonthYear(item.last_education.end_date, true) : 'Present'
                    }`}</span>
                  </Typography>
                  <Typography
                    sx={{
                      display: 'block',
                      wordBreak: 'break-word'
                    }}
                  >
                    <BoxedText>{item.last_education?.major ?? '-'}</BoxedText>{' '}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 300
                      }}
                    >
                      {item.last_education?.degree ?? '-'}
                    </span>
                  </Typography>
                </Box>
              </Box>
            )}
            {isXs && isSubs && (
              <Button
                disabled={!item.phone}
                variant='contained'
                onClick={() => handleChatWhatsapp(item.phone ?? '')}
                startIcon={<Icon icon='ph:whatsapp-logo' />}
                sx={{ width: '100%', textTransform: 'none', fontSize: 14, fontWeight: 300 }}
              >
                Message
              </Button>
            )}
            {isXs && !isSubs && <ModalUnlockPlus text='Unlock to Offer and Message Candidate' />}
          </Box>
        </Paper>
      </Grid>
    )
  })
}

const RecomendedView = (props: Props) => {
  const { listCandidate } = props
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  return <Grid container>{RenderList(listCandidate, isXs, props.setOpenDialogOfferCandidate)}</Grid>
}

export default RecomendedView
