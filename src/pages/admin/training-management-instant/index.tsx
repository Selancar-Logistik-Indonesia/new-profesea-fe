import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { Autocomplete, Box, Button, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DialogAdd from './DialogAdd';
import TrainingDatagrid, { RowItem } from './InstantTrainingtagrid';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Training from 'src/contract/models/training';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';
import { v4 } from "uuid";
import { Icon } from '@iconify/react';
import TrainingCategory from 'src/contract/models/training_category';

const InstantTrainingScreen = () => {
    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDelModal, setOpenDelModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    // const [openViewModal, setOpenViewModal] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<Training | null>(null);
    
    const [CatId, setCatId] = useState(0);
    const [TrainingCategory, getTrainingCategory] =useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");

    const [perPage, setPerPage] = useState(10);
    const getListTraining = async () => {
        try {
            const resp = await HttpClient.get(`/training?instant=1&search=${search}&page=${page}&take=${perPage}&category_id=${CatId}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.trainings.data as Training[];
            const items = rows.map((row, index) => {
                return {
                    no: index + 1,
                    id: row.id,
                    title: row.title,
                    schedule: row.schedule,
                    category: row.category.category,
                    short_description: row.short_description,
                    actions: {
                        onDelete: () => deleteHandler(row),
                        onUpdate: () => updateHandler(row),
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
    const combobox = async () =>{
        const res = await HttpClient.get(`/training-category?search=&page=1&take=250`);
        if (res.status != 200) {
            throw res.data.message ?? "Something went wrong!";
        }
        getTrainingCategory(res.data.trainingCategories.data);
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

    useEffect(() => {
        setOnLoading(true);
        getListTraining().then(() => {
            setOnLoading(false);
        });
        combobox()

    }, [page, search, hookSignature, perPage, CatId]);

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} sm={6} md={12}>
                    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                    <CardHeader
                        title={
                            <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600' ,color: '#32487A' }}>
                              List Instant Training
                            </Typography>
                          }
                        />
                        <CardContent>
                            <Grid container justifyContent="flex-start">
                                <Grid item>
                                    <Autocomplete
                                        disablePortal
                                        size='small'
                                        sx={{ mb: 2, width: '150px', mr:2 }}
                                        id="combo-box-demo"
                                        options={TrainingCategory}  getOptionLabel={(option:TrainingCategory) => option.category}
                                        renderInput={(params) => <TextField {...params} label="Training Category" />}
                                        onChange={(event: any, newValue: TrainingCategory | null)=> (newValue?.id) ? setCatId(newValue.id) : setCatId(0)}
                                        />
                                </Grid>
                                {/* <Grid item>
                                    <DatePickerWrapper>
                                        <DatePicker
                                        showTimeSelect
                                        minDate={new Date()}
                                        dateFormat='dd/MM/yyyy hh:mm aa'
                                        selected={filterDate}
                                        id='basic-input'
                                        onChange={(date: Date) => setDate(date)}
                                        placeholderText='Click to select a date'
                                        customInput={<TextField size='small' label='Schedule' variant="outlined" fullWidth />}
                                        />
                                    </DatePickerWrapper>
                                </Grid> */}
                            </Grid>
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
                </>
            )}
        </>
    )
}

InstantTrainingScreen.acl = {
    action: 'read',
    subject: 'admin-training-management'
};

export default InstantTrainingScreen
