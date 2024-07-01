import * as React from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { Button, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { formatIDR } from 'src/utils/helpers'

const columns: GridColDef[] = [
  { field: 'no', headerName: '#', sortable: true, width: 50 },
  { field: 'title', headerName: 'Title', sortable: true, minWidth: 250 },
  { field: 'schedule', headerName: 'Schedule', sortable: true, minWidth: 200 },
  { field: 'category', headerName: 'Category', sortable: true, minWidth: 250 },
  { field: 'short_description', headerName: 'Description', sortable: false, minWidth: 100 },
  {
    field: 'count_participant',
    headerName: 'Participants',
    sortable: true,
    minWidth: 120,
    renderCell: cell => {
      const { row } = cell

      return (
        <Button onClick={() => row.actions.onViewParticipants()} variant='text'>
          {row.count_participant}
        </Button>
      )
    }
  },
  {
    field: 'price',
    headerName: 'Price',
    sortable: false,
    minWidth: 150,
    renderCell: cell => {
      const { row } = cell

      return <p>{formatIDR(row?.price, true)}</p>
    }
  },
  {
    field: 'discounted_price',
    headerName: 'Discount Price',
    sortable: false,
    minWidth: 150,
    renderCell: cell => {
      const { row } = cell

      return <Typography>{row?.discounted_price !== null ? formatIDR(row?.discounted_price, true) : '-'}</Typography>
    }
  },
  {
    field: 'cta',
    headerName: 'CTA',
    sortable: false,
    minWidth: 150,
    renderCell: cell => {
      const { row } = cell

      return (
        <Typography
          sx={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => {
            if (!row?.cta) {
              return
            }

            window.open(row?.cta, '_blank')
          }}
        >
          {row?.cta ? row?.cta : '-'}
        </Typography>
      )
    }
  },
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
            <Icon icon='solar:eye-scan-bold-duotone' />
          </IconButton>
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
    onDelete: VoidFunction
    onUpdate: VoidFunction
    onView: VoidFunction
    onViewParticipants: VoidFunction
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
