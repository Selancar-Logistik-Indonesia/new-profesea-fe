import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import { Autocomplete, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import SubscriptionDatagrid, { RowItem } from './SubscriptionDatagrid';
import { HttpClient } from 'src/services';
import TransactionSubscription from 'src/contract/models/transaction_subscription';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
import DialogDelete from './DialogDelete';
import { v4 } from "uuid";
import ITeam from 'src/contract/models/team';

const SubscriptionScreen = () => {
    const translate: any = {
        onship: 'On-Ship',
        offship: 'Off-Ship',
        null: '',
        trainer: 'Trainer'
    }

    const status = [
        { status:'paid', label: 'PAID' },
        { status:'unpaid', label: 'UNPAID' },
        { status:'canceled', label: 'CANCELED' }, 
    ]

    const plan = [
        { id:'pro', label: 'PRO' },
        { id:'star', label: 'STAR' },
        { id:'pay-per-value', label: 'PPV' }, 
    ]

    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openDelModal, setOpenDelModal] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<TransactionSubscription | null>(null);
    const [teams, getTeams] = useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");
    const [filterTeam, setFilterTeam] = useState<any>(0);
    const [filterStatus, setFilterStatus] = useState<any>('');
    const [filterPlan, setFilterPlan] = useState<any>('');

    const [perPage, setPerPage] = useState(10);
    const getListTransactionSubscription = async () => {
        try {
            const resp = await HttpClient.get(`/user-subscriptions?search=${search}&page=${page}&take=${perPage}&team_id=${filterTeam}&status=${filterStatus}&plan_type=${filterPlan}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.subscriptions.data as TransactionSubscription[];
            const items = rows.map((row, index) => {
                return {
                    no: index + 1,
                    id: row.id,
                    name: row.user?.name,
                    email: row.user?.email,
                    phone: row.user?.phone,
                    role: row.user?.employee_type != 'offship' ? row.user?.role : 'Candidate',
                    type: translate[row.user?.employee_type],
                    plan: row.user?.plan_type,
                    status: row.status,
                    amount: row.amount,
                    measure: row.subscription?.measure,
                    end_date: row.subscription?.end_date,
                    actions: {
                        onDelete: () => deleteHandler(row)
                    }
                } as RowItem

            });

            setRowCount(resp?.data?.subscriptions?.total ?? 0);
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

    const combobox = async () => {
        const resp = await HttpClient.get(`/public/data/team?nonpublic=1`);
        if (resp.status != 200) {
            throw resp.data.message ?? "Something went wrong!";
        }
        getTeams(resp.data.teams);
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

    const deleteHandler = (row: TransactionSubscription) => {
        setSelectedItem(row);
        setOpenDelModal(true);
    }

    useEffect(() => {
        setOnLoading(true);
        combobox();
        getListTransactionSubscription().then(() => {
            setOnLoading(false);
        });
    }, [page, search, hookSignature, perPage, filterTeam, filterStatus, filterPlan]);

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} sm={6} md={12}>
                    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                        <CardHeader
                            title={
                                <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                                    List Subscriptions
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Grid container justifyContent="flex-start" spacing={2}>
                                <Grid item>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={teams}
                                        getOptionLabel={(option: ITeam) => option.teamName}
                                        renderInput={(params) => <TextField {...params} label="Role" size='small' sx={{ mb: 2, width: '150px' }} />}
                                        onChange={(event: any, newValue: ITeam | null) => (newValue?.id) ? setFilterTeam(newValue.id) : setFilterTeam(0)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={status}
                                        getOptionLabel={(option: any) => option.label}
                                        renderInput={(params) => <TextField {...params} label="Status" size='small' sx={{ mb: 2, width: '150px' }} />}
                                        onChange={(event: any, newValue: any | null) => (newValue?.status) ? setFilterStatus(newValue.status) : setFilterStatus('')}
                                    />
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={plan}
                                        getOptionLabel={(option: any) => option.label}
                                        renderInput={(params) => <TextField {...params} label="Plan" size='small' sx={{ mb: 2, width: '150px' }} />}
                                        onChange={(event: any, newValue: any | null) => (newValue?.id) ? setFilterPlan(newValue.id) : setFilterPlan('')}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end">

                                <Grid item>
                                    <TextField
                                        size='small'
                                        sx={{ mr: 2, mb: 2, ml: 5 }}
                                        placeholder='Search'
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </Grid>
                            </Grid>

                            <SubscriptionDatagrid
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
                </>
            )}
        </>
    )
}

SubscriptionScreen.acl = {
    action: 'read',
    subject: 'admin-subcription-management'
};

export default SubscriptionScreen
