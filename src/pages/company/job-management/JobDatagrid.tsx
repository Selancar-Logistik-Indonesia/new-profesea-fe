import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import Icon from 'src/@core/components/icon'
import Link from 'next/link';

const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true, minWidth: 10 },
    { field: 'role_type', headerName: 'Job Title', sortable: true, minWidth: 180 },
    { field: 'level_name', headerName: 'Role Level', sortable: true, minWidth: 120 },
    { field: 'category_name', headerName: 'Job Category', sortable: true, minWidth: 250 },
    { field: 'degree', headerName: 'Degree', sortable: true, minWidth: 180 },
    { field: 'license', headerName: 'License', sortable: false, minWidth: 200 },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        minWidth: 150,
        renderCell: (cell) => {
            const { row } = cell;

            return (
              <>
                <Tooltip title='Edit'>
                  <IconButton onClick={() => row.actions.onUpdate()} aria-label='edit' color='warning' size='small'>
                    <Icon icon='mdi:pencil' style={{ fontSize: '20px' }}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title='View'>
                  <IconButton
                    LinkComponent={Link}
                    href={`/company/job/?id=${row.id}`}
                    aria-label='view'
                    color='secondary'
                    size='small'
                  >
                    <Icon icon='mdi:eye' style={{ fontSize: '18px' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete'>
                  <IconButton onClick={() => row.actions.onDelete()} aria-label='edit' color='error' size='small'>
                    <Icon icon='mdi:trash' style={{ fontSize: '18px' }} />
                  </IconButton>
                </Tooltip>
              </>
            )
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
    id: number,
    category_name: string,
    level_name: string,
    license: string,
    degree: string,
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