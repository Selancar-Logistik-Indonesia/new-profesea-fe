import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Box, Button, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import DialogAdd from './DialogAdd'
import AdsDatagrid, { RowItem } from './AdsDatagrid'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import debounce from 'src/utils/debounce'
import { GridPaginationModel } from '@mui/x-data-grid'
import DialogDelete from './DialogDelete'
import DialogEdit from './DialogEdit'
import { v4 } from 'uuid'
import DialogView from './DialogView'
import { Icon } from '@iconify/react'
import { DateType } from 'src/contract/models/DatepickerTypes'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const AdsScreen = () => {
  const [hookSignature, setHookSignature] = useState(v4())
  const [onLoading, setOnLoading] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [filterDate, setDate] = useState<DateType>(new Date())

  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [search, setSearch] = useState('')

  const [perPage, setPerPage] = useState(10)
  const getListAds = async () => {
    try {
      const resp = await HttpClient.get(`/ads?search=${search}&page=${page}&take=${perPage}`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.ads.data as any[]
      const items = rows.map((row, index) => {
        return {
          no: index + 1,
          id: index,
          adsId: row?.id,
          image: row?.attachments,
          description: row?.description,
          cta: row?.cta,
          expired_at: row?.expired_at,
          ads_location: row?.ads_location,
          ads_placement: row?.ads_placement,
          show: row?.show,
          ctr: row?.ctr,
          actions: {
            onDelete: () => deleteHandler(row),
            onUpdate: () => updateHandler(row),
            onView: () => viewHandler(row),
            onShow: () => showHandler(row)
          }
        } as RowItem
      })

      setRowCount(resp?.data?.ads?.total ?? 0)
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

  const onPageChange = (model: GridPaginationModel) => {
    const mPage = model.page + 1
    setPage(mPage)
    setPerPage(model.pageSize)
  }

  const showHandler = async (row: any) => {
    console.log(row)
    try {
      const resp = await HttpClient.patch(`/ads/${row?.id}/show`, { show: !row?.show })

      if (resp.status !== 200) {
        throw new Error(resp.data.message ?? 'Something went wrong!')
      }

      const { ads } = resp.data

      //   setDataSheet((prevDataSheet: any) =>
      //     prevDataSheet.map((d: any) => (d.adsId === ads?.id ? { ...d, show: ads?.show } : d))
      //   )
      await getListAds()
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      toast.error(`Oops! ${errorMessage}`)
    }
  }

  const deleteHandler = (row: any) => {
    setSelectedItem(row)
    setOpenDelModal(true)
  }

  const updateHandler = (row: any) => {
    setSelectedItem(row)
    setOpenEditModal(true)
  }

  const viewHandler = (row: any) => {
    setSelectedItem(row)
    setOpenViewModal(true)
  }

  useEffect(() => {
    setOnLoading(true)
    getListAds().then(() => {
      setOnLoading(false)
    })
  }, [page, search, hookSignature, perPage, filterDate])

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardHeader
              title={
                <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#32487A' }}>
                  List Ads
                </Typography>
              }
            />
            <CardContent>
              <Grid container justifyContent='flex-start'>
                <Grid item>
                  <DatePickerWrapper>
                    <DatePicker
                      minDate={new Date()}
                      dateFormat='dd/MM/yyyy'
                      selected={filterDate}
                      id='basic-input'
                      onChange={(date: Date) => setDate(date)}
                      placeholderText='Click to select a date'
                      customInput={<TextField size='small' label='Schedule' variant='outlined' fullWidth />}
                    />
                  </DatePickerWrapper>
                </Grid>
              </Grid>
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
                      />{' '}
                      Add
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <AdsDatagrid
                page={page - 1} // di MUI page pertama = 0
                rowCount={rowCount}
                pageSize={perPage}
                loading={onLoading}
                onPageChange={(model: GridPaginationModel) => onPageChange(model)}
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
          <DialogView
            key={selectedItem.id}
            selectedItem={selectedItem}
            visible={openViewModal}
            onCloseClick={() => setOpenViewModal(!openViewModal)}
            onStateChange={() => setHookSignature(v4())}
          />
        </>
      )}
    </>
  )
}

AdsScreen.acl = {
  action: 'read',
  subject: 'admin-ads-management'
}

export default AdsScreen
