import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import Icon from 'src/@core/components/icon'

const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true , minWidth: 10},
    { field: 'role_type', headerName: 'Role Type', sortable: true , minWidth: 250},
    { field: 'company_name', headerName: 'Company Name', sortable: true , minWidth: 150},
    { field: 'category_name', headerName: 'Category', sortable: false, minWidth: 250 },
    { field: 'level_name', headerName: 'Level', sortable: false, minWidth: 150 },
    { field: 'degree', headerName: 'Degree', sortable: false, minWidth: 100 },
    { field: 'salary', headerName: 'Salary', sortable: false, minWidth: 150 },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (cell) => {
            const { row } = cell;

            return (
                <>
                    <IconButton onClick={() => row.actions.onUpdate()} aria-label='edit' color='warning' size='small'>
                        <Icon icon='mdi:pencil' />
                    </IconButton>
                    <IconButton onClick={() => row.actions.onDelete()} aria-label='edit' color='error' size='small'>
                        <Icon icon='mdi:trash' />
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
    company_name: string,
    category_name: string,
    level_name: string,
    degree: string,
    salary: string,
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