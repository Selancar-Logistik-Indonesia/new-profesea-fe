import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useCallback, useEffect, useState } from 'react'
import JobDatagrid, { RowItem } from './AppliedDataGrid'
import { HttpClient } from 'src/services'
import Applied from 'src/contract/models/applicant'
import debounce from 'src/utils/debounce'
import { GridPaginationModel } from '@mui/x-data-grid'

// const status: any[] = [
//   { id: 'AP', title: 'Approved' },
//   { id: 'RJ', title: 'Rejected' },
//   { id: 'WR', title: 'Waiting Review' }
// ]

const status: any[] = [
  { id: 'AP', title: 'Approved' },
  { id: 'RJ', title: 'Rejected' },
  { id: 'PR', title: 'Proceed' },
  { id: 'VD', title: 'Viewed' },
  { id: 'WR', title: 'Waiting Review' }
]

const AllJobApplied = () => {
  const [onLoading, setOnLoading] = useState(false)
  const [dataSheet, setDataSheet] = useState<RowItem[]>([])

  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [search, setSearch] = useState('')

  const [perPage, setPerPage] = useState(10)
  const getAppliedJob = async () => {
    const resp = await HttpClient.get(`/user/job-applied?search=${search}&page=${page}&take=${perPage}`)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }

    const rows = resp.data.jobs.data as Applied[]
    const items = rows.map((row, index) => {
      return {
        no: index + 1,
        id: row.id,
        job_id: row?.job_id,
        job_title: row?.job?.job_title,
        role_type: row?.job?.role_type?.name,
        category_name: row?.job?.category.name,
        company_name: row?.job?.company?.name,
        location: `${row?.job?.city?.city_name} - ${row?.job?.country?.name}`,
        degree: row?.job?.degree?.name,
        salary: `Rp. ${row?.job?.salary_start} - Rp. ${row?.job?.salary_end}`,
        status: status.find(e => e.id === row.status).title
      } as unknown as RowItem
    })

    setRowCount(resp?.data?.jobs?.total ?? 0)
    setDataSheet(items)
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

  useEffect(() => {
    setOnLoading(true)
    getAppliedJob().then(() => {
      setOnLoading(false)
    })
  }, [page, search, perPage])

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardContent>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <TextField
                    size='small'
                    sx={{ mb: 3 }}
                    placeholder='Search'
                    onChange={e => handleSearch(e.target.value)}
                  />
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
    </>
  )
}

AllJobApplied.acl = {
  action: 'read',
  subject: 'seafarer-job-applied'
}

export default AllJobApplied
