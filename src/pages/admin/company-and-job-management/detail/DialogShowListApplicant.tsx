import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import { Box, Fade, FadeProps, Stack, Typography } from '@mui/material'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { GridPaginationModel } from '@mui/x-data-grid'
import ListApplicantDataGrid, { RowItem } from './ListApplicantDataGrid'
import Applicant from 'src/contract/models/applicant'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  selectedItem: Job
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

interface IStatusApplicants {
  status: string
  total: number
}

const DialogShowListApplicant = (props: DialogProps) => {
  const [loadingTable, setLoadingTable] = useState(true)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [statusApplicants, setStatusApplicants] = useState<IStatusApplicants[]>([])

  // detail
  const { company, category, job_title, vesseltype_id, role_type, count_applicant } = props.selectedItem

  const handleListApplicant = async () => {
    setLoadingTable(true)
    try {
      const response = await HttpClient.get(`/job/${props.selectedItem.id}/appllicants?page=${page}&take=${perPage}`)
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }

      const rows = response?.data?.applicants?.data as Applicant[]
      const items: RowItem[] = rows.map((row, index) => {
        return {
          id: row?.id,
          no: index + 1,
          name: row?.user?.name,
          email: row?.user?.email,
          status: row?.status,
          appliedDate: row?.created_at
        }
      })

      setRowCount(response?.data?.applicants?.total ?? 0)
      setDataSheet(items)

      setLoadingTable(false)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
      setLoadingTable(false)
    }
  }

  const handeGetCountStatus = async () => {
    const response = await HttpClient.get(`/job/${props.selectedItem.id}/appllicants/count-statuses`)

    if (response.status != 200) {
      throw response.data.message ?? 'Something went wrong!'
    }

    setStatusApplicants(response?.data?.data)
  }

  const onPageChange = (model: GridPaginationModel) => {
    const mPage = model.page + 1
    setPage(mPage)
    setPerPage(model.pageSize)
  }

  useEffect(() => {
    handleListApplicant()
    handeGetCountStatus()
  }, [])

  return (
    <Dialog
      fullWidth
      open={props.visible}
      maxWidth='md'
      scroll='body'
      TransitionComponent={Transition}
      onClose={props.onCloseClick}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '20px' }}>
        <Stack direction={'column'} gap={2}>
          <Typography gutterBottom variant='h5' component='div'>
            {category?.name}, {vesseltype_id && vesseltype_id !== null ? job_title : role_type?.name}
          </Typography>
          <Typography variant='body1'>{company?.name}</Typography>
          <Typography variant='body1' color={'gray'}>
            {count_applicant} Applicants
          </Typography>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 2 }}>
          {statusApplicants.map(s => (
            <Stack direction={'row'} gap={1}>
              <Typography variant='body1' sx={{ fontWeight: 700 }}>
                {s?.status === 'RJ'
                  ? 'Rejected'
                  : s?.status === 'VD'
                  ? 'Viewed'
                  : s?.status === 'PR'
                  ? 'Proceed'
                  : 'Waiting Review'}
                :
              </Typography>
              <Typography variant='body1'>{s?.total}</Typography>
            </Stack>
          ))}
        </Box>
        <ListApplicantDataGrid
          page={page - 1} // di MUI page pertama = 0
          rowCount={rowCount}
          pageSize={perPage}
          loading={loadingTable}
          onPageChange={model => onPageChange(model)}
          rows={dataSheet}
        />
      </Box>
    </Dialog>
  )
}

export default DialogShowListApplicant
