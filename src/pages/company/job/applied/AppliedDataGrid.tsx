import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import Icon from 'src/@core/components/icon'

const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true , width: 50},
    { field: 'name', headerName: 'Name', sortable: true , minWidth: 250},
    { field: 'category', headerName: 'Category', sortable: false, minWidth: 150 },
    { field: 'email', headerName: 'Phone', sortable: false, minWidth: 100 },
    { field: 'phone', headerName: 'Email', sortable: false, minWidth: 300 },
    { field: 'status', headerName: 'Status', sortable: false, minWidth: 100, 
        renderCell: (cell) => {
        const { row } = cell;

            return (
                <>
                    <Button color='warning' size='small' >
                        {row.status}
                    </Button>
                </>
            );
        } 
    },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        minWidth: 150,
        renderCell: (cell) => {
            const { row } = cell;

            return (
                <>
                    <IconButton onClick={() => row.actions.onView()} aria-label='view' color='secondary' size='small'>
                        <Icon icon='mdi:eye' />
                    </IconButton>
                </>
            );
        }
    },
];

type UserGridProps = {
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
    category: string,
    email: string,
    phone: string,
    status: string,
    actions: {
        onView: VoidFunction,
    };
}

export {
    type RowItem,
}

export default function AppliedDataGrid(props: UserGridProps) {
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