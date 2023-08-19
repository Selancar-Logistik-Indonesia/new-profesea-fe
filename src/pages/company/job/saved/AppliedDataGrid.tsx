import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import Icon from 'src/@core/components/icon'

const columns: GridColDef[] = [
    { field: 'no', headerName: '#', sortable: true , width: 50},
    { field: 'name', headerName: 'Name', sortable: true , minWidth: 250},
    { field: 'username', headerName: 'Username', sortable: false , minWidth: 150},
    { field: 'email', headerName: 'Email', sortable: false, minWidth: 250 },
    { field: 'phone', headerName: 'Phone', sortable: false, minWidth: 250 },
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
                  target='blank'
                  href={'/profile/?username=' + row?.username}
                  variant='contained'
                  color='secondary'
                  size='small'
                  sx={{ mr: 2 }}
                >
                  <Icon icon='mdi:user' style={{ fontSize: '20px' }}/>
                  Profile
                </Button>
                <Button onClick={() => row.actions.onDownload()} variant='contained' color='info' size='small'>
                <Icon icon='mdi:download' style={{ fontSize: '20px' }}/>
                  <Typography ml={1} fontSize={'12px'} color='common.white'>
                    Resume
                  </Typography>
                </Button>
                {/* <Button onClick={() => row.actions.onDownload()} variant='outlined' color='secondary' size='small'>
                  <Icon icon='mdi:download' />
                  Resume
                </Button> */}
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
    username: string,
    email: string,
    phone: string,
    status: string,
    actions: {
        onDownload: VoidFunction,
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