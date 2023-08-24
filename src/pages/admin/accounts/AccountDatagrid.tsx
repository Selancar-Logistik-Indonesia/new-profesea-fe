import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import Icon from 'src/@core/components/icon'

const columns: GridColDef[] = [
  { field: 'no', headerName: '#', sortable: true },
  { field: 'name', headerName: 'Name', sortable: true, minWidth: 200 },
  { field: 'email', headerName: 'Email', sortable: true, minWidth: 250 },
  { field: 'phone', headerName: 'Phone', sortable: true, minWidth: 150 },
  { field: 'role', headerName: 'Role', sortable: true, minWidth: 100 },
  { field: 'type', headerName: 'Type', sortable: true, minWidth: 100 },
  { field: 'plan', headerName: 'Plan', sortable: true, minWidth: 100 },
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
 
type RoleGridProps = {
    rows: RowItem[];
    loading: boolean;
    pageSize: number;
    page: number;
    rowCount: number;
    onPageChange: (model: GridPaginationModel, details: GridCallbackDetails) => void;
}

interface RowItem {
    id:number,
    name: string,
    email: string,
    phone: string,
    role: string,
    plan: string,
    actions: {
        onDelete: VoidFunction,
        onUpdate: VoidFunction,
    };
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
                pageSizeOptions={[10, 25, 50, 100, 250]}
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