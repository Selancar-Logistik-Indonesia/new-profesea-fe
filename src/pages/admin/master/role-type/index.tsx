import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DialogAdd from './DialogAdd'
import RoleTypeDatagrid, { RowItem } from './RoleTypeDatagrid'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import RoleType from 'src/contract/models/role_type'
import debounce from 'src/utils/debounce'
import { GridPaginationModel } from '@mui/x-data-grid'
import DialogDelete from './DialogDelete'
import DialogEdit from './DialogEdit'
import { v4 } from 'uuid'

const RoleTypeScreen = () => {
  const [hookSignature, setHookSignature] = useState(v4())
  const [onLoading, setOnLoading] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  const [selectedItem, setSelectedItem] = useState<RoleType | null>(null)

  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [search, setSearch] = useState('')
  const [searchCreatedBy, setSearchCreatedBy] = useState('')

  const [perPage, setPerPage] = useState(10)
  const [sort, setSort] = useState('created_at:desc')

  const getListForum = async () => {
    try {
      // ?search=${search}&page=${page}&take=${perPage}&orderBy=${}&order={}
      const resp = await HttpClient.get(`/role-type`, {
        search: search,
        page: page,
        take: perPage,
        orderBy: sort.split(':')[0],
        orderDirection: sort.split(':')[1],
        searchCreatedBy: searchCreatedBy
      })
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.roleTypes.data as RoleType[]
      const items = rows.map((row, index) => {
        return {
          no: index + 1,
          id: row.id,
          name: row.name,
          category: row?.category?.name,
          created_at: row?.created_at,
          user: row?.user,
          actions: {
            onDelete: () => deleteHandler(row),
            onUpdate: () => updateHandler(row)
          }
        } as RowItem
      })

      console.log(rows)

      setRowCount(resp?.data?.roleTypes?.total ?? 0)
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

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value)
    }, 500),
    []
  )

  const handleSearchCreatedBy = useCallback(
    debounce((value: string) => {
      setSearchCreatedBy(value)
    }, 500),
    []
  )

  const onPageChange = (model: GridPaginationModel) => {
    const mPage = model.page + 1
    setPage(mPage)
    setPerPage(model.pageSize)
  }

  const deleteHandler = (row: RoleType) => {
    setSelectedItem(row)
    setOpenDelModal(true)
  }

  const updateHandler = (row: RoleType) => {
    setSelectedItem(row)
    setOpenEditModal(true)
  }

  useEffect(() => {
    setOnLoading(true)
    getListForum().then(() => {
      setOnLoading(false)
    })
  }, [page, search, hookSignature, perPage, sort, searchCreatedBy])

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardHeader
              title={
                <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                  List Job Title
                </Typography>
              }
            />
            <CardContent>
              <Grid container>
                <Grid item md={6} xs={12}>
                  <Select
                    size='small'
                    labelId='sort-job-title-id'
                    id='sort-job-title'
                    value={sort}
                    label='Job Title Sort'
                    onChange={event => {
                      setSort(event.target.value)
                    }}
                  >
                    <MenuItem value={'created_at:desc'}> Sort Created At : DESC </MenuItem>
                    <MenuItem value={'created_at:asc'}> Sort Created At : ASC </MenuItem>
                    <MenuItem value={'name:asc'}> Sort Job Title : ASC </MenuItem>
                    <MenuItem value={'name:desc'}> Sort Job Title : DESC </MenuItem>
                  </Select>
                  <TextField
                    size='small'
                    sx={{ ml: 6, mb: 2 }}
                    placeholder='Created By'
                    onChange={e => handleSearchCreatedBy(e.target.value)}
                  />
                </Grid>
                <Grid md={6} xs={12} item container justifyContent='flex-end'>
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
                      <Button variant='contained' onClick={() => setOpenAddModal(!openAddModal)}>
                        Add
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <RoleTypeDatagrid
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
    </>
  )
}

RoleTypeScreen.acl = {
  action: 'read',
  subject: 'master/role-type'
}

export default RoleTypeScreen
