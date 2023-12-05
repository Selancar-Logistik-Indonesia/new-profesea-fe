import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Button  } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'no', headerName: '#', sortable: true },
  { field: 'description', headerName: 'Name Group of Alumni', sortable: true, minWidth: 300 },
  { field: 'sekolah', headerName: 'Institution', sortable: true, minWidth: 200 },
  { field: 'user', headerName: 'Admin Alumni', sortable: true, minWidth: 250 },
  {
    field: 'member',
    headerName: 'Alumni',
    sortable: false,
    minWidth: 150,
    renderCell: cell => {
      const { row } = cell

      return (
        <>
          <Button variant='contained' onClick={() => row.actions.view()} aria-label='edit' color='primary' size='small'>
            {row.member}
          </Button>
        </>
      )
    }
  },
  {
    field: 'statusaktif',
    headerName: 'Status',
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
            {row.statusaktif == false ? 'UNVERIFIED' : 'VERIFY'}
          </Button>
        </>
      )
    }
  }
  // {
  //   field: 'action',
  //   headerName: 'Action',
  //   sortable: false,
  //   renderCell: cell => {
  //     const { row } = cell

  //     return (
  //       <>
  //         <IconButton onClick={() => row.actions.onUpdate()} aria-label='edit' color='warning' size='small'>
  //           <Icon icon='solar:pen-new-round-bold-duotone' />
  //         </IconButton>
  //         <IconButton onClick={() => row.actions.onDelete()} aria-label='edit' color='error' size='small'>
  //           <Icon icon='solar:trash-bin-trash-bold-duotone' />
  //         </IconButton>
  //       </>
  //     )
  //   }
  // }
]
 
type RoleGridProps = {
    rows: RowItem[];
    loading: boolean;
    pageSize: number;
    page: number;
    rowCount: number;
    onPageChange: (model: GridPaginationModel, details: GridCallbackDetails) => void;
}
 
interface RowItem {
  id: number
  sekolah: string
  user: string
  member: string
  statusaktif: string

  actions: {
    docView: VoidFunction
  }
}

export {
    type RowItem,
}

export default function AccountDatagrid(props: RoleGridProps) {
    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
                disableColumnMenu
                loading={props.loading}
                rows={props.rows}
                columns={columns}
                paginationMode="server"
                rowCount={props.rowCount}
                pageSizeOptions={[10, 25, 50, 100]}
                onPaginationModelChange={props.onPageChange}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: props.pageSize,
                            page: props.page,
                        },
                    },
                }}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
            />
        </Box>
    );
}