import { Box, Chip } from '@mui/material'
import { useEffect, useState } from 'react'
import { IReportReason } from 'src/contract/models/report'
import { HttpClient } from 'src/services'

const ReportedTab = ({tab, search, sort}) => {
  //data
  const [reasons, setReasons] = useState<IReportReason[] | null>(null)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)

  const firstLoad = () => {
    HttpClient.get('/report/reasons').then(res => setReasons(res.data.reasons))
  }

  const handleReasonClick = (reason: string) => {
    setSelectedReason(reason)
  }

  useEffect(() => {
    firstLoad()
  }, [])

  return (
    <Box>
      {/* reasons filter */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <Chip label='All' variant= {selectedReason === null ? 'filled' : 'outlined'} onClick={() => setSelectedReason(null)}  />
        {reasons?.map((reason, i) => (
          <Chip key={i} label={reason.reason} variant={selectedReason === reason.reason ? 'filled' : 'outlined'} onClick={() => handleReasonClick(reason.reason)} />
        ))}
      </Box>
    </Box>
  )
}

export default ReportedTab
