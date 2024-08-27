import { Autocomplete, Box, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { IDocument } from 'src/contract/models/document'
import { HttpClient } from 'src/services'
import debounce from 'src/utils/debounce'
import CompanyAndManagementDataGrid, { RowItem } from './CompanyAndManagementDataGrid'
import toast from 'react-hot-toast'
import { GridPaginationModel } from '@mui/x-data-grid'
import DialogView from '../accounts/DialogView'
import { v4 } from 'uuid'
import ITeam from 'src/contract/models/team'
import DialogEdit from '../accounts/DialogEdit'
import DialogDelete from '../accounts/DialogDelete'

export interface ICompanyAndManagement {
  id: number
  team_id: number
  name: string
  email: string
  phone: string
  plan: string
  registration_date: string
  email_verified_at: string
  type: number
  documents: IDocument[]
  verified_at: string | null
  rejected_at: string | null
  job_post: number
  photo: string
  team: ITeam
  need_verification: boolean
}

const DOCUMENT_VERIFICATION_OPTIONS = [
  {
    id: 'verified',
    label: 'Verified'
  },
  {
    id: 'unverified',
    label: 'Unverified'
  },
  {
    id: 'needverification',
    label: 'Need Verification'
  }
]

const COMPANY_TYPE_OPTIONS = [
  {
    id: 'crewing',
    label: 'Crewing'
  },
  {
    id: 'noncrewing',
    label: 'Non-Crewing'
  }
]

const CompanyAndJobManagement = () => {
  const [search, setSearch] = useState('')
  const [docVerified, setDocVerified] = useState('')
  const [companyType, setCompanyType] = useState('')

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  const [onLoading, setOnLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ICompanyAndManagement | null>(null)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [hookSignature, setHookSignature] = useState(v4())
  const [openDelModal, setOpenDelModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value)
    }, 500),
    []
  )

  useEffect(() => {
    setOnLoading(true)
    handleGetListCompany().then(() => {
      setOnLoading(false)
    })
  }, [page, search, companyType, docVerified, hookSignature])

  const handleGetListCompany = async () => {
    const response = await HttpClient.get(
      `/company-and-job-management?search=${search}&page=${page}&take=${perPage}&company_type=${companyType}&doc_verified=${docVerified}`
    )

    if (response.status != 200) {
      throw response.data.message ?? 'Something went wrong!'
    }

    const rows = response.data?.companies.data as ICompanyAndManagement[]
    const total = response?.data?.companies.total ?? 0
    const items = rows?.map((row, index) => {
      return {
        no: index + 1,
        id: row?.id,
        name: row?.name,
        email: row?.email,
        phone: row?.phone,
        plan: row?.plan,
        verified_at: row.verified_at,
        registered_at: row.registration_date,
        rejected_at: row?.rejected_at,
        type: row?.type,
        jobPost: row?.job_post,
        needVerification: row?.need_verification,
        resend: {
          onResend: () => handleResendEmail(row)
        },
        actions: {
          docView: () => viewHandler(row),
          onDelete: () => deleteHandler(row),
          onUpdate: () => updateHandler(row)
        }
      } as unknown as RowItem
    })

    setRowCount(total)
    setDataSheet(items)
  }

  const handleResendEmail = async (row: ICompanyAndManagement) => {
    const resp = await HttpClient.get(`/user-management/resend-verification?email=` + row.email)
    if (resp.status == 200) {
      toast.success('Successfully Resend Email!')
    }
  }

  const viewHandler = (row: ICompanyAndManagement) => {
    setSelectedItem(row)
    setOpenViewModal(true)
  }

  const deleteHandler = (row: ICompanyAndManagement) => {
    setSelectedItem(row)
    setOpenDelModal(true)
  }

  const updateHandler = (row: ICompanyAndManagement) => {
    setSelectedItem(row)
    setOpenEditModal(true)
  }

  const onPageChange = (model: GridPaginationModel) => {
    const mPage = model.page + 1
    setPage(mPage)
    setPerPage(model.pageSize)
  }

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardHeader
              title={
                <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                  Company And Job Management
                </Typography>
              }
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box display={'flex'} gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                <Grid container display={'flex'} gap={2} justifyContent={'flex-start'}>
                  <Grid item flex={1}>
                    <Autocomplete
                      disablePortal
                      size='small'
                      id='documentVerification'
                      options={DOCUMENT_VERIFICATION_OPTIONS}
                      getOptionLabel={option => option.label}
                      renderInput={params => <TextField {...params} label='Document Verification' />}
                      onChange={(event: any, newValue) => (newValue !== null ? setDocVerified(newValue.id) : '')}
                    />
                  </Grid>
                  <Grid item flex={1}>
                    <Autocomplete
                      disablePortal
                      size='small'
                      id='companyType'
                      options={COMPANY_TYPE_OPTIONS}
                      getOptionLabel={option => option.label}
                      renderInput={params => <TextField {...params} label='Company Type' />}
                      onChange={(event: any, newValue) => (newValue !== null ? setCompanyType(newValue.id) : '')}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent={'flex-end'}>
                  <Grid item width={{ xs: '100%', md: '60%' }}>
                    <TextField
                      size='small'
                      sx={{ mr: 6, width: '100%' }}
                      placeholder='Search'
                      onChange={e => handleSearch(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
              <CompanyAndManagementDataGrid
                page={page - 1}
                rowCount={rowCount}
                pageSize={perPage}
                loading={onLoading}
                onPageChange={model => onPageChange(model)}
                rows={dataSheet}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {selectedItem && (
        <>
          <DialogDelete
            selectedItem={selectedItem as unknown as any}
            visible={openDelModal}
            onStateChange={() => setHookSignature(v4())}
            onCloseClick={() => setOpenDelModal(!openDelModal)}
          />
          <DialogView
            key={selectedItem.id}
            selectedItem={selectedItem as unknown as any}
            visible={openViewModal}
            onCloseClick={() => setOpenViewModal(!openViewModal)}
            onStateChange={() => setHookSignature(v4())}
          />
          <DialogEdit
            key={selectedItem.id}
            selectedItem={selectedItem as unknown as any}
            visible={openEditModal}
            onCloseClick={() => setOpenEditModal(!openEditModal)}
            onStateChange={() => setHookSignature(v4())}
          />
        </>
      )}
    </>
  )
}

CompanyAndJobManagement.acl = {
  action: 'read',
  subject: 'admin-company-and-job-management'
}

export default CompanyAndJobManagement
