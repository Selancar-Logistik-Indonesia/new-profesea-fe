import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useCallback, useEffect, useState } from 'react'
import TrainingDatagrid, { RowItem } from './Trainingtagrid'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import Training from 'src/contract/models/training'
import debounce from 'src/utils/debounce'
import { GridPaginationModel } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import secureLocalStorage from 'react-secure-storage'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'

const AllTrainingScreen = () => {
  const [onLoading, setOnLoading] = useState(false)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  const router = useRouter()
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [search, setSearch] = useState('')

  const [perPage, setPerPage] = useState(10)
  const getListTraining = async () => {
    try {
      const resp = await HttpClient.get(
        `/training?id_participant=${user.id}&search=${search}&page=${page}&take=${perPage}`
      )
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.trainings.data as Training[]
      const items = rows.map((row, index) => {
        return {
          no: index + 1,
          id: row.id,
          title: row.title,
          schedule: row.schedule,
          category: row.category.category,
          short_description: row.short_description,
          actions: {
            onView: () => viewHandler(row)
          }
        } as RowItem
      })

      setRowCount(resp?.data?.trainings?.total ?? 0)
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

  const viewHandler = (row: Training) => {
    const trainerNameUrl = row.trainer.name.toLowerCase().split(' ').join('-')
    const trainingTitleUrl = row.title ? row.title?.toLowerCase().split(' ').join('-') : ''
    router.push(`/candidate/trainings/${trainerNameUrl}/${row.id}/${trainingTitleUrl}`)
  }

  useEffect(() => {
    setOnLoading(true)
    getListTraining().then(() => {
      setOnLoading(false)
    })
  }, [page, search, perPage])

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} md={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Typography variant='h6' color={'#32487A'} fontWeight='600'>
              List Trainings
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

            <TrainingDatagrid
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
  )
}

AllTrainingScreen.acl = {
  action: 'read',
  subject: 'user-training-management'
}

export default AllTrainingScreen
