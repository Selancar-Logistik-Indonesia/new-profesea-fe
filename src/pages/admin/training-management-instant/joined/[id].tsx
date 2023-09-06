import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useState } from 'react'
import AppliedDataGrid, { RowItem } from './JoinedDataGrid';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import Participants from 'src/contract/models/participants';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

// const status:any[] = [
//     {id: 'AP' , title : 'Approved'},
//     {id: 'RJ' , title : 'Rejected'},
//     {id: 'WR' , title : 'Waiting Review'}
// ]
    
const EmployeeType:any[] = [
    { employee_type: 'onship', label : 'On-Ship' },
    { employee_type: 'offship', label : 'Off-Ship' }
]

const TrainingJoined = () => {
    const router = useRouter();
    const trainingId = router.query.id;

    const [onLoading, setOnLoading] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);

    const getListParticipants = async () => {
        try {
            const resp = await HttpClient.get(`/training/${trainingId}/participants?`+
            `search=${search}&page=${page}&take=${perPage}`);
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.participants.data as Participants[];
            const items = rows.map((row, index) => {

                return {
                    no: index + 1,
                    id: row.id,
                    training_id: row.training_id,
                    user_id: row.user_id,
                    name: row.user?.name,
                    category: (row.user?.employee_type) ? EmployeeType.find(e => e.employee_type === row.user?.employee_type).label : '',
                    email: row.user?.email,
                    phone: row.user?.phone,
                    // status: status.find(e => e.id === row.status).title,
                    actions: {
                        onDownload: () => resumeHandler(row),
                    }
                } as RowItem;
            });

            setRowCount(resp.data.participants?.total ?? 0);
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

    const resumeHandler = (row: Participants) => {
        HttpClient.get(`/user/${row.user_id}/profile/resume`).then(response => {
            if (response.status != 200) {
                throw response.data.message ?? "Something went wrong!";
            }
            window.open(`${response.data?.path}`, '_blank', 'noreferrer');
        })
    }
    

    useEffect(() => {
        setOnLoading(true);
        getListParticipants().then(() => {
            setOnLoading(false);
        });
    }, [page, search, perPage]);
    
    return (
      <>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              <CardContent>
                  <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                    List Participants
                  </Typography>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <TextField
                      size='small'
                      sx={{ mr: 6, mb: 2 }}
                      placeholder='Search'
                      onChange={e => handleSearch(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={{ mr: 6, mb: 2 }}></Grid>
                </Grid>

                <AppliedDataGrid
                  page={page - 1} // di MUI page pertama = 0
                  rowCount={rowCount}
                  pageSize={perPage}
                  loading={onLoading}
                  onPageChange={model => onPageChange(model)}
                  rows={dataSheet}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    )
}

TrainingJoined.acl = {
  action: 'read',
  subject: 'admin-training-management'
}

export default TrainingJoined
