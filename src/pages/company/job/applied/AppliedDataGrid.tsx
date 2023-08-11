import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Button, Chip, Typography } from '@mui/material';
import Icon from 'src/@core/components/icon'

const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true , width: 50},
    { field: 'name', headerName: 'Name', sortable: true , minWidth: 250},
    { field: 'category', headerName: 'Category', sortable: false, minWidth: 150 },
    { field: 'email', headerName: 'Email', sortable: false, minWidth: 230 },
    { field: 'phone', headerName: 'Phone', sortable: false, minWidth: 150 },
    { field: 'status', headerName: 'Status', sortable: false, minWidth: 130, 
        renderCell: (cell) => {
        const { row } = cell;

            return (
              <>
                <Chip label={row.status} color='primary' />
                
              </>
            )
        } 
    },
    {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        minWidth: 250,
        renderCell: (cell) => {
            const { row } = cell;

            return (
              <>
                <Button
                  onClick={() => row.actions.onView()}
                  variant='outlined'
                  color='secondary'
                  size='small'
                  sx={{ mr: 2 }}
                >
                  <Icon icon='mdi:eye' />
                  <Typography ml={1} fontSize={'14px'} color='grey'>
                    {' '}
                    View
                  </Typography>
                </Button>
                <Button onClick={() => row.actions.onDownload()} variant='outlined' color='warning' size='small'>
                  <Icon icon='mdi:download' color='warning' />
                  <Typography ml={1} fontSize={'14px'} color='#DF9F23'>
                    Resume
                  </Typography>
                </Button>
              </>
            )
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