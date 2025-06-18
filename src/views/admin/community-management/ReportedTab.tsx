import { Box, Chip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { IReportReason } from 'src/contract/models/report'
import { HttpClient } from 'src/services'
import ReportedDataGrid from './ReportedDataGrid'

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
    <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
      {/* reasons filter */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <Typography sx={{fontSize:16, fontWeight:700, color:'#404040'}}>Status</Typography>
        <Chip label='All' variant= {selectedReason === null ? 'filled' : 'outlined'} onClick={() => setSelectedReason(null)}  />
        {reasons?.map((reason, i) => (
          <Chip key={i} label={reason.reason} variant={selectedReason === reason.reason ? 'filled' : 'outlined'} onClick={() => handleReasonClick(reason.reason)} />
        ))}
      </Box>

      {/* data tables */}
      <Box>
        <ReportedDataGrid reports={[]} loading={false} onChangePage={() => {}} page={1} perPage={10} activeTab={tab} rowCount={0} />
      </Box>
    </Box>
  )
}

export default ReportedTab
