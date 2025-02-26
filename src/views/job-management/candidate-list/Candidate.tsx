import {
  Avatar,
  Box,
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
import Applicant from 'src/contract/models/applicant'
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
    <Box sx={{ backgroundColor: bgColor, p: '4px 6px', borderRadius: '4px' }}>
      <Typography sx={{ fontSize: 12, color: fontColor }}>{label}</Typography>
    </Box>
  )
}

const Candidate = (props: CandidateProps) => {
  const { candidates, refetch } = props
  const params = useSearchParams()
  const tabs = params.get('tabs') ?? 'all'

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', maxWidth: '100%' }}>
      <Table sx={{ minWidth: 1500 }}>
        <TableHead>
          <TableRow>
            <TableCellStyled align='center'>Name</TableCellStyled>
            <TableCellStyled align='center'>Email</TableCellStyled>
            <TableCellStyled align='center'>Last Experience</TableCellStyled>
            <TableCellStyled align='center' width={160}>
              Application Date
            </TableCellStyled>
            <TableCellStyled align='center'>Education</TableCellStyled>
            {tabs === 'RJ' && (
              <TableCellStyled align='center' width={350}>
                Reason
              </TableCellStyled>
            )}
            <TableCellStyled align='center' width={150}>
              Status
            </TableCellStyled>
            <TableCellStyled
              align='center'
              width={80}
              sx={{
                position: 'sticky',
                right: 0,
                background: '#fff',
                zIndex: 2
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
                <TableCell align='center'>
                  <Box
                    component={Link}
                    href={`/profile/${candidate.user.username}`}
                    target='_blank'
                    sx={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <Avatar alt={candidate.user.name} src={candidate.user.photo} sx={{ width: 46, height: 46 }} />
                      {candidate.is_saved && (
                        <Box
                          sx={{
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
                          candidate.user.last_experience?.still_here
                            ? 'Present'
                            : getMonthYear(candidate.user.last_experience.end_date, true)
                        }`}
                      </Typography>
                    </Box>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell align='center' sx={{ whiteSpace: 'nowrap' }}>
                  {format(new Date(candidate.created_at!), 'dd/MM/yy')}
                </TableCell>
                <TableCell align='left'>
                  {candidate.user.last_education === null && candidate.user.last_education === null ? (
                    '-'
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_education.degree}
                      </Typography>
                      <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {candidate.user.last_education.title}
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
                <TableCell align='center'>
                  <StatusBox applicantStatus={candidate.status} />
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    position: 'sticky',
                    right: 0,
                    backgroundColor: 'inherit',
                    zIndex: 2,
                    boxShadow: 3
                  }}
                >
                  <MenuAction candidate={candidate} refetch={refetch} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Candidate
