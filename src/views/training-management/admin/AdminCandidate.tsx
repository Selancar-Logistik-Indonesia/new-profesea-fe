import { Icon } from '@iconify/react'
import {
  Button,
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
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import ITrainingParticipant from 'src/contract/models/training_participant'
import MenuAction from '../candidate-list/MenuAction'
import ChangeScheduleDialog from './ChangeScheduleDialog'
import StatusDropdown from './StatusDropdown'

interface CandidateProps {
  candidates: ITrainingParticipant[]
}

const TableCellStyled = styled(TableCell)<TableCellProps>(() => ({
  fontSize: 14,
  fontWeight: 600,
  color: '#1F1F1F',
  textTransform: 'none',
  padding: 0
}))

const TableCellDataStyled = styled(TableCell)<TableCellProps>(() => ({
  fontSize: 14,
  fontWeight: 400,
  color: '#1F1F1F',
  textTransform: 'none',
  paddingLeft: 0
}))

const AdminCandidate = (props: CandidateProps) => {
  const router = useRouter()
  const params = useSearchParams()
  const trainingId = params.get('id')

  const { candidates } = props
  const [showShadow, setShowShadow] = useState(false)
  const [openSetScheduleModal, setOpenSetScheduleModal] = useState(false)
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const changeParams = (params?: string) => {
    if (!params) return

    router.replace(`/admin/training-management/${trainingId}/?tabs=${params}`, undefined, {
      shallow: true,
      scroll: false
    })
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

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', maxWidth: '100%' }} ref={tableContainerRef}>
      <Table sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCellStyled width={180}>Full Name</TableCellStyled>
            <TableCellStyled width={195}>Email</TableCellStyled>
            <TableCellStyled width={150}>Phone Number</TableCellStyled>
            <TableCellStyled width={205}>Address</TableCellStyled>
            <TableCellStyled align='center' width={155}>
              Date Registered
            </TableCellStyled>
            <TableCellStyled align='center' width={140}>
              Schedule
            </TableCellStyled>
            <TableCellStyled width={140}>Status</TableCellStyled>
            <TableCellStyled
              align='center'
              width={80}
              sx={{
                paddingRight: '0 !important',
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
              <>
                <TableRow
                  key={i}
                  sx={{
                    backgroundColor: i % 2 !== 0 ? '#f0f0f0' : '#FFF'
                  }}
                >
                  <TableCell align='left'>
                    <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400 }}>
                      {candidate.fullname}
                    </Typography>
                  </TableCell>
                  <TableCellDataStyled align='left'>
                    <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400 }}>{candidate.email}</Typography>
                  </TableCellDataStyled>
                  <TableCellDataStyled align='left'>
                    <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400 }}>
                      {candidate.whatsapp_number}
                    </Typography>
                  </TableCellDataStyled>
                  <TableCellDataStyled align='left'>
                    <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400 }}>
                      {candidate.address}
                    </Typography>
                  </TableCellDataStyled>
                  <TableCellDataStyled align='center' sx={{ whiteSpace: 'nowrap' }}>
                    {candidate.date_registered ? format(new Date(candidate.date_registered), 'dd/MM/yy') : 'Not set'}
                  </TableCellDataStyled>
                  <TableCellDataStyled align='center' sx={{ whiteSpace: 'nowrap' }}>
                    {candidate.schedule ? (
                      format(new Date(candidate.schedule), 'dd/MM/yy')
                    ) : (
                      <Button
                        variant='text'
                        onClick={() => setOpenSetScheduleModal(true)}
                        sx={{
                          p: '8px',
                          gap: '4px',
                          textTransform: 'none'
                        }}
                      >
                        <Icon icon='mdi:calendar' color='#32497A' fontSize={24} />
                        <Typography sx={{ color: '#32497A', fontSize: 14, fontWeight: 600 }}>Set Schedule</Typography>
                      </Button>
                    )}
                  </TableCellDataStyled>
                  <TableCellDataStyled align='left'>
                    <StatusDropdown
                      candidate={candidate}
                      applicantStatus={candidate.status}
                      changeParams={changeParams}
                    />
                  </TableCellDataStyled>
                  <TableCellDataStyled
                    align='center'
                    sx={{
                      paddingRight: '0 !important',
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
                    <MenuAction candidate={candidate} changeParams={changeParams} />
                  </TableCellDataStyled>
                </TableRow>
                <ChangeScheduleDialog
                  candidate={candidate}
                  visible={openSetScheduleModal}
                  onCloseClick={() => setOpenSetScheduleModal(false)}
                  changeParams={changeParams}
                />
              </>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminCandidate
