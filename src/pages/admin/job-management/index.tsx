import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { Autocomplete, Box, Button, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DialogAdd from './DialogAdd';
import JobDatagrid, { RowItem } from './JobDatagrid';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Job from 'src/contract/models/job';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
import DialogDelete from './DialogDelete';
import DialogEdit from './DialogEdit';
import { v4 } from "uuid";
import { Icon } from '@iconify/react';
import RoleType from 'src/contract/models/role_type';
import JobCategory from 'src/contract/models/job_category';
import RoleLevel from 'src/contract/models/role_level';

const JobScreen = () => {
    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDelModal, setOpenDelModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<Job | null>(null);
    const [filterJC, setJC] = useState<any>(0);
    const [filterJT, setJT] = useState<any>(0);
    const [filterRL, setRL] = useState<any>(0);

    const [JobCategory, getJobCategory] = useState<any[]>([]);
    const [RoleLevel, getRoleLevel] = useState<any[]>([]);
    const [RoleType, getRoleType] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");

    const [perPage, setPerPage] = useState(10);
    const getListJob = async () => {
        try {
            const resp = await HttpClient.get(`/job?search=${search}&page=${page}&take=${perPage}&category_id=${filterJC}&rolelevel_id=${filterRL}&roletype_id=${filterJT}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!1";
            }

            const rows = resp.data.jobs.data as Job[];
            const items = rows.map((row, index) => {
                const license:any[] = Object.values(row.license)
                
                return {
                    no: index + 1,
                    id: row.id,
                    role_type: row?.role_type?.name,
                    company_name: row.company.name,
                    category_name: row.category.name,
                    level_name: row.rolelevel.levelName,
                    degree: row.degree.name,
                    license:  license.map(e => e.title).join(", "),
                    salary: `Rp. ${row.salary_start} - Rp. ${row.salary_end}`,
                    actions: {
                        onDelete: () => deleteHandler(row),
                        onUpdate: () => updateHandler(row),
                    }
                } as RowItem;
            });

            setRowCount(resp?.data?.jobs?.total ?? 0);
            setDataSheet(items);
        } catch (error) {
            let errorMessage = "Something went wrong!2";

            if (error instanceof AxiosError) {
                errorMessage = error?.response?.data?.message ?? errorMessage;
            }

            if (typeof error == 'string') {
                errorMessage = error;
            }

            toast.error(`Opps ${errorMessage}`);
        }
    }

    const combobox = async () => {
        HttpClient.get(`/public/data/role-level?search=&page=1&take=250`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getRoleLevel(response.data.roleLevels.data);
        })
        HttpClient.get(`/public/data/role-type?search=&page=1&take=250`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getRoleType(response.data.roleTypes.data);
        })
        HttpClient.get(`/job-category?search=&page=1&take=250`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            getJobCategory(response.data.categories.data);
        })
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

    const deleteHandler = (row: Job) => {
        setSelectedItem(row);
        setOpenDelModal(true);
    }

    const updateHandler = (row: Job) => {
        setSelectedItem(row);
        setOpenEditModal(true);
    }

    useEffect(() => {
        setOnLoading(true);
        getListJob().then(() => {
            setOnLoading(false);
        });
        combobox()
    }, [page, search, hookSignature, perPage, filterJC, filterJT, filterRL]);

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} sm={6} md={12}>
                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                    <CardHeader
                        title={
                            <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600' ,color: '#32487A' }}>
                              List Jobs
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
                                        id='jobtitle'
                                        options={RoleType}
                                        getOptionLabel={(option: RoleType) => option.name} 
                                        renderInput={params => <TextField {...params} label='Job Title' />}
                                        onChange={(event: any, newValue: RoleType | null) =>
                                            newValue?.id ? setJT(newValue.id) : setJT(0)
                                        }
                                        />
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        disablePortal
                                        size='small'
                                        sx={{ mb: 2, width: '150px', mr:2 }}
                                        id='combo-box-demo'
                                        options={JobCategory}
                                        getOptionLabel={(option: JobCategory) => option.name}
                                        renderInput={params => <TextField {...params} label='Job Category' />}
                                        onChange={(event: any, newValue: JobCategory | null) =>
                                            newValue ? setJC(newValue.id) : setJC(0)
                                        }
                                        />
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        disablePortal
                                        size='small'
                                        sx={{ mb: 2, width: '150px', mr:2 }} 
                                        id='combo-box-level'
                                        options={RoleLevel}
                                        getOptionLabel={(option: RoleLevel) => option.levelName}
                                        renderInput={params => <TextField {...params} label='Role Level' />}
                                        onChange={(event: any, newValue: RoleLevel | null) =>
                                            newValue?.id ? setRL(newValue.id) : setRL(0)
                                        }
                                        />
                                </Grid>
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

JobScreen.acl = {
    action: 'read',
    subject: 'admin-job-management'
};

export default JobScreen
