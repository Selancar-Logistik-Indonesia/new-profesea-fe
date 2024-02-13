import { Box, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp, GridPaginationModel } from '@mui/x-data-grid'
import { useCallback, useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import AccountDatagrid, { RowItem } from '../admin/accounts/AccountDatagrid'

import Account from 'src/contract/models/account'

function Test() {
  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'MUI X', col2: 'is awesome' },
    { id: 3, col1: 'Material UI', col2: 'is amazing' },
    { id: 4, col1: 'MUI', col2: '' },
    { id: 5, col1: 'Joy UI', col2: 'is awesome' },
    { id: 6, col1: 'MUI Base', col2: 'is amazing' }
  ]

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Column 1', width: 150 },
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 }
  ]

  const translate: any = {
    onship: 'On-Ship',
    offship: 'Off-Ship',
    null: '',
    trainer: 'Trainer'
  }

  const [onLoading, setOnLoading] = useState(false)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])

  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [search, setSearch] = useState('')
  const [filterTeam, setFilterTeam] = useState<any>(0)
  const [filterShip, setFilterShip] = useState<any>([])
  const [filterCrewing, setFilterCrewing] = useState('')

  const [perPage, setPerPage] = useState(10)
  const getListAccount = async () => {
    try {
      const resp = await HttpClient.get(
        `/user-management?search=${search}&page=${page}&take=${perPage}&team_id=${filterTeam}&employee_type=${filterShip}&is_crewing=${filterCrewing}`
      )
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.users.data as Account[]
      const items = rows.map((row, index) => {
        return {
          no: index + 1,
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          role: row.employee_type != 'offship' ? row.role : 'Candidate',
          type: translate[row.employee_type],
          plan: row.plan_type,
          verified_at: row.verified_at,
          registered_at: row.created_at,
          resend: {
            onResend: () => resendchat(row)
          }
        } as unknown as RowItem
      })

      setRowCount(resp?.data?.users?.total ?? 0)
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

  const resendchat = async (row: Account) => {
    const resp = await HttpClient.get(`/user-management/resend-verification?email=` + row.email)
    if (resp.status == 200) {
      toast.success('Successfully Resend Email!')
    }
  }

  const onPageChange = (model: GridPaginationModel) => {
    const mPage = model.page + 1
    setPage(mPage)
    setPerPage(model.pageSize)
  }

  useEffect(() => {
    setOnLoading(true)
    getListAccount().then(() => {
      setOnLoading(false)
    })
  }, [page, search, perPage, filterTeam, filterShip, filterCrewing])

  return (
    <Box width={'100%'}>
      <Grid container spacing={2}>
        <Grid container item xs={12} md={12}>
          <Grid item xs={12}>
            <Grid
              container
              item
              xs={12}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                boxSizing: 'border-box',
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF',
                marginTop: '10px',
                direction: 'row',
                justifyContent: 'flex-start',
                alignItems: 'top',
                alignContent: 'top',
                padding: '20px'
              }}
            >
              <Grid item xs={12}>
                <Grid container item xs={12} marginBottom={'10px'}>
                  <Grid container item xs={12} justifyContent={'left'}>
                    <Typography variant='h3' color={'#32487A'} fontWeight='800' fontSize={18}>
                      {' '}
                      Resume Builder
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <div>
                <DataGrid
                  disableRowSelectionOnClick
                  disableColumnMenu
                  autoHeight={true}
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 }
                    }
                  }}
                  pageSizeOptions={[5, 10]}
                />
                <AccountDatagrid
                  page={page - 1} // di MUI page pertama = 0
                  rowCount={rowCount}
                  pageSize={perPage}
                  loading={onLoading}
                  onPageChange={model => onPageChange(model)}
                  rows={dataSheet}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

Test.acl = {
  action: 'read',
  subject: 'test'
}

export default Test
