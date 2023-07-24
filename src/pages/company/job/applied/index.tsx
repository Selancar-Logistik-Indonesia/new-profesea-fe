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

const JobApplied = () => {
    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<Applicant | null>(null);
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");

    const [perPage, setPerPage] = useState(10);
    const getListApplicant = async () => {
        try {
            const resp = await HttpClient.get(`/job/${params.get('id')}/appllicants?search=${search}&page=${page}&take=${perPage}`);
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
                    status: row.status,
                    actions: {
                        onView: () => viewHandler(row),
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

    useEffect(() => {
        setOnLoading(true);
        getListApplicant().then(() => {
            setOnLoading(false);
        });
    }, [page, search, hookSignature, perPage]);

    return (
        <>
            <Grid container spacing={6} className='match-height'>
                <Grid item xs={12} sm={6} md={12}>
                    <Card>
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
