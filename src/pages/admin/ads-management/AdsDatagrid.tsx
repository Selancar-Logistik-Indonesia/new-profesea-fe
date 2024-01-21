import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import Icon from 'src/@core/components/icon'

const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true , width: 50},
    { field: 'image', headerName: 'Location Storage', sortable: false, minWidth: 250 },
    { field: 'description', headerName: 'Description', sortable: false, minWidth: 200 },
    { field: 'cta', headerName: 'CTA', sortable: false, minWidth: 200 },
    { field: 'expired_at', headerName: 'Expired At', sortable: false, minWidth: 150 },
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
                        <Icon icon='solar:eye-scan-bold-duotone' />
                    </IconButton>
                    <IconButton onClick={() => row.actions.onUpdate()} aria-label='edit' color='warning' size='small'>
                        <Icon icon='solar:pen-new-round-bold-duotone' />
                    </IconButton>
                    <IconButton onClick={() => row.actions.onDelete()} aria-label='edit' color='error' size='small'>
                        <Icon icon='solar:trash-bin-trash-bold-duotone' />
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
    description: string,
    cta: string,
    expired_at: string,
    image: string,
    actions: {
        onDelete: VoidFunction,
        onUpdate: VoidFunction,
        onView: VoidFunction,
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