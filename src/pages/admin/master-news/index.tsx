import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { Autocomplete, Box, Button, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import MasterNewsDatagrid, { RowItem } from './MasterNewsDatagrid'
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import News from 'src/contract/models/news';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
import DialogDelete from './DialogDelete';
import { v4 } from "uuid";
import { Icon } from '@iconify/react'; 
 

const MasterNews = () => {
    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openDelModal, setOpenDelModal] = useState(false);
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<News | null>(null);

    const [forumCode, setForumCode] = useState(0)
    // const [UserId, setUserId] = useState(0)
    // const [Forum, getForum] = useState<any[]>([]);
    // const [User, getUser] = useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");
    const type = [{ title: 'News' }, { title: 'Event' }]
    const [perPage, setPerPage] = useState(10);
    const getListNews = async () => {
        try {
            const resp = await HttpClient.get(`/news?search=${search}&page=${page}&take=${perPage}&type=${forumCode}`)
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.news.data as News[];
            const items = rows.map((row, index) => {
                return {
                  no: index + 1,
                  id: row.id,
                  title: row.title, 
                  type: row.type,
                  actions: {
                    onDelete: () => deleteHandler(row)
                  }
                } as RowItem
            });

            setRowCount(resp?.data?.news?.total ?? 0);
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

    const deleteHandler = (row: News) => {
        setSelectedItem(row);
        setOpenDelModal(true);
    }


    useEffect(() => {
        setOnLoading(true);
        getListNews().then(() => {
            setOnLoading(false);
        }); 
    }, [page, search, hookSignature, perPage, forumCode]);

    return (
      <>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} sm={6} md={12}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                    List News/Event
                  </Typography>
                }
              />
              <CardContent>
                <Grid container justifyContent='flex-start'>
                  <Grid item>
                    <Autocomplete
                      disablePortal
                      size='small'
                      sx={{ mb: 2, width: '150px', mr: 2 }}
                      id='combo-box-level'
                      options={type}
                      renderInput={params => <TextField {...params} label='Tipe' />}
                      getOptionLabel={(option: any) => option.title}
                      onChange={(event: any, newValue: any | null) =>
                        newValue?.title ? setForumCode(newValue.title) : setForumCode(0)
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <TextField
                      size='small'
                      sx={{ mr: 3, mb: 1 }}
                      placeholder='Search'
                      onChange={e => handleSearch(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={{ mb: 3 }}>
                    <Box>
                      <Button
                        variant='contained'
                        href='create'
                        size='small'
                        startIcon={<Icon icon='zondicons:add-outline' fontSize={16} />}
                      >
                        Add
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <MasterNewsDatagrid
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

        {selectedItem && (
          <>
            <DialogDelete
              selectedItem={selectedItem}
              visible={openDelModal}
              onStateChange={() => setHookSignature(v4())}
              onCloseClick={() => setOpenDelModal(!openDelModal)}
            />
          </>
        )}
      </>
    )
}

MasterNews.acl = {
    action: 'read',
    subject: 'admin-master-news'
};

export default MasterNews
