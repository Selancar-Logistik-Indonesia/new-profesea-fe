import { Button, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import React from 'react'
import Icon from 'src/@core/components/icon'

type RoleGridProps = {
  rows: RowItem[]
  loading: boolean
  pageSize: number
  page: number
  rowCount: number
  onPageChange: (model: GridPaginationModel, details: GridCallbackDetails) => void
}

interface RowItem {
  id: number
  categoryName: string
  jobTitle: string
  roleLevel: string
  applicantApplied: string
  status: string
  actions: {
    onShowListApplicant: VoidFunction
    onDelete: VoidFunction
    onUpdate: VoidFunction
  }
}

export { type RowItem }

const JobManagementDataGrid = (props: RoleGridProps) => {
  const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true, minWidth: 5 },
    { field: 'categoryName', headerName: 'Job Category', sortable: true, minWidth: 150 },
    { field: 'jobTitle', headerName: 'Job Title', sortable: true, minWidth: 170 },
    { field: 'roleLevel', headerName: 'Role Level', sortable: true, minWidth: 150 },
    {
      field: 'applicantApplied',
      headerName: 'Applicant Applied',
      sortable: true,
      minWidth: 70,
      renderCell: cell => {
        const { row } = cell

        return (
          <>
            <p style={{ width: '100%', textAlign: 'center' }}>{row?.applicantApplied}</p>
          </>
        )
      }
    },
    {
      field: 'listApplicant',
      headerName: 'List Applicant',
      sortable: false,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell

        return (
          <>
            <Button
              variant='outlined'
              onClick={() => row.actions.onShowListApplicant()}
              aria-label='edit'
              color='secondary'
              size='small'
            >
              List Applicant
            </Button>
          </>
        )
      }
    },
    { field: 'status', headerName: 'Status', sortable: false, minWidth: 150 },
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

export default JobManagementDataGrid
