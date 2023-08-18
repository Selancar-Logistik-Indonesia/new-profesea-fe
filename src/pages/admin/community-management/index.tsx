import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import JobDatagrid, { RowItem } from './CommunityDatagrid';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Thread from 'src/contract/models/thread';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
import DialogDelete from './DialogDelete';
import { v4 } from "uuid";
import { Icon } from '@iconify/react';

const CommunityScreen = () => {
    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openDelModal, setOpenDelModal] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<Thread | null>(null);

    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");

    const [perPage, setPerPage] = useState(10);
    const getListThread = async () => {
        try {
            const resp = await HttpClient.get(`/thread?search=${search}&page=${page}&take=${perPage}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.threads.data as Thread[];
            const items = rows.map((row, index) => {
                return {
                    no: index + 1,
                    id: row.id,
                    title: row.title,
                    content: row.snap_content,
                    username: row.user.name,
                    forum_name: row.forum.name,
                    actions: {
                        onDelete: () => deleteHandler(row),
                    }
                } as RowItem;
            });

            setRowCount(resp?.data?.threads?.total ?? 0);
            setDataSheet(items);
        } catch (error) {
            let errorMessage = "Something went wrong!";

            if (error instanceof AxiosError) {
                errorMessage = error?.response?.data?.message ?? errorMessage;
            }

            if (typeof error == 'string') {
                errorMessage = error;
            }

            toast.error(`Opps ${errorMessage}`);
        }
    }

    const handleSearch = useCallback(
        debounce((value: string) => {
            setSearch(value);
        }, 500), []
    );

    const onPageChange = (model: GridPaginationModel) => {
        const mPage = model.page + 1;
        setPage(mPage);
        setPerPage(model.pageSize);
    }

    const deleteHandler = (row: Thread) => {
        setSelectedItem(row);
        setOpenDelModal(true);
    }


    useEffect(() => {
        setOnLoading(true);
        getListThread().then(() => {
            setOnLoading(false);
        });
    }, [page, search, hookSignature, perPage]);

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} sm={6} md={12}>
                    <Card>
                        <CardHeader title='List Threads' />
                        <CardContent>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <TextField
                                        size='small'
                                        sx={{ mr: 3, mb: 1 }}
                                        placeholder='Search'
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </Grid>
                                <Grid item sx={{ mb: 3 }}>
                                    <Box>
                                        <Button variant='contained' href='create' size='medium' startIcon={<Icon icon='mdi:tooltip-plus-outline' fontSize={16} />}>
                                            Create Thread
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>

                            <JobDatagrid
                                page={page - 1} // di MUI page pertama = 0
                                rowCount={rowCount}
                                pageSize={perPage}
                                loading={onLoading}
                                onPageChange={(model) => onPageChange(model)}
                                rows={dataSheet} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {selectedItem && (
                <>
                    <DialogDelete selectedItem={selectedItem}
                        visible={openDelModal}
                        onStateChange={() => setHookSignature(v4())}
                        onCloseClick={() => setOpenDelModal(!openDelModal)} />
                    {/* <DialogEdit key={selectedItem.id} selectedItem={selectedItem}
                        visible={openEditModal}
                        onCloseClick={() => setOpenEditModal(!openEditModal)}
                        onStateChange={() => setHookSignature(v4())} /> */}
                </>
            )}
        </>
    )
}

CommunityScreen.acl = {
    action: 'read',
    subject: 'admin-community-management'
};

export default CommunityScreen
