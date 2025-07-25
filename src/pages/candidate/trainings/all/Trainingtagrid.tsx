import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

const columns: GridColDef[] = [
  { field: 'no', headerName: '#', sortable: true, width: 50 },
  { field: 'title', headerName: 'Title', sortable: true, minWidth: 350 },
  { field: 'schedule', headerName: 'Schedule', sortable: false, minWidth: 200 },
  { field: 'category', headerName: 'Category', sortable: false, minWidth: 300 },
  { field: 'short_description', headerName: 'Description', sortable: false, minWidth: 150 },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    minWidth: 150,
    renderCell: cell => {
      const { row } = cell

      return (
        <>
          <IconButton onClick={() => row.actions.onView()} aria-label='view' color='secondary' size='small'>
            <Icon icon='solar:eye-scan-bold-duotone' style={{ fontSize: '24px' }} />
          </IconButton>
        </>
      )
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
  title: string
  schedule: string
  category: string
  short_description: string
  actions: {
    onView: VoidFunction
  }
}

export { type RowItem }

export default function AccountDatagrid(props: RoleGridProps) {
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
