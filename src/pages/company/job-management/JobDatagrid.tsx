import * as React from 'react'
import Box from '@mui/material/Box'
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  MuiEvent
} from '@mui/x-data-grid'
import IOSSwitch from 'src/layouts/components/IOSSwitch'
import { IconButton, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { HttpClient } from 'src/services'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

const handleChangeStatus = async (selectedId: number, is_active: boolean) => {
  try {
    const response = await HttpClient.patch(`/job/change-status/${selectedId}`, {
      is_active
    })

    if (response.status != 200) {
      throw response.data.message ?? 'Something went wrong!'
    }
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

type RoleGridProps = {
  rows: RowItem[]
  loading: boolean
  pageSize: number
  page: number
  rowCount: number
  onPageChange: (model: GridPaginationModel, details: GridCallbackDetails) => void
  onRowClick?: (
    params: GridRowParams,
    events: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => void
  getListJob: () => void
}

interface RowItem {
  id: number
  category_name: string
  level_name: string
  license: string
  degree: string
  actions: {
    onDelete: VoidFunction
    onUpdate: VoidFunction
  }
}

export { type RowItem }

export default function AccountDatagrid(props: RoleGridProps) {
  const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true, minWidth: 10 },
    {
      field: 'category_name',
      headerName: 'Job Category',
      sortable: true,
      minWidth: 250,
      renderCell: cell => {
        const { row } = cell
  
        return <Link href={`/company/job/?tabs=1&id=${row.id}`}>{row.category_name}</Link>
      }
    },
    { field: 'role_type', headerName: 'Job Title', sortable: true, minWidth: 180 },
    { field: 'level_name', headerName: 'Role Level', sortable: true, minWidth: 120 },
    { field: 'degree', headerName: 'Degree', sortable: true, minWidth: 180 },
    { field: 'license', headerName: 'License', sortable: false, minWidth: 200 },
    {
      field: 'is_active',
      headerName: 'active',
      sortable: false,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell
  
        return (
          <IOSSwitch
            checked={row.is_active}
            onClick={(e: any) => {
              const c = confirm('Are you sure want to update Job Active status ? ')
              // alert(e.target.value)
              if (c === true) {
                e.target.checked = e.target.checked
                handleChangeStatus(row.id, e.target.checked)
                props.getListJob()
              } else {
                e.target.checked = !e.target.checked
              }
            }}
          />
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
            <Tooltip title='View'>
              <IconButton
                LinkComponent={Link}
                href={`/company/job/?id=${row.id}`}
                aria-label='view'
                color='secondary'
                size='small'
              >
                <Icon icon='solar:eye-scan-bold-duotone' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Edit'>
              <IconButton onClick={() => row.actions.onUpdate()} aria-label='edit' color='warning' size='small'>
                <Icon icon='solar:pen-new-round-bold-duotone' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton onClick={() => row.actions.onDelete()} aria-label='edit' color='error' size='small'>
                <Icon icon='solar:trash-bin-trash-bold-duotone' />
              </IconButton>
            </Tooltip>
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
        onRowClick={props.onRowClick}
        getRowId={row => row.id}
      />
    </Box>
  )
}
