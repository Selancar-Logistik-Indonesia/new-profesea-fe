import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { Button, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import { format } from 'date-fns'
import { useAuth } from 'src/hooks/useAuth'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'

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
  name: string
  email: string
  phone: string
  role: string
  plan: string
  point: number
  completion_percentage: number
  resend: {
    resend: VoidFunction
  }
  actions: {
    onDelete: VoidFunction
    onUpdate: VoidFunction
    docView: VoidFunction
  }
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '50px', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 100 }}>
        <Typography variant='body1' sx={{ color: 'text.primary', fontSize: '14px' }}>
          {' '}
          ( {`${props.value}`}% )
        </Typography>
      </Box>
    </Box>
  )
}

const BorderLinearProgress = styled(LinearProgressWithLabel)(() => ({
  height: 10,
  borderRadius: 5
}))

export { type RowItem }

export default function AccountDatagrid(props: RoleGridProps) {
  const auth = useAuth()

  const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true },
    { field: 'name', headerName: 'Name', sortable: true, minWidth: 300 },
    { field: 'email', headerName: 'Email', sortable: true, minWidth: 250 },
    { field: 'phone', headerName: 'Phone', sortable: true, minWidth: 150 },
    { field: 'role', headerName: 'Role', sortable: true, minWidth: 100 },
    { field: 'type', headerName: 'Type', sortable: true, minWidth: 100 },
    { field: 'plan', headerName: 'Plan', sortable: true, minWidth: 100 },
    { field: 'point', headerName: 'Point', sortable: true, minWidth: 100 },
    {
      field: 'cp',
      headerName: 'CP',
      sortable: true,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell
        let color: any = ''
        if (row.cp >= 0 && row.cp <= 30) {
          color = 'error'
        } else if (row.cp >= 31 && row.cp <= 69) {
          color = 'warning'
        } else if (row.cp >= 70 && row.cp <= 100) {
          color = 'success'
        }

        return (
          <>
            <BorderLinearProgress value={row.cp} color={color} />
          </>
        )
      }
    },
    {
      field: 'registered_at',
      headerName: 'Registered At',
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
        pageSizeOptions={[10, 25, 50, 100]}
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
