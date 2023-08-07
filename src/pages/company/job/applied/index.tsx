import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react'
import AppliedDataGrid, { RowItem } from './AppliedDataGrid';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Applicant from 'src/contract/models/applicant';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
import { v4 } from "uuid";
import DialogView from './DialogView';
import { Autocomplete, Box, Button, CardHeader, Chip, Collapse, FormControl, IconButton, Input, Typography } from '@mui/material';
import JobCategory from 'src/contract/models/job_category';
import RoleType from 'src/contract/models/role_type';
import VesselType from 'src/contract/models/vessel_type';
import { Icon } from '@iconify/react';

const status:any[] = [
    {id: 'AP' , title : 'Approved'},
    {id: 'RJ' , title : 'Rejected'},
    {id: 'WR' , title : 'Waiting Review'}
]

const dokumen = [
    { title: 'Certificate of Competency', docType: 'COC' },
    { title: 'Certificate of Profeciency', docType: 'COP' },
    { title: 'Certificate of Recognition', docType: 'COR' },
    { title: 'Certificate of Endorsement', docType: 'COE' },
    { title: 'Other Certificate', docType: 'OTH' },
    { title: 'MCU Certificates', docType: 'MCU' }, 
]
    
const EmployeeType = [
    { employee_type: 'onship', label: 'On-Ship' },
    { employee_type: 'offship', label: 'Off-Ship' }
]

const JobApplied = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const [collapsed, setCollapsed] = useState<boolean>((params.get('plan') === 'advance') ? false : true)
    const [JobCategory, getJobCategory] = useState<any[]>([])  
    const [JobTitle, getJobTitle] = useState<any[]>([])  
    const [VesselType, getVesselType] = useState<any[]>([])  
    const [combocode, getCombocode] = useState<any[]>([]) 
    //   const [textCandidate, SetTextCandidate] = useState<any>('')   
    const [sJobCategory, setJobCategory] = useState<any>('')
    const [sJobTitle, setJobTitle] = useState<any>('')
    const [sVesselType, setVesselType] = useState<any>('')  
    const [comboShip, getShip] = useState<any>([])
    const [comboStatus, getStatus] = useState<any>([])
    const [values, setValues] = useState<any[]>([])
    const [currValue, setCurrValue] = useState('')
    const [valuesoneword, setValuesOneWord] = useState<any[]>([])
    const [currValueoneword, setCurrValueOneWord] = useState('')
    const [valuesexclude, setValuesExclude] = useState<any[]>([])
    const [currValueexclude, setCurrValueExclude] = useState('')
    const [valueslitle, setValuesLitle] = useState<any[]>([])
    const [currValuelitle, setCurrValueLitle] = useState('')

    const getListCombo = async () => {
        const res2 = await HttpClient.get(`/job-category?search=&page=1&take=250`)
        if (res2.status != 200) {
        throw res2.data.message ?? 'Something went wrong!'
        }
        getJobCategory(res2.data.categories.data)
        const res3 = await HttpClient.get(`/public/data/role-type?search=&page=1&take=250`)
        if (res3.status != 200) {
        throw res2.data.message ?? 'Something went wrong!'
        }
        getJobTitle(res3.data.roleTypes.data)

        const res4 = await HttpClient.get(`/public/data/vessel-type?search=&page=1&take=250`)
        if (res4.status != 200) {
        throw res4.data.message ?? 'Something went wrong!'
        }
        getVesselType(res4.data.vesselTypes.data)

        HttpClient.get('/public/data/country?search=').then(response => {
        const code = response.data.countries
        for (let x = 0; x < code.length; x++) {
            const element = code[x]
            element.label = element.name + '(' + element.phonecode + ')'
        }
        getCombocode(code)
        })
        console.log(   { combocode })    
    }
    
    useEffect(() => {
        getListCombo()
    }, [])

    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<Applicant | null>(null);
    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);

    const getListApplicant = async () => {
        try {
            const resp = await HttpClient.get(`/job/${params.get('id')}/appllicants?`+
            'vesseltype_id=' + sVesselType +
            '&roletype_id=' + sJobTitle +
            '&rolelevel_id=' + sJobCategory + 
            '&employee_type=' + (comboShip) + 
            '&status=' + comboStatus + 
            `&search=${search}&page=${page}&take=${perPage}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }
            console.log(resp.data.applicants);

            const rows = resp.data.applicants.data as Applicant[];
            const items = rows.map((row, index) => {

                return {
                    no: index + 1,
                    id: row.id,
                    name: row.user?.name,
                    category: row.user?.employee_type,
                    email: row.user?.email,
                    phone: row.user?.phone,
                    status: status.find(e => e.id === row.status).title,
                    actions: {
                        onView: () => viewHandler(row),
                        onDownload: () => resumeHandler(row),
                    }
                } as RowItem;
            });

            setRowCount(resp.data.applicants?.total ?? 0);
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

    const viewHandler = (row: Applicant) => {
        setSelectedItem(row);
        setOpenViewModal(true);
    }

    const resumeHandler = (row: Applicant) => {
        HttpClient.get(`/user/${row.user_id}/profile/resume`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            window.open(`${response.data?.path}`, '_blank', 'noreferrer');
        })
    }
    
    const handleKeyUp = (e: any) => {
        console.log(e.keyCode)
        if (e.keyCode == 32) {
        //    getdatapencarian()
        }
    }
    
    const handleKeyDown = (e: any,x:any) => {
        if (e.keyCode == 32) {
        if (x == 1) {
            setValues(oldState => [...oldState, e.target.value])
            setCurrValue('')
        } else if (x == 2) {
            setValuesOneWord(oldState => [...oldState, e.target.value])
            setCurrValueOneWord('')
        } else if (x == 3) {
            setValuesExclude(oldState => [...oldState, e.target.value])
            setCurrValueExclude('')
        } else if (x == 4) {
            setValuesLitle(oldState => [...oldState, e.target.value])
            setCurrValueLitle('')
        }
            
        }
    }
    

    const handleChange = (e: any,x:any) => {
        if (x == 1) {
        setCurrValue(e.value)
        } else if (x == 2) {
        setCurrValueOneWord(e.value)
        } else if (x == 3) {
        setCurrValueExclude(e.value)
        } else if (x == 4) {
        setCurrValueLitle(e.value)
        }
    }

    const handleDelete = (item:any, index:any,x:any) => {
        if (x == 1) {
        const arr = [...values]
        arr.splice(index, 1)
        setValues(arr)
        } else if (x == 2) {
        const arr = [...valuesoneword]
        arr.splice(index, 1)
        setValuesOneWord(arr)
        } else if (x == 3) {
        const arr = [...valuesexclude]
        arr.splice(index, 1)
        setValuesExclude(arr)
        } else if (x == 4) {
        const arr = [...valueslitle]
        arr.splice(index, 1)
        setValuesLitle(arr)
        }
        // getdatapencarian();

    }

    useEffect(() => {
        setOnLoading(true);
        getListApplicant().then(() => {
            setOnLoading(false);
        });
    }, [page, search, sVesselType, sJobTitle, sJobCategory, comboShip, comboStatus, hookSignature, perPage]);
    
    return (
            <>
                <Grid container spacing={6} className='match-height'>
                    <Grid item lg={3} md={5} xs={12}>
                        {/* <Box mb={3}>
                            <Card>
                            <CardContent>
                                <TextField
                                id='fullName'
                                // defaultValue={props.datauser.name}
                                label='Search Candidate Name'
                                variant='outlined'
                                fullWidth
                                sx={{ mb: 1 }}
                                onChange={e => SetTextCandidate(e.target.value)}
                                />
                            </CardContent>
                            </Card>
                        </Box> */}

                        <Box mb={3}>
                            <Card>
                            <CardHeader
                                title={
                                <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                                    Basic Filter
                                </Typography>
                                }
                                action={
                                <IconButton
                                    size='small'
                                    aria-label='collapse'
                                    sx={{ color: '#424242' }}
                                    onClick={() => setCollapsed(!collapsed)}
                                >
                                    <Icon fontSize={20} icon={!collapsed ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                                </IconButton>
                                }
                            />
                            <Collapse in={collapsed}>
                                <CardContent>
                                <Autocomplete
                                    disablePortal
                                    id='combo-box-demo'
                                    options={JobCategory}
                                    getOptionLabel={(option: JobCategory) => option.name}
                                    renderInput={params => <TextField {...params} label='Role Level' />}
                                    onChange={(event: any, newValue: JobCategory | null) =>
                                    newValue?.id ? setJobCategory(newValue.id) : setJobCategory('')
                                    }
                                    sx={{ marginBottom: 2 }}
                                />
                                <Autocomplete
                                    disablePortal
                                    id='combo-box-demo'
                                    options={JobTitle}
                                    getOptionLabel={(option: RoleType) => option.name}
                                    renderInput={params => <TextField {...params} label='Job Title' />}
                                    onChange={(event: any, newValue: RoleType | null) =>
                                    newValue?.id ? setJobTitle(newValue.id) : setJobTitle('')
                                    }
                                    sx={{ marginBottom: 2 }}
                                />
                                <Autocomplete
                                    disablePortal
                                    id='combo-box-demo'
                                    options={VesselType}
                                    getOptionLabel={(option: VesselType) => option.name}
                                    renderInput={params => <TextField {...params} label='Type of Vessel' />}
                                    onChange={(event: any, newValue: VesselType | null) =>
                                    newValue?.id ? setVesselType(newValue.id) : setVesselType('')
                                    }
                                    sx={{ marginBottom: 2 }}
                                />
                                <Autocomplete
                                    disablePortal
                                    id='combo-box-demo'
                                    options={EmployeeType}
                                    getOptionLabel={(option: any) => option.label}
                                    renderInput={params => <TextField {...params} label='Category' />}
                                    onChange={(event: any, newValue: any | null) =>
                                    newValue?.employee_type ? getShip(newValue?.employee_type) : getShip('')
                                    }
                                    sx={{ marginBottom: 2 }}
                                />
                                <Autocomplete
                                    disablePortal
                                    id='combo-box-demo'
                                    options={status}
                                    getOptionLabel={(option: any) => option.title}
                                    renderInput={params => <TextField {...params} label='Status' />}
                                    onChange={(event: any, newValue: any | null) =>
                                    newValue?.id ? getStatus(newValue.id) : getStatus('')
                                    }
                                    sx={{ marginBottom: 2 }}
                                />
                                </CardContent>
                            </Collapse>
                            </Card>
                        </Box>
                        <Box mb={3}>
                            <Card>
                            <CardHeader
                                title={
                                <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                                    Advanced Filter
                                </Typography>
                                }
                            />
                            <CardContent>
                            {params.get('plan') != 'advance' ? (
                                <>
                                    <Button href={'/company/job/applied/?id='+params.get('id')+'&plan=advance'} variant='outlined' color='warning'  sx={{ mr: 2 }} fullWidth>
                                        Advance Filter
                                    </Button>
                                </>  
                            ) : (
                                    <>
                                    <Autocomplete
                                        disablePortal
                                        id='code'
                                        options={dokumen}
                                        getOptionLabel={(option: any) => option.title}
                                        // defaultValue={props.datauser?.country}
                                        renderInput={params => <TextField {...params} label='License' sx={{ mb: 2 }} />}
                                        // onChange={(event: any, newValue: Dokumen | null) =>
                                        //   newValue?.id ? searchcity(newValue.id) : searchcity(0)
                                        // }
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <Typography>Including all these words</Typography>
                                    <FormControl>
                                        <div className={'container'}>
                                        {values.map((item, index) => (
                                            <Chip
                                            color='primary'
                                            size='small'
                                            onDelete={() => handleDelete(item, index, 1)}
                                            label={item}
                                            key={item}
                                            />
                                        ))}
                                        <Input
                                            value={currValue}
                                            onChange={e => handleChange(e, '1')}
                                            onKeyDown={e => handleKeyDown(e, '1')}
                                            onKeyUp={handleKeyUp}
                                            id='1'
                                            name='1'
                                        />
                                        </div>
                                    </FormControl>

                                    <Typography>include one word</Typography>
                                    <FormControl>
                                        <div className={'container'}>
                                        {valuesoneword.map((item, index) => (
                                            <Chip
                                            color='primary'
                                            size='small'
                                            onDelete={() => handleDelete(item, index, 2)}
                                            label={item}
                                            key={item}
                                            />
                                        ))}
                                        <Input
                                            value={currValueoneword}
                                            onChange={e => handleChange(e, '2')}
                                            onKeyDown={e => handleKeyDown(e, '2')}
                                            onKeyUp={handleKeyUp}
                                            id='2'
                                            name='2'
                                        />
                                        </div>
                                    </FormControl>

                                    <Typography>Excluding all these words</Typography>
                                    <FormControl>
                                        <div className={'container'}>
                                        {valuesexclude.map((item, index) => (
                                            <Chip
                                            color='primary'
                                            size='small'
                                            onDelete={() => handleDelete(item, index, 3)}
                                            label={item}
                                            key={item}
                                            />
                                        ))}
                                        <Input
                                            value={currValueexclude}
                                            onChange={e => handleChange(e, '3')}
                                            onKeyDown={e => handleKeyDown(e, '3')}
                                            onKeyUp={handleKeyUp}
                                        />
                                        </div>
                                    </FormControl>
                                    <Typography>Including these words in the title</Typography>
                                    <FormControl>
                                        <div className={'container'}>
                                        {valueslitle.map((item, index) => (
                                            <Chip
                                            color='primary'
                                            size='small'
                                            onDelete={() => handleDelete(item, index, 4)}
                                            label={item}
                                            key={item}
                                            />
                                        ))}
                                        <Input
                                            value={currValuelitle}
                                            onChange={e => handleChange(e, '4')}
                                            onKeyDown={e => handleKeyDown(e, '4')}
                                            onKeyUp={handleKeyUp}
                                        />
                                        </div>
                                    </FormControl>
                                    </>
                                )}
                            </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item lg={9} md={7} xs={12}>
                        <Card>
                        {params.get('plan') === 'advance' && (
                            <CardHeader title='List Applicants' />
                        )}
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
                                    </Grid>
                                </Grid>

                                <AppliedDataGrid
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
                        <DialogView key={selectedItem.id} selectedItem={selectedItem}
                            visible={openViewModal}
                            onCloseClick={() => setOpenViewModal(!openViewModal)}
                            onStateChange={() => setHookSignature(v4())} />
                    </>
                )}
            </>
        )
}

JobApplied.acl = {
    action: 'read',
    subject: 'company-job-applied'
}

export default JobApplied
