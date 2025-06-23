import { Box, Chip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {  IReportedFeed, IReportedRowData, IReportReason } from 'src/contract/models/report'
import { HttpClient } from 'src/services'
import ReportedDataGrid from './ReportedDataGrid'
import { formatDate } from 'src/@core/utils/format'
import { GridPaginationModel } from '@mui/x-data-grid'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'

const ReportedTab = ({search, sort} : {search: string, sort: string}) => {
  //data
  const [reasons, setReasons] = useState<IReportReason[] | null>(null)
  const [selectedReason, setSelectedReason] = useState<number | null>(null)
  const [rowData, setRowData] = useState<any>([])

  //page settings
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [rowsCount, setRowsCount] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [refetch, setRefetch] = useState(v4())
  

  const firstLoad = () => {
    setLoading(true)
    HttpClient.get('/report/reasons').then(res => setReasons(res.data.reasons)).finally(() => setLoading(false))

  }

  const allowFeed = (id: number) => {
    setLoading(true)
    HttpClient.post(`/report/${id}/allow`).then(res =>{
      console.log(res)
      if (res.status == 200) {
        toast.success('The reported post has been reviewed and marked as allowed.')
      }

      setTimeout(() => {
        setRefetch(v4())
      }, 500)
    }).catch((err) =>console.log(err)).finally(() => setLoading(false))
}

const deleteFeed = (id:number) => {
    HttpClient.post(`/report/${id}/delete`).then(res =>{
      setLoading(true)
      if (res.status == 200) {
        toast.success('The content has been successfully deleted.')
      }

      setTimeout(() => {
        setRefetch(v4())
      }, 500)
    }).catch((err) =>console.log(err)).finally(() => setLoading(false))
}

  const fetchReports = () => {
    setLoading(true)
    HttpClient.get('/report',{
      search: search,
      sort: sort,
      page:page,
      take:perPage,
      reason:selectedReason
    }).then(res => { 
      const data = res.data.reported_feed.data
      console.log(data)
      const rows : IReportedRowData[] = data.map((report: IReportedFeed) => {
        const reportId = report.id

        return {
          id: report.id,
          content: report.social_feed.content,
          postedBy: report.social_feed.user.name,
          reportedBy: report.user.name,
          community_name: report?.social_feed?.community.name,
          community_visibility: report?.social_feed?.community.is_private,
          reason: report.reason?.map((item: IReportReason) => item.reason),
          date: formatDate(report.created_at, {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }, 'en-GB'),
          status: report.status,
          feed_data: report.social_feed,
          allow: () => allowFeed(reportId),
          delete: () => deleteFeed(reportId)
        }
      })
      setRowData(rows)
      setRowsCount(res.data.reported_feed.total)
    
    }).catch(err => console.log(err)).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 700)
    })
  }

 

  const onPageChange = (model: GridPaginationModel) => {
        const mPage = model.page + 1
        setPage(mPage)
        setPerPage(model.pageSize)
      }

  const handleReasonClick = (reasonId: number) => {
    setSelectedReason(reasonId)
  }

  useEffect(() => {
    firstLoad()
    fetchReports()
  }, [])

  useEffect(() => {
    fetchReports()
  }, [selectedReason, search, sort,page, refetch])

  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
      {/* reasons filter */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
        <Typography sx={{fontSize:16, fontWeight:700, color:'#404040'}}>Status</Typography>
        <Chip label='All' variant= {selectedReason === null ? 'filled' : 'outlined'} onClick={() => setSelectedReason(null)}  />
        {reasons?.map((reason, i) => (
          <Chip key={i} label={reason.reason} variant={selectedReason === reason.id ? 'filled' : 'outlined'} onClick={() => handleReasonClick(reason.id)} />
        ))}
      </Box>

      {/* data tables */}
      <Box>
        <ReportedDataGrid reports={rowData} loading={loading} onChangePage={(model:any) => onPageChange(model)} page={page - 1} perPage={perPage} rowCount={rowsCount} />
      </Box>
    </Box>
  )
}

export default ReportedTab
