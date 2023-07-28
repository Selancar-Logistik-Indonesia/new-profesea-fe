import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import Icon from 'src/@core/components/icon'

const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true , width: 50},
    { field: 'role_type', headerName: 'Job Title', sortable: true , minWidth: 250},
    { field: 'level_name', headerName: 'Role Level', sortable: false, minWidth: 130 },
    { field: 'category_name', headerName: 'Job Category', sortable: false, minWidth: 250 },
    { field: 'company_name', headerName: 'Company Name', sortable: true , minWidth: 150},
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
                    <IconButton href={'/candidate/job/?id='+row.id} aria-label='view' color='secondary' size='small'>
                        <Icon icon='mdi:eye' />
                    </IconButton>
                </>
            );
        }
    },
];

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
    role_type: string,
    company_name: string,
    category_name: string,
    level_name: string,
    status: string;
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