import React from 'react'

import { Box } from '@mui/system'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { Button, IconButton, Typography } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'

type RoleGridProps = {
  rows: RowItem[]
  loading: boolean
  pageSize: number
  page: number
  rowCount: number
  onPageChange: (model: GridPaginationModel, details: GridCallbackDetails) => void
}

interface RowItem {
  no: number
  id: number
  name: string
  email: string
  phone: string
  plan: string
  verified_at: string | null
  registered_at: string | null
  rejected_at: string | null
  type: string
  jobPost: string
  resend: {
    onResend: VoidFunction
  }
  actions: {
    docView: VoidFunction
    onDelete: VoidFunction
    onUpdate: VoidFunction
  }
}

export { type RowItem }

const CompanyAndManagementDataGrid = (props: RoleGridProps) => {
  const auth = useAuth()

  const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true, minWidth: 10 },
    {
      field: 'name',
      headerName: 'Company Name',
      sortable: true,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell
        
        return (
          <>
            <Link href={`/admin/company-and-job-management/detail/${row?.id}`}>{row?.name}</Link>
          </>
        )
      }
    },
    { field: 'email', headerName: 'Email', sortable: true, minWidth: 250 },
    { field: 'phone', headerName: 'Phone', sortable: true, minWidth: 150 },
    { field: 'plan', headerName: 'Plan', sortable: true, minWidth: 100 },
    {
      field: 'registered_at',
      headerName: 'Registration Date',
      sortable: true,
      minWidth: 200,
      renderCell: cell => {
        const { row } = cell

        return (
          <>
            <p>{format(new Date(row.registered_at), 'dd-MM-yyyy hh:mm a')}</p>
          </>
        )
      }
    },
    {
      field: 'resend',
      headerName: 'Email Verify',
      sortable: false,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell

        return (
          <>
            <Button
              variant='contained'
              onClick={() => row.resend.onResend()}
              aria-label='edit'
              color='primary'
              size='small'
            >
              Resend
            </Button>
          </>
        )
      }
    },
    {
      field: 'type',
      headerName: 'Type',
      sortable: true,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell

        return (
          <>
            <Typography>{row.type === 1 ? 'Crewing' : 'Non-Crewing'}</Typography>
          </>
        )
      }
    },
    {
      field: 'doc',
      headerName: 'Documents',
      sortable: false,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell

        return (
          <>
            <Button
              variant='outlined'
              onClick={() => row.actions.docView()}
              aria-label='edit'
              color='secondary'
              size='small'
            >
              {row.verified_at == null
                ? row.rejected_at
                  ? 'Rejected'
                  : 'Unverified'
                : row.rejected_at
                ? 'Rejected'
                : 'Verified'}
            </Button>
          </>
        )
      }
    },
    {
      field: 'silent-login',
      headerName: 'Silent Login',
      sortable: false,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell

        return (
          <>
            <Button
              variant='outlined'
              onClick={() => {
                auth.loginSilent({ email: row.email })
              }}
              aria-label='login'
              color='secondary'
              size='small'
            >
              Login By
            </Button>
          </>
        )
      }
    },
    { field: 'jobPost', headerName: 'Job Post', sortable: true, minWidth: 100 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: cell => {
        const { row } = cell

        return (
          <>
            <IconButton onClick={() => row.actions.onUpdate()} aria-label='edit' color='warning' size='small'>
              <Icon icon='solar:pen-new-round-bold-duotone' />
            </IconButton>
            <IconButton onClick={() => row.actions.onDelete()} aria-label='edit' color='error' size='small'>
              <Icon icon='solar:trash-bin-trash-bold-duotone' />
            </IconButton>
          </>
        )
      }
    }
  ]

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        disableColumnMenu
        loading={props.loading}
        rows={props.rows}
        columns={columns}
        paginationMode='server'
        rowCount={props.rowCount}
        pageSizeOptions={[10, 25, 50, 100, 250]}
        onPaginationModelChange={props.onPageChange}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: props.pageSize,
              page: props.page
            }
          }
        }}
        disableRowSelectionOnClick
        getRowId={row => row.id}
      />
    </Box>
  )
}

export default CompanyAndManagementDataGrid
