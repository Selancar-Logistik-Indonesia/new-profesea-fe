import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { Autocomplete,  Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DialogAdd from './DialogAdd';
import AccountDatagrid, { RowItem } from './AccountDatagrid';
import { HttpClient } from 'src/services';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
// import Account from 'src/contract/models/account';
import debounce from 'src/utils/debounce';
import { GridPaginationModel } from '@mui/x-data-grid';
// import DialogDelete from './DialogDelete';
// import DialogEdit from './DialogEdit';
import { v4 } from "uuid";
// import { Icon } from '@iconify/react';
// import ITeam from 'src/contract/models/team';
import DialogImport from './DialogImport';
import DialogView from './DialogView';
import Alumni from 'src/contract/models/alumni';
import DialogDetail from './DialogDetail';

const UserScreen = () => {
 
    const EmployeeType = [
        { status: 'true', label: 'VERIFY' },
        { status: 'false', label: 'UNVERIFIED' }
    ]

    const [hookSignature, setHookSignature] = useState(v4())
    const [onLoading, setOnLoading] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openImModal, setOpenImModal] = useState(false);
    // const [openDelModal, setOpenDelModal] = useState(false);
    // const [openEditModal, setOpenEditModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false)
    const [openViewModal2, setOpenViewModal2] = useState(false)
    const [dataSheet, setDataSheet] = useState<RowItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<Alumni | null>(null) 
 
    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [search, setSearch] = useState("");
    // const [filterTeam, setFilterTeam] = useState<any>(0);
    const [filterShip, setFilterShip] = useState<any>([]);
    // const [filterCrewing, setFilterCrewing] = useState('');

    const [perPage, setPerPage] = useState(10);
    const getListAccount = async () => {
        try {
            let filer = ''
            if (filterShip!=''){
                filer= '&status='+filterShip
            } const resp = await HttpClient.get(`/alumni?search=${search}&page=${page}&take=${perPage}`+filer)
            debugger;
            if (resp.status != 200) {
                throw resp.data.message ?? "Something went wrong!";
            }

            const rows = resp.data.alumnis.data as Alumni[];
            const items = rows.map((row, index) => {
                return {
                  no: index + 1,
                  id: row.id,
                  sekolah: row.sekolah.sekolah,
                  description: row.description,
                  user: row.user.name,
                  member: row.count_member,
                  statusaktif: row.statusaktif,

                  //   resend: {
                  //     onResend: () => resendchat(row)
                  //   },
                  actions: {
                    docView: () => viewHandler(row),
                    view: () => detailHandler(row)
                    // onUpdate: () => updateHandler(row)
                  }
                } as unknown as RowItem

            });

            setRowCount(resp?.data?.users?.total ?? 0);
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
        // getTeams(resp.data.teams);
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

    // const deleteHandler = (row: Alumni) => {
    //     setSelectedItem(row);
    //     setOpenDelModal(true);
    // }

    // const updateHandler = (row: Alumni) => {
    //     setSelectedItem(row);
    //     setOpenEditModal(true);
    // }

    const viewHandler = (row: Alumni) => {
      setSelectedItem(row)
      setOpenViewModal(true)
    }
    const detailHandler = (row: Alumni) => {
      setSelectedItem(row)
      setOpenViewModal2(true)
    }

   

    useEffect(() => {
        setOnLoading(true);
        combobox();
        getListAccount().then(() => {
            setOnLoading(false);
        });
    }, [page, search, hookSignature, perPage,  filterShip]);

    return (
      <>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} sm={6} md={12}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                    List Alumni
                  </Typography>
                }
              />
              <CardContent>
                <Grid container justifyContent='flex-start'>
                  <Grid item>
                    <Autocomplete
                      disablePortal
                      id='combo-box-demo'
                      options={EmployeeType}
                      getOptionLabel={(option: any) => option.label}
                      renderInput={params => (
                        <TextField {...params} label='Type' size='small' sx={{ ml: 3, mb: 2, width: '150px' }} />
                      )}
                      onChange={(event: any, newValue: any | null) =>
                        newValue?.status ? setFilterShip(newValue?.status) : setFilterShip('')
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      size='small'
                      sx={{ mr: 2, mb: 2, ml: 5 }}
                      placeholder='Search'
                      onChange={e => handleSearch(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <AccountDatagrid
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

        <DialogAdd
          visible={openAddModal}
          onStateChange={() => setHookSignature(v4())}
          onCloseClick={() => setOpenAddModal(!openAddModal)}
        />
        <DialogImport
          visible={openImModal}
          onStateChange={() => setHookSignature(v4())}
          onCloseClick={() => setOpenImModal(!openImModal)}
        />
        {selectedItem && (
          <>
            {/* <DialogDelete
              selectedItem={selectedItem}
              visible={openDelModal}
              onStateChange={() => setHookSignature(v4())}
              onCloseClick={() => setOpenDelModal(!openDelModal)}
            />
            <DialogEdit
              key={selectedItem.id}
              selectedItem={selectedItem}
              visible={openEditModal}
              onCloseClick={() => setOpenEditModal(!openEditModal)}
              onStateChange={() => setHookSignature(v4())}
            /> */}
            <DialogView
              key={selectedItem.id}
              selectedItem={selectedItem}
              visible={openViewModal}
              onCloseClick={() => setOpenViewModal(!openViewModal)}
              onStateChange={() => setHookSignature(v4())}
            />
            <DialogDetail
              key={selectedItem.id}
              selectedItem={selectedItem}
              visible={openViewModal2}
              onCloseClick={() => setOpenViewModal2(!openViewModal2)}
              onStateChange={() => setHookSignature(v4())}
            />
          </>
        )}
      </>
    )
}

UserScreen.acl = {
    action: 'read',
    subject: 'admin-accounts'
};

export default UserScreen
