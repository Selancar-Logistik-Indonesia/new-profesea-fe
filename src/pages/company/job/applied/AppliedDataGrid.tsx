import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { Button, Chip, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { toLinkCase } from 'src/utils/helpers'

const columns: GridColDef[] = [
  { field: 'no', headerName: '#', sortable: true, width: 50 },
  {
    field: 'name',
    headerName: 'Name',
    sortable: true,
    minWidth: 200,
    renderCell: cell => {
      const { row } = cell

      return (
        <>
          <Link href={`/profile/${row.user_id}/${toLinkCase(row.username)}`} target='_blank'>
            {row.name}
          </Link>
        </>
      )
    }
  },
  { field: 'email', headerName: 'Email', sortable: false, minWidth: 200 },
  // { field: 'phone', headerName: 'Phone', sortable: false, minWidth: 150 },
  { field: 'category', headerName: 'Category', sortable: true, minWidth: 120 },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    minWidth: 150,
    renderCell: cell => {
      const { row } = cell

      return (
        <>
          <Chip label={row.status} color='primary' />
        </>
      )
    }
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    minWidth: 450,
    renderCell: cell => {
      const { row } = cell

      return (
        <>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={() => row.actions.onDownload()} variant='contained' color='info' size='small'>
              <Icon icon='mdi:download' style={{ fontSize: '20px' }} />
              <Typography ml={1} fontSize={'12px'} color='common.white'>
                View CV
              </Typography>
            </Button>
            <Button onClick={() => row.actions.onApprove()} variant='contained' color='success' size='small'>
              {/* <Icon icon='mdi:download' style={{ fontSize: '20px' }} /> */}
              <Typography ml={1} fontSize={'12px'} color='common.white'>
                Proceed
              </Typography>
            </Button>
            <Button onClick={() => row.actions.onReject()} variant='contained' color='error' size='small'>
              {/* <Icon icon='mdi:download' style={{ fontSize: '20px' }} /> */}
              <Typography ml={1} fontSize={'12px'} color='common.white'>
                Reject
              </Typography>
            </Button>
            <Button onClick={() => row.actions.onSave()} variant='contained' color='warning' size='small'>
              <Typography ml={1} fontSize={'12px'} color='common.white'>
                Save
              </Typography>
            </Button>
            <Button onClick={() => row.actions.onChat()} variant='outlined' color='success' size='small'>
              <Icon icon='ic:baseline-whatsapp' style={{ fontSize: '20px' }} color='green' />
              {/* <Typography ml={1} fontSize={'12px'}>
                Chat
              </Typography> */}
            </Button>

            {/* <Button
              disabled={!row.subsribed}
              onClick={() => row.actions.onView()}
              variant='contained'
              color='secondary'
              size='small'
              sx={{ mr: 2 }}
            >
              <Typography ml={1} fontSize={'12px'} color='common.white'>
                View
              </Typography>
            </Button> */}
          </Box>
        </>
      )
    }
  }
]

type UserGridProps = {
  rows: RowItem[]
  loading: boolean
  pageSize: number
  page: number
  rowCount: number
  onPageChange: (model: GridPaginationModel, details: GridCallbackDetails) => void
  subsribed: boolean
}

interface RowItem {
  id: number
  name: string
  category: string
  email: string
  phone: string
  status: string
  actions: {
    onView: VoidFunction
  }
}

export { type RowItem }

export default function AppliedDataGrid(props: UserGridProps) {
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
