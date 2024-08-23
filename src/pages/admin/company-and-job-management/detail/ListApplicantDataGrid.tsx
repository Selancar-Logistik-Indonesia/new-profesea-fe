import { Box, Chip } from '@mui/material'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import React from 'react'

const StatusLabel = (status: string) => {
  const label =
    status === 'RJ' ? 'Rejected' : status === 'VD' ? 'Viewed' : status === 'PR' ? 'Proceed' : 'Waiting Review'
  const color = status === 'RJ' ? 'error' : status === 'VD' ? 'default' : status === 'PR' ? 'success' : 'primary'
  
  return <Chip label={label} color={color} />
}

const columns: GridColDef[] = [
  { field: 'no', headerName: 'No', sortable: true, minWidth: 10 },
  { field: 'name', headerName: 'Name', sortable: true, minWidth: 150 },
  { field: 'email', headerName: 'Email', sortable: false, minWidth: 300 },
  { field: 'appliedDate', headerName: 'Applied Date', sortable: true, minWidth: 150 },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    minWidth: 200,
    renderCell: cell => {
      const { row } = cell

      return <>{StatusLabel(row?.status)}</>
    }
  }
]

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
  no: number
  name: string
  email: string
  appliedDate: any
  status: string
}

export { type RowItem }

const ListApplicantDataGrid = (props: RoleGridProps) => {
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

export default ListApplicantDataGrid
