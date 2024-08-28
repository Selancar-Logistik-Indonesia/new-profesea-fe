import { useEffect, useState } from 'react'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { Divider, Grid, Typography, Button, Paper, Checkbox, IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { ISeafarerExperienceProps } from '../../../contract/types/seafarer_experience_type'
import ISeafarerExperienceData from '../../../contract/models/seafarer_experience'
import SeafarerExperienceForm from './SeafarerExperienceForm'
import SeafarerExperienceDeleteConfirm from './SeafarerExperienceDeleteConfirm'
import LoadingIcon from 'src/layouts/components/LoadingIcon'
import CustomNoRowsOverlay from 'src/layouts/components/NoRowDataTable'

import moment from 'moment'

const SeafarerExperienceContainer = (props: ISeafarerExperienceProps) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [seafarerExperience, setSeafarerExperience] = useState()
  const [modalFormType, setModalFormType] = useState('create')
  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

  const { user_id, no_experience, setNoExperience } = props

  const thisGray = 'rgba(66, 66, 66, 1)'

  const loadExperience = () => {
    setLoading(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-experiences/user-id/' + user_id).then(response => {
      const result = response.data.data.map((item: ISeafarerExperienceData) => {
        return {
          ...item,
          sign_in: new Date(item.sign_in),
          sign_off: new Date(item.sign_off),
          rank: item.rank.name,
          vessel_type: item.vessel_type.name
        }
      })

      setRows(result)
      setLoading(false)
    })
  }

  const handleModalForm = (type: string, data: any = undefined) => {
    setSeafarerExperience(type == 'edit' ? data : {})
    setModalFormOpen(modalFormOpen ? false : true)
    setModalFormType(type)
  }

  const handleModalDelete = (data: any = undefined) => {
    setSeafarerExperience(data)
    setModalDeleteOpen(modalDeleteOpen ? false : true)
  }

  useEffect(() => {
    loadExperience()
  }, [])

  const columns: GridColDef[] = [
    { field: 'vessel_name', headerName: 'Vessel Name', type: 'string', width: 220, editable: false },
    {
      field: 'vessel_type',
      headerName: 'Vessel Type',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left'
    },
    {
      field: 'rank',
      headerName: 'Rank / Position',
      type: 'string',
      width: 180
    },
    {
      field: 'grt',
      headerName: 'GRT',
      width: 100,
      type: 'number'
    },
    {
      field: 'dwt',
      headerName: 'DWT',
      width: 100,
      type: 'number'
    },
    {
      field: 'me_power',
      headerName: 'ME Power',
      width: 100,
      type: 'number'
    },
    {
      field: 'sign_in',
      headerName: 'Sign In',
      width: 150,
      type: 'date',
      renderCell: (params: any) => {
        return moment(params.row.sign_in).format('DD/MM/YYYY')
      }
    },
    {
      field: 'sign_off',
      headerName: 'Sign Off',
      width: 150,
      type: 'date',
      renderCell: (params: any) => {
        return params.row.sign_off ? <>{moment(params.row.sign_off).format('DD/MM/YYYY')}</> : 'current'
      }
    },
    {
      field: 'company',
      headerName: 'Company / Flag',
      width: 200,
      type: 'string'
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
              title={`Update this Experience Id = ${params.row.id} `}
              onClick={() => handleModalForm('edit', params.row)}
            >
              <Icon icon='material-symbols:edit-square-outline' width='24' height='24' color={thisGray} />
            </IconButton>
            <IconButton
              size='small'
              title={`Update this Experience Id = ${params.row.id} `}
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
      <SeafarerExperienceForm
        key={seafarerExperience ? seafarerExperience['id'] : 0}
        seafarerExperience={seafarerExperience}
        type={modalFormType}
        handleModalForm={handleModalForm}
        loadExperience={loadExperience}
        showModal={modalFormOpen}
        user_id={user_id}
      />
      <SeafarerExperienceDeleteConfirm
        seafarerExperience={seafarerExperience}
        handleModalDelete={handleModalDelete}
        loadExperience={loadExperience}
        showModal={modalDeleteOpen}
      />
      <Grid container xs={12} md={12} lg={12}>
        <Grid item xs={12} md={6} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Sea Experience
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Grid container justifyContent={'right'}>
            <label style={{ marginRight: 20, marginTop: -5 }}>
              <Checkbox
                value={'no_experience'}
                checked={no_experience}
                onClick={() => setNoExperience(!no_experience)}
              />{' '}
              I have no experience{' '}
            </label>
            {!no_experience && (
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
                <div> Add more Experience </div>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      {!no_experience && (
        <Grid md={12} sm={12} xs={12}>
          <Paper style={{ overflow: 'auto' }} sx={{ overflow: 'auto', width: '100%' }}>
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
              slots={{ noRowsOverlay: loading ? LoadingIcon : CustomNoRowsOverlay }}
              getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            />
          </Paper>
        </Grid>
      )}
      <Divider style={{ width: '100%', margin: '20px 0' }} />
    </>
  )
}

export default SeafarerExperienceContainer
