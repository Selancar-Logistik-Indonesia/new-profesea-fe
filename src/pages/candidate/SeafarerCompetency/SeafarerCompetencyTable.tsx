import { useEffect, useState } from 'react'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { Box, Grid, Typography, Button, Paper, TableContainer, IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { toast } from 'react-hot-toast'
import { ISeafarerCompetencyProps } from './SeafarerCompetencyInterface'
import ISeafarerCompetencyData from '../../../contract/models/seafarer_competency'
import SeafarerCompetencyForm from './SeafarerCompetencyForm'
import SeafarerCompetencyDeleteConfirm from './SeafarerCompetencyDeleteConfirm'

const SeafarerCompetencyTable = (props: ISeafarerCompetencyProps) => {
  const [rows, setRows] = useState([])
  const [seafarerCompetency, setSeafarerCompetency] = useState(undefined)
  const [modalFormType, setModalFormType] = useState('create')
  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

  const { user_id } = props

  const thisGray = 'rgba(66, 66, 66, 1)'

  const loadCompetency = () => {
    HttpClient.get(AppConfig.baseUrl + '/seafarer-competencies/user-id/' + user_id).then(response => {
      const result = response.data.data.map((item: ISeafarerCompetencyData) => {
        return {
          ...item,
          certificate_name: item.competency.title,
          country: item.country.name,
          valid_until: item.valid_until ? new Date(item.valid_until) : 'lifetime'
        }
      })

      setRows(result)
    })
  }

  const handleModalForm = (type: string, data: any = undefined) => {
    setModalFormOpen(modalFormOpen ? false : true)
    setModalFormType(type)
    setSeafarerCompetency(type == 'edit' ? data : undefined)
  }

  const handleModalDelete = (data: any = undefined) => {
    setModalDeleteOpen(modalDeleteOpen ? false : true)
    setSeafarerCompetency(data)
  }

  useEffect(() => {
    loadCompetency()
  }, [])

  const columns: GridColDef[] = [
    { field: 'certificate_name', headerName: 'Certificate Name', type: 'string', width: 220, editable: false },
    {
      field: 'certificate_number',
      headerName: 'Certificate Number',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left'
    },
    {
      field: 'country',
      headerName: 'Country',
      type: 'string',
      width: 180
    },
    {
      field: 'valid_until',
      headerName: 'Valid Up',
      width: 220
    },
    {
      field: 'download',
      headerName: 'Download',

      width: 180,
      renderCell(params: any) {
        return (
          <a href={process.env.NEXT_PUBLIC_BASE_API + `/seafarer-competencies/download/${params.row.id}`}>
            {' '}
            <Icon icon='bi:file-earmark-arrow-down-fill' width='24' height='24' color={thisGray} />{' '}
          </a>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell(params: any) {
        return (
          <>
            <IconButton
              size='small'
              title={`Update this Competency Id = ${params.row.id} `}
              onClick={() => handleModalForm('edit', params.row)}
            >
              <Icon icon='material-symbols:edit-square-outline' width='24' height='24' color={thisGray} />
            </IconButton>
            <IconButton
              size='small'
              title={`Update this Comptency Id = ${params.row.id} `}
              onClick={() => handleModalDelete(params.row)}
            >
              <Icon icon='material-symbols:delete-outline' width='24' height='24' color={thisGray} />
            </IconButton>
          </>
        )
      }
    }
  ]

  return (
    <>
      <SeafarerCompetencyForm
        key={seafarerCompetency?.id}
        user_id={user_id}
        seafarerCompetency={seafarerCompetency}
        type={modalFormType}
        handleModalForm={handleModalForm}
        loadCompetency={loadCompetency}
        showModal={modalFormOpen}
      />
      <SeafarerCompetencyDeleteConfirm
        seafarerCompetency={seafarerCompetency}
        handleModalDelete={handleModalDelete}
        loadCompetency={loadCompetency}
        showModal={modalDeleteOpen}
      />
      <Grid container xs={12} md={12} lg={12}>
        <Grid item xs={12} md={6} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Competency
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Grid container md={12} justifyContent={'right'}>
            <Button
              variant='contained'
              style={{ marginBottom: 10 }}
              size='small'
              onClick={() => handleModalForm('create')}
            >
              <Icon
                fontSize='small'
                icon={'solar:add-circle-bold-duotone'}
                color={'success'}
                style={{ fontSize: '18px' }}
              />
              <div> Add Competency </div>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid md={12} sm={12} xs={12}>
        <Paper sx={{ width: '100%', overflow: 'auto' }}>
          <TableContainer>
            <DataGrid
              autoHeight={true}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            />
          </TableContainer>
        </Paper>
      </Grid>
    </>
  )
}

export default SeafarerCompetencyTable
