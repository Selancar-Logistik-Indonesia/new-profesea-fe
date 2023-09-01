import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DialogAdd from './DialogAdd';
import TrainingDatagrid, { RowItem } from './Trainingtagrid';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Training from 'src/contract/models/training';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';
import { v4 } from "uuid";
import DialogView from './DialogView';
import DialogViewParticipant from './DialogViewParticipant';
import { Icon } from '@iconify/react';

const AllTrainingScreen = () => {
    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDelModal, setOpenDelModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openParticipantModal, setOpenParticipantModal] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<Training | null>(null);

    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");

    const [perPage, setPerPage] = useState(10);
    const getListTraining = async () => {
        try {
            const resp = await HttpClient.get(`/training?search=${search}&page=${page}&take=${perPage}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.trainings.data as Training[];
            const items = rows.map((row, index) => {
                return {
                    id: row.id,
                    no: index + 1,
                    title: row.title,
                    schedule: row.schedule,
                    category: row.category.category,
                    short_description: row.short_description,
                    count_participant: row.count_participant,
                    actions: {
                        onDelete: () => deleteHandler(row),
                        onUpdate: () => updateHandler(row),
                        onView: () => viewHandler(row),
                        onViewParticipants: () => openParticipantDialog(row),
                    }
                } as RowItem;
            });

            setRowCount(resp?.data?.trainings?.total ?? 0);
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

    const deleteHandler = (row: Training) => {
        setSelectedItem(row);
        setOpenDelModal(true);
    }

    const updateHandler = (row: Training) => {
        setSelectedItem(row);
        setOpenEditModal(true);
    }

    const viewHandler = (row: Training) => {
        setSelectedItem(row);
        setOpenViewModal(true);
    }

    const openParticipantDialog = (row: Training) => {
        setSelectedItem(row);
        setOpenParticipantModal(true);
    }

    useEffect(() => {
        setOnLoading(true);
        getListTraining().then(() => {
            setOnLoading(false);
        });
    }, [page, search, hookSignature, perPage]);

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} sm={6} md={12}>
                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                        <CardHeader  title={
                            <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600' ,color: '#32487A' }}>
                              List Training
                            </Typography>
                          }
                        />
                        <CardContent>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <TextField
                                        size='small'
                                        sx={{ mr: 6, mb: 2 }}
                                        placeholder='Search'
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </Grid>
                                <Grid item sx={{ mr: 6, mb: 2 }}>
                                    <Box>
                                        <Button variant='contained' size='small' onClick={() => setOpenAddModal(!openAddModal)}>
                                            <Icon
                                                fontSize='large'
                                                icon={'zondicons:add-outline'}
                                                color={'info'}
                                                style={{ fontSize: '14px', margin: 3 }}
                                            /> Add
                                        </Button>
                                    </Box>
                                </Grid> 
                            </Grid>

                            <TrainingDatagrid
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

            <DialogAdd visible={openAddModal}
                onStateChange={() => setHookSignature(v4())}
                onCloseClick={() => setOpenAddModal(!openAddModal)} />
            {selectedItem && (
                <>
                    <DialogDelete selectedItem={selectedItem}
                        visible={openDelModal}
                        onStateChange={() => setHookSignature(v4())}
                        onCloseClick={() => setOpenDelModal(!openDelModal)} />
                    <DialogEdit key={selectedItem.id} selectedItem={selectedItem}
                        visible={openEditModal}
                        onCloseClick={() => setOpenEditModal(!openEditModal)}
                        onStateChange={() => setHookSignature(v4())} />
                    <DialogView key={selectedItem.id} selectedItem={selectedItem}
                        visible={openViewModal}
                        onCloseClick={() => setOpenViewModal(!openViewModal)}
                        onStateChange={() => setHookSignature(v4())} />
                    <DialogViewParticipant key={selectedItem.id} selectedItem={selectedItem}
                        visible={openParticipantModal}
                        onCloseClick={() => setOpenParticipantModal(!openParticipantModal)}
                        onStateChange={() => setHookSignature(v4())} />
                </>
            )}
        </>
    )
}

AllTrainingScreen.acl = {
    action: 'read',
    subject: 'user-training-management'
}

export default AllTrainingScreen
