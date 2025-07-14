import { Button, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import IOSSwitch from 'src/layouts/components/IOSSwitch'
import React from 'react'
import Icon from 'src/@core/components/icon'
import { HttpClient } from 'src/services'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

type RoleGridProps = {
  rows: RowItem[]
  loading: boolean
  pageSize: number
  page: number
  rowCount: number
  onPageChange: (model: GridPaginationModel, details: GridCallbackDetails) => void
  handleGetListJob: () => void
}

interface RowItem {
  id: number
  categoryName: string
  jobTitle: string
  roleLevel: string
  applicantApplied: string
  created_at: string
  status: string
  actions: {
    onShowListApplicant: VoidFunction
    onDelete: VoidFunction
    onUpdate: VoidFunction
  }
}

export { type RowItem }

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
    {
      field: 'created_at',
      headerName: 'Posted Date',
      sortable: false,
      minWidth: 150,
      renderCell: (cell: any) => {
        const { row } = cell
        const myDate = row?.created_at.split('T')

        return <div>{myDate ? myDate[0] + ' ' + myDate[1] : ''}</div>
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      minWidth: 150,
      renderCell: (cell: any) => {
        const { row } = cell

        return <div>{row.active == true ? row.status : 'Non Active'} </div>
      }
    },
    {
      field: 'is_active',
      headerName: 'active',
      sortable: false,
      minWidth: 150,
      renderCell: cell => {
        const { row } = cell

        return (
          <IOSSwitch
            checked={row.active}
            onClick={(e: any) => {
              const c = confirm('Are you sure want to update Job Active status ? ')
              // alert(e.target.value)
              if (c === true) {
                e.target.checked = e.target.checked
                handleChangeStatus(row.id, e.target.checked)
                props.handleGetListJob()
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
