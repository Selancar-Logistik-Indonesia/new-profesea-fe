import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { IReportedRowData } from 'src/contract/models/report'
import ActionMenu from './ActionMenu'

const ReportedDataGrid = ({
  reports,
  loading,
  onChangePage,
  page,
  perPage,
  rowCount
}: {
  reports: IReportedRowData[]
  loading: boolean
  onChangePage: any
  page: number
  perPage: number
  rowCount: number
}) => {
  const column: GridColDef[] = [
    {
      field: 'content',
      headerName: 'Content Preview',
      sortable: true,
      minWidth: 200,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'postedBy',
      headerName: 'Posted By',
      sortable: true,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'reportedBy',
      headerName: 'Reported By',
      sortable: true,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'community_name',
      headerName: 'Community',
      sortable: true,
      minWidth: 170,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'reasons',
      headerName: 'Reason(s)',
      sortable: true,
      minWidth: 170,
      align: 'center',
      headerAlign: 'center',
      renderCell: cell => {
        const { row } = cell

        return (
          <Box>
            {row.reason.map((reason: string, i: number) => (
              <Typography key={reason}>
                {reason}
                {i !== row.reason.length - 1 && ', '}
              </Typography>
            ))}
          </Box>
        )
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      minWidth: 170,
      align: 'center',
      headerAlign: 'center',
      renderCell: cell => <Typography sx={{ textTransform: 'capitalize' }}>{cell.row.status}</Typography>
    },
    { field: 'date', headerName: 'Date', sortable: true, minWidth: 170, align: 'center', headerAlign: 'center' },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      minWidth: 130,
      align: 'center',
      headerAlign: 'center',
      renderCell: cell => {
        const { row } = cell

        return <ActionMenu row={row} />
      }
    }
  ]

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        pageSizeOptions={[10, 25, 50, 100]}
        rowCount={rowCount}
        paginationMode='server'
        disableColumnMenu
        onPaginationModelChange={onChangePage}
        loading={loading}
        disableColumnFilter
        columns={column}
        rows={reports}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: perPage,
              page: page
            }
          }
        }}
        disableRowSelectionOnClick
        getRowId={row => row.id}
        getRowHeight={() => 'auto'}
      />
    </Box>
  )
}

export default ReportedDataGrid
