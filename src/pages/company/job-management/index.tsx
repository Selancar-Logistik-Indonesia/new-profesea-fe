import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Box, Button, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DialogAdd from './DialogAdd'
import JobDatagrid, { RowItem } from './JobDatagrid'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import Job from 'src/contract/models/job'
import debounce from 'src/utils/debounce'
import { GridPaginationModel } from '@mui/x-data-grid'
import DialogDelete from './DialogDelete'
import DialogEdit from './DialogEdit'
import { v4 } from 'uuid'
import { Icon } from '@iconify/react'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { IUser } from 'src/contract/models/user'
import DialogBlock from './DialogBlock'

const JobManagementScreen = () => {
  const [hookSignature, setHookSignature] = useState(v4())
  const [onLoading, setOnLoading] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openBlockModal, setOpenBlockModal] = useState(false)

  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  const [selectedItem, setSelectedItem] = useState<Job | null>(null)
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  console.log(user)
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [search, setSearch] = useState('')

  const [perPage, setPerPage] = useState(10)
  const getListJob = async () => {
    try {
      const resp = await HttpClient.get(`/job?search=${search}&page=${page}&take=${perPage}`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.jobs.data as Job[]
      const items = rows.map((row, index) => {
        const license: any[] = Object.values(row.license)

        return {
          no: index + 1,
          id: row.id,
          role_type: row.role_type?.name,
          level_name: row.rolelevel?.levelName,
          category_name: row.category?.name,
          degree: row.degree?.name,
          license: license.map(e => e.title).join(', '),
          actions: {
            onDelete: () => deleteHandler(row),
            onUpdate: () => updateHandler(row)
          }
        } as RowItem
      })

      setRowCount(resp?.data?.jobs?.total ?? 0)
      setDataSheet(items)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  const cekDocument = async () => {
    try {
      const resp = await HttpClient.get(`/user/document`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.documents as any[]
      if (rows.length < 1 || user.verified_at === null) {
        //toast.error(`You can not post job yet, your account not verified`);
        setOpenBlockModal(true)
      }
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value)
    }, 500),
    []
  )

  const onPageChange = (model: GridPaginationModel) => {
    const mPage = model.page + 1
    setPage(mPage)
    setPerPage(model.pageSize)
  }

  const deleteHandler = (row: Job) => {
    setSelectedItem(row)
    setOpenDelModal(true)
  }

  const updateHandler = (row: Job) => {
    setSelectedItem(row)
    setOpenEditModal(true)
  }

  useEffect(() => {
    setOnLoading(true)
    cekDocument()
    getListJob().then(() => {
      setOnLoading(false)
    })
  }, [page, search, hookSignature, perPage])

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            {/* <CardHeader title='List Jobs' /> */}

            <CardContent>
              <Typography variant='h6' color={'#32487A'} fontWeight='600'>
                List Jobs
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
                <Grid item sx={{ mr: 6, mb: 2 }}>
                  <Box>
                    <Button variant='contained' size='small' onClick={() => setOpenAddModal(!openAddModal)}>
                      <Icon
                        fontSize='large'
                        icon={'zondicons:add-outline'}
                        color={'info'}
                        style={{ fontSize: '14px', margin: 3 }}
                      />
                      Add
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <JobDatagrid
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
      {selectedItem && (
        <>
          <DialogDelete
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
          />
        </>
      )}

      <DialogBlock
        visible={openBlockModal}
        onCloseClick={() => {
          setOpenBlockModal(!openBlockModal)
          //window.location.replace("/home")
        }}
      />
    </>
  )
}

JobManagementScreen.acl = {
  action: 'read',
  subject: 'user-job-management'
}

export default JobManagementScreen
