import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { format } from 'date-fns'
import Spinner from 'src/@core/components/spinner'
import { Icon } from '@iconify/react'
import DialogAdd from '../../job-management/DialogAdd'
import { v4 } from 'uuid'
import { GridPaginationModel } from '@mui/x-data-grid'
import JobManagementDataGrid, { RowItem } from './JobManagementDataGrid'
import Job from 'src/contract/models/job'
import DialogDelete from '../../job-management/DialogDelete'
import DialogEdit from '../../job-management/DialogEdit'
import DialogShowListApplicant from './DialogShowListApplicant'

const CompanyAndJobManagementDetail = () => {
  const [hookSignature, setHookSignature] = useState(v4())
  const params = useSearchParams()
  const selectedId = params.get('id')
  const [detail, setDetail] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingTable, setLoadingTable] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  const [selectedItem, setSelectedItem] = useState<Job | null>(null)
  const [openDelModal, setOpenDelModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openShowModal, setOpenShowModal] = useState(false)
  const router = useRouter()

  const handleGetDetail = async () => {
    try {
      const resp = await HttpClient.get(`/user-management/${selectedId}`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const detail = resp?.data?.user
      setDetail(detail)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  const handleGetListJob = async () => {
    setLoadingTable(true)
    try {
      const response = await HttpClient.get(
        `/company-and-job-management/${selectedId}/list-job?page=${page}&take=${perPage}`
      )

      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }

      const rows = response.data.jobs.data as Job[]
      const items = rows.map((row, index) => {
        return {
          no: index + 1,
          id: row.id,
          categoryName: row?.category?.name ?? '-',
          jobTitle: row?.vesseltype_id && row?.vesseltype_id !== null ? row?.job_title : row?.role_type?.name,
          roleLevel:
            row?.vesseltype_id && row?.vesseltype_id !== null ? row?.role_type?.name : row?.rolelevel?.levelName,
          status: new Date(row?.onboard_at) > new Date() ? 'Active' : 'Non Active',
          active: row?.is_active,
          applicantApplied: row?.count_applicant,
          actions: {
            onShowListApplicant: () => handleShowListApplicant(row),
            onDelete: () => deleteHandler(row),
            onUpdate: () => updateHandler(row)
          }
        } as unknown as RowItem
      })

      setRowCount(response?.data?.jobs?.total ?? 0)
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

  const onPageChange = (model: GridPaginationModel) => {
    const mPage = model.page + 1
    setPage(mPage)
    setPerPage(model.pageSize)
  }

  const deleteHandler = (row: Job) => {
    setSelectedItem(row)
    setOpenDelModal(true)
  }

  const updateHandler = (row: Job) => {
    setSelectedItem(row)
    setOpenEditModal(true)
  }

  const handleShowListApplicant = (row: Job) => {
    setSelectedItem(row)
    setOpenShowModal(true)
  }

  useEffect(() => {
    setLoading(true)
    handleGetDetail().then(async () => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    handleGetListJob()
  }, [hookSignature, page, perPage])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Button
            onClick={() => router.back()}
            size='small'
            type='button'
            variant='text'
            startIcon={<Icon icon={'solar:double-alt-arrow-left-bold-duotone'} />}
          />
        </Box>
        <Card sx={{ width: '100%', display: 'flex' }}>
          <CardMedia sx={{ width: 200, backgroundSize: 'auto' }} image={detail?.photo} />
          <CardContent sx={{ width: '70%' }}>
            <Stack direction={'column'} gap={2}>
              <Typography gutterBottom variant='h5' component='div' color={'primary'}>
                {detail?.name}
              </Typography>
              <Typography variant='h6' color='text.primary' sx={{ fontSize: '14px !important' }}>
                {detail?.is_crewing === 1 ? 'Crewing' : 'Non Crewing'}
              </Typography>
              <Typography variant='h6' color='text.primary' sx={{ fontSize: '14px !important' }}>
                {detail?.email} | {format(new Date(detail?.created_at as unknown as any), 'dd-MM-yyyy hh:mm a')}
              </Typography>
              <Typography variant='h6' color='text.primary' sx={{ fontSize: '14px !important' }}>
                {detail?.phone}
              </Typography>
              <Chip
                sx={{ width: '150px' }}
                label={detail?.verified_at !== null ? 'Verified' : 'Unverified'}
                variant='outlined'
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ alignItems: 'flex-start !important' }}>
            <Button
              size='small'
              variant='contained'
              sx={{ marginTop: '20px' }}
              onClick={() => setOpenAddModal(!openAddModal)}
            >
              <Icon
                fontSize='large'
                icon={'zondicons:add-outline'}
                color={'info'}
                style={{ fontSize: '14px', margin: 3 }}
              />{' '}
              Add
            </Button>
          </CardActions>
        </Card>
        <JobManagementDataGrid
          handleGetListJob={handleGetListJob}
          page={page - 1}
          rowCount={rowCount}
          pageSize={perPage}
          loading={loadingTable}
          onPageChange={model => onPageChange(model)}
          rows={dataSheet}
        />
      </Box>
      <DialogAdd
        visible={openAddModal}
        onStateChange={() => setHookSignature(v4())}
        onCloseClick={() => setOpenAddModal(!openAddModal)}
      />
      {selectedItem && (
        <>
          <DialogDelete
            selectedItem={selectedItem}
            visible={openDelModal}
            onStateChange={() => setHookSignature(v4())}
            onCloseClick={() => setOpenDelModal(!openDelModal)}
          />
          <DialogEdit
            key={selectedItem.id}
            selectedItem={selectedItem}
            visible={openEditModal}
            onCloseClick={() => {
              setOpenEditModal(!openEditModal)
              setSelectedItem(null)
            }}
            onStateChange={() => setHookSignature(v4())}
          />
          <DialogShowListApplicant
            key={selectedId}
            selectedItem={selectedItem}
            visible={openShowModal}
            onCloseClick={() => {
              setOpenShowModal(!openShowModal)
              setSelectedItem(null)
            }}
            onStateChange={() => setHookSignature(v4())}
          />
        </>
      )}
    </>
  )
}

CompanyAndJobManagementDetail.acl = {
  action: 'read',
  subject: 'admin-company-and-job-management'
}

export default CompanyAndJobManagementDetail
