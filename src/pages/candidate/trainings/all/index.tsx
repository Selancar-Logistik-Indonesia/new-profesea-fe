import { useEffect, useRef, useState } from 'react'
// import TrainingDatagrid from './Trainingtagrid'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
// import Training from 'src/contract/models/training'
// import debounce from 'src/utils/debounce'
// import { GridPaginationModel } from '@mui/x-data-grid'
import {
  CircularProgress,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
// import { useRouter } from 'next/router'

import styled from '@emotion/styled'
import ITrainingParticipant from 'src/contract/models/training_participant'
import { format } from 'date-fns'
import { Box } from '@mui/system'
import CustomPaginationItem from 'src/@core/components/pagination/item'

const TableCellStyled = styled(TableCell)<TableCellProps>(() => ({
  fontSize: 14,
  fontWeight: 600,
  color: '#1F1F1F',
  textTransform: 'none',
  padding: '10px 10px 10px 10px'
}))

const formatTrainingDates = (startDate: string | Date, endDate: string | Date): string => {
  const formattedStart = format(new Date(startDate), 'd MMM')
  const formattedEnd = format(new Date(endDate), 'd MMM')

  return `Start at ${formattedStart} - Close at ${formattedEnd}`
}

interface RowItem {
  id: number
  title: string
  schedule: string
  category: string
  short_description: string
  bookId: string
  status: string
}

const AllTrainingScreen = () => {
  const [onLoading, setOnLoading] = useState(false)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])
  // const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)

  const tableContainerRef = useRef<HTMLDivElement>(null)
  // const [showShadow, setShowShadow] = useState(false)
  const perPage = 999
  // const [perPage, setPerPage] = useState(10)

  // const handleScroll = () => {
  //   if (tableContainerRef.current) {
  //     const container = tableContainerRef.current
  //     const isScrolledToEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5
  //     setShowShadow(!isScrolledToEnd)
  //   }
  // }

  const getListTraining = async () => {
    try {
      const resp = await HttpClient.get(`/training/user-joined-training?page=${page}&take=${perPage}`)
      console.log(resp)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const { participated } = resp.data

      const rows = participated?.data as ITrainingParticipant[]
      const items = rows.map((row, index) => {
        return {
          no: index + 1,
          id: row.id,
          title: row?.training?.title || '-',
          schedule:
            row?.training && row?.training?.start_date && row?.training?.end_date
              ? formatTrainingDates(row?.training?.start_date, row?.training?.end_date)
              : '-',
          bookId: '#' + row.id,
          category: row?.training?.category?.category || '-',
          short_description: row?.training?.short_description || '-',
          status: row?.status
        } as RowItem
      })

      setRowCount(participated.total ?? 0)
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

  // const handleSearch = useCallback(
  //   debounce((value: string) => {
  //     setSearch(value)
  //   }, 500),
  //   []
  // )

  // const viewHandler = (row: Training) => {
  //   const trainerNameUrl = row.trainer.name.toLowerCase().split(' ').join('-')
  //   const trainingTitleUrl = row.title ? row.title?.toLowerCase().split(' ').join('-') : ''
  //   router.push(`/candidate/trainings/${trainerNameUrl}/${row.id}/${trainingTitleUrl}`)
  // }

  useEffect(() => {
    setOnLoading(true)
    getListTraining().then(() => {
      setOnLoading(false)
    })
  }, [page, perPage])

  // useEffect(() => {
  //   const container = tableContainerRef.current
  //   if (container) {
  //     container.addEventListener('scroll', handleScroll)
  //     handleScroll()

  //     return () => container.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  const renderStatus = (input: string): { status: string; color: string } => {
    if (input === 'unregistered') {
      return { status: 'Waiting', color: '#F8F8F7' }
    }

    if (input === 'contacted') {
      return { status: 'Verifying', color: '#D8F0FF' }
    }

    if (input === 'unpaid') {
      return { status: 'Waiting for Payment', color: '#F9DFCB' }
    }

    if (input === 'paid') {
      return { status: 'Payment Complete', color: '#E4F9CB' }
    }

    if (input === 'registered') {
      return { status: 'Registered', color: '#89BCFF' }
    }

    if (input === 'onhold') {
      return { status: 'Onhold', color: '#FFED95' }
    }

    if (input === 'ongoing') {
      return { status: 'Ongoing', color: '#F9CBF' }
    }

    if (input === 'complete') {
      return { status: 'Completed', color: '#D9F2DA' }
    }

    return { status: 'Training Canceled', color: '#FFD9D9' }
  }

  return (
    <>
      {onLoading ? (
        <Grid sx={{ display: 'flex', justifyContent: 'center', mb: '24px' }}>
          <CircularProgress size={24} />
        </Grid>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ overflowX: 'auto', maxWidth: '100%' }} ref={tableContainerRef}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellStyled align='left' width={120}>
                    Title
                  </TableCellStyled>
                  <TableCellStyled align='left'>Schedule</TableCellStyled>
                  <TableCellStyled align='left'>Book ID</TableCellStyled>
                  <TableCellStyled align='left' width={150}>
                    Category
                  </TableCellStyled>
                  <TableCellStyled align='left'>Status</TableCellStyled>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSheet.map((d, i) => (
                  <TableRow key={i}>
                    <TableCell align='left'>
                      <Typography sx={{ color: '#1F1F1F', fontSize: 14, fontWeight: 400 }}>{d.title}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography sx={{ color: '#1F1F1F', fontSize: 14, fontWeight: 400 }}>{d.schedule}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography sx={{ color: '#1F1F1F', fontSize: 14, fontWeight: 400 }}>{d.bookId}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Typography sx={{ color: '#1F1F1F', fontSize: 14, fontWeight: 400 }}>{d.category}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <Box
                        sx={{
                          padding: '6px',
                          borderRadius: '4px',
                          textAlign: 'center',
                          background: renderStatus(d.status).color
                        }}
                      >
                        {renderStatus(d.status).status}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container justifyContent='center' sx={{ my: '24px' }}>
            <Pagination
              size='small'
              count={Math.ceil(rowCount / perPage)}
              page={page}
              onChange={(_, newValue) => setPage(newValue)}
              variant='outlined'
              shape='rounded'
              renderItem={item => <CustomPaginationItem {...item} />}
            />
          </Grid>
        </>
      )}

      {/* <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <CardContent sx={{ padding: '0px' }}>
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
      </Card> */}
    </>
  )
}

AllTrainingScreen.acl = {
  action: 'read',
  subject: 'user-training-management'
}

export default AllTrainingScreen
