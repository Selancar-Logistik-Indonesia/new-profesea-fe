import { Icon } from '@iconify/react'
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { format } from 'date-fns'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import Applicant from 'src/contract/models/applicant'
import { HttpClient } from 'src/services'
import { calculateAge, getMonthYear } from 'src/utils/helpers'
import MenuAction from './MenuAction'

interface CandidateProps {
  candidates: Applicant[]
  refetch: VoidFunction
}

const TableCellStyled = styled(TableCell)<TableCellProps>(() => ({
  fontSize: 14,
  fontWeight: 600,
  color: '#404040',
  textTransform: 'none',
  padding: 0
}))

const statusStyles = {
  WR: { label: 'Waiting', bgColor: '#FFEBCF', fontColor: '#FE9602' },
  VD: { label: 'Viewed', bgColor: '#D7CBF9', fontColor: '#7B61FF' },
  PR: { label: 'Proceed', bgColor: '#CBE2F9', fontColor: '#0B58A6' },
  RJ: { label: 'Not Suitable', bgColor: '#FFD9D9', fontColor: '#FF2222' },
  AP: { label: 'Hired', bgColor: '#D9F2DA', fontColor: '#4CAF50' },
  WD: { label: null, bgColor: null, fontColor: null }
}

const StatusBox = ({ applicantStatus }: { applicantStatus: 'WR' | 'WD' | 'VD' | 'PR' | 'RJ' | 'AP' }) => {
  const { label, bgColor, fontColor } = statusStyles[applicantStatus] || {
    label: '-',
    bgColor: 'transparent',
    fontColor: 'inherit'
  }

  return (
    <Grid container justifyContent='center'>
      <Box sx={{ backgroundColor: bgColor, p: '8px 12px', borderRadius: '4px', width: 'fit-content' }}>
        <Typography sx={{ fontSize: 12, color: fontColor }}>{label}</Typography>
      </Box>
    </Grid>
  )
}

const Candidate = (props: CandidateProps) => {
  const router = useRouter()
  const params = useSearchParams()
  const jobId = params.get('id')
  const tabs = params.get('tabs') ?? 'all'
  const { candidates, refetch } = props

  const [showShadow, setShowShadow] = useState(false)
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const changeParams = (params?: string) => {
    if (!params) return
    const updatedPathname = `/company/job-management/${jobId}`
    const newQuery = new URLSearchParams(params.toString())

    newQuery.delete('id')
    newQuery.set('tabs', params)
    router.replace(`${updatedPathname}?${newQuery.toString()}`, undefined, { shallow: true, scroll: false })
  }

  const handleScroll = () => {
    if (tableContainerRef.current) {
      const container = tableContainerRef.current
      const isScrolledToEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5
      setShowShadow(!isScrolledToEnd)
    }
  }

  useEffect(() => {
    const container = tableContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll()

      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleViewCV = async (candidate: Applicant) => {
    if (candidate.status === 'WR') {
      await handleViewed(candidate)
    }

    HttpClient.get(`/user/${candidate.user_id}/profile/resume`).then(
      response => {
        window.open(`${response.data?.path}`, '_blank', 'noreferrer')
      },
      error => {
        toast.error(`Failed to view candidate CV: ` + error.response.data.message)
      }
    )
  }

  const handleViewed = (candidate: Applicant) => {
    HttpClient.patch(`/job/appllicant/resume/view`, { applicant_id: candidate.id })
      .then(
        async () => {
          toast.success(`Successfully saved applicant: ${candidate.user.name}`)
        },
        error => {
          toast.error(`Failed to change ${candidate.user.name} status: ` + error.response.data.message)

          return
        }
      )
      .finally(() => changeParams('VD'))
  }

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', maxWidth: '100%' }} ref={tableContainerRef}>
      <Table sx={{ minWidth: 1500 }}>
        <TableHead>
          <TableRow>
            <TableCellStyled align='center' width={300}>
              Name
            </TableCellStyled>
            <TableCellStyled align='center' width={150}>
              Status
            </TableCellStyled>
            <TableCellStyled align='center'>Email</TableCellStyled>
            <TableCellStyled align='center'>Last Experience</TableCellStyled>
            <TableCellStyled align='center'>Education</TableCellStyled>
            {tabs === 'RJ' && (
              <TableCellStyled align='center' width={350}>
                Reason
              </TableCellStyled>
            )}
            <TableCellStyled align='center' width={160}>
              Application Date
            </TableCellStyled>
            <TableCellStyled
              align='center'
              width={220}
              sx={{
                position: 'sticky',
                right: 0,
                backgroundColor: '#FFF',
                zIndex: 2,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '6px',
                  boxShadow: showShadow ? '-3px 0 5px -1px rgba(0,0,0,0.1)' : 'none',
                  pointerEvents: 'none'
                }
              }}
            >
              Action
            </TableCellStyled>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates &&
            candidates.map((candidate, i) => (
              <TableRow
                key={i}
                sx={{
                  backgroundColor: i % 2 !== 0 ? '#f0f0f0' : '#FFF'
                }}
              >
                <TableCell align='left'>
                  <Box
                    component={Link}
                    href={`/profile/${candidate.user.username}`}
                    target='_blank'
                    sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', mr: '16px' }}>
                      <Avatar alt={candidate.user.name} src={candidate.user.photo} sx={{ width: 46, height: 46 }} />
                      {candidate.is_saved && (
                        <Box
                          sx={{
                            textAlign: 'center',
                            borderRadius: '4px',
                            p: '3px 4px',
                            backgroundImage: 'linear-gradient(180deg, #F9D976 0%, #F39C12 100%)',
                            color: 'white',
                            fontSize: 10,
                            fontWeight: 400
                          }}
                        >
                          Saved
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'start' }}>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {candidate.user.name}
                      </Typography>
                      <Typography sx={{ color: '#666', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {calculateAge(candidate.user.date_of_birth)} years
                      </Typography>
                      <Typography sx={{ color: '#666', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {candidate.user.address.city.city_name}, {candidate.user.address.country.nicename}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='center'>
                  <StatusBox applicantStatus={candidate.status} />
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400 }}>
                    {candidate.user.email}
                  </Typography>
                </TableCell>
                <TableCell align='left'>
                  {candidate.user.last_sea_experience !== null && candidate.user.employee_type === 'onship' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_sea_experience.rank.name}
                      </Typography>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_sea_experience.company}
                      </Typography>
                      <Typography sx={{ color: '#666', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_sea_experience.vessel_type.name} -{' '}
                        {candidate.user.last_sea_experience.vessel_name}
                      </Typography>
                    </Box>
                  ) : candidate.user.last_experience !== null && candidate.user.employee_type === 'offship' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_experience?.position}
                      </Typography>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_experience?.institution}
                      </Typography>
                      <Typography sx={{ color: '#666', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {`${getMonthYear(candidate.user.last_experience.start_date, true) ?? '-'} - ${
                          candidate.user.last_experience?.still_here === 1
                            ? 'Present'
                            : getMonthYear(candidate.user.last_experience.end_date, true) ?? 'Present'
                        }`}
                      </Typography>
                    </Box>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell align='left'>
                  {candidate.user.last_education === null && candidate.user.last_education === null ? (
                    '-'
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_education.major}
                      </Typography>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_education.title}, {candidate.user.last_education.degree}
                      </Typography>
                      <Typography sx={{ color: '#666', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {`${getMonthYear(candidate.user.last_education.start_date, true) ?? '-'} - ${
                          candidate.user.last_education.still_here
                            ? 'Present'
                            : getMonthYear(candidate.user.last_education.end_date, true)
                        }`}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                {tabs === 'RJ' && (
                  <TableCell align='center'>
                    {candidate.reject_reasons?.reason === 'others'
                      ? candidate.reject_reasons.other_reason
                      : candidate.reject_reasons?.reason ?? '-'}
                  </TableCell>
                )}
                <TableCell align='center' sx={{ whiteSpace: 'nowrap' }}>
                  {format(new Date(candidate.created_at!), 'dd/MM/yy')}
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    position: 'sticky',
                    right: 0,
                    backgroundColor: i % 2 !== 0 ? '#f0f0f0' : '#FFF',
                    zIndex: 2,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '6px',
                      boxShadow: showShadow ? '-3px 0 5px -1px rgba(0,0,0,0.1)' : 'none',
                      pointerEvents: 'none'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => handleViewCV(candidate)}
                      sx={{ width: 'fit-content', textTransform: 'none' }}
                    >
                      <Icon icon='ph:eye' fontSize={22} style={{ marginRight: 8 }} />
                      <Typography sx={{ fontSize: 12, color: 'inherit' }}>View CV</Typography>
                    </Button>
                    <MenuAction candidate={candidate} refetch={refetch} changeParams={changeParams} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Candidate
