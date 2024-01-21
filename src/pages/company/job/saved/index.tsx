import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react'
import AppliedDataGrid, { RowItem } from './AppliedDataGrid';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Directory from 'src/contract/models/directory';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';

const status:any = {
    AP : 'Approved',
    RJ : 'Rejected',
    WR : 'Waiting Review'
}
const UserSaved = () => {
    const [onLoading, setOnLoading] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");

    const [perPage, setPerPage] = useState(10);
    const getListApplicant = async () => {
        try {
            const resp = await HttpClient.get(`/directory?search=${search}&page=${page}&take=${perPage}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }
            console.log(resp.data.directories);

            const rows = resp.data.directories.data as Directory[];
            const items = rows.map((row, index) => {
                return {
                    no: index + 1,
                    id: row.id,
                    name: row.dirable?.name,
                    username: row.dirable?.username,
                    email: row.dirable?.email,
                    phone: row.dirable?.phone,
                    status: status[row.status],
                    actions: {
                        onDownload: () => resumeHandler(row),
                    }
                } as RowItem;
            });

            setRowCount(resp.data.directories?.total ?? 0);
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

    const resumeHandler = (row: Directory) => {
        HttpClient.get(`/user/${row.user_id}/profile/resume`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            window.open(`${response.data?.path}`, '_blank', 'noreferrer');
        })
    }

    useEffect(() => {
        setOnLoading(true);
        getListApplicant().then(() => {
            setOnLoading(false);
        });
    }, [page, search, perPage]);

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} sm={6} md={12}>
                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
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
        </>
    )
}

UserSaved.acl = {
    action: 'read',
    subject: 'company-job-applied'
}

export default UserSaved
