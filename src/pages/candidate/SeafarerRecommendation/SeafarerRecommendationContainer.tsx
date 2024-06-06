import { useEffect, useState } from 'react'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { Divider, Grid, Typography, Button, Paper, TableContainer, IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'

import { IUser } from 'src/contract/models/user'
import { ISeafarerRecommendationProps } from '../../../contract/types/seafarer_recommendation_type'
import ISeafarerRecommendationData from '../../../contract/models/seafarer_recommendation'
import SeafarerRecommendationForm from './SeafarerRecommendationForm'

import SeafarerRecommendationDeleteConfirm from './SeafarerRecommendationDeleteConfirm'
import LoadingIcon from 'src/layouts/components/LoadingIcon'
import CustomNoRowsOverlay from 'src/layouts/components/NoRowDataTable'

const SeafarerRecommendationTable = (props: ISeafarerRecommendationProps) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [seafarerRecommendation, setSeafarerRecommendation] = useState()
  const [modalFormType, setModalFormType] = useState('create')
  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

  const { user_id } = props

  const thisGray = 'rgba(66, 66, 66, 1)'

  const userSession = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const loadRecommendation = () => {
    setLoading(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-recommendations/user-id/' + user_id).then(response => {
      const result = response.data.data.map((item: ISeafarerRecommendationData) => {
        return {
          ...item
        }
      })

      setRows(result)
      setLoading(false)
    })
  }

  const handleModalForm = (type: string, data: any = undefined) => {
    setModalFormType(type)
    if (type == 'edit') {
      setSeafarerRecommendation(data)
    } else {
      setSeafarerRecommendation(undefined)
    }

    setModalFormOpen(modalFormOpen ? false : true)
  }

  const handleModalDelete = (data: any = undefined) => {
    setSeafarerRecommendation(data)
    setModalDeleteOpen(modalDeleteOpen ? false : true)
  }

  useEffect(() => {
    loadRecommendation()
  }, [])

  const columns: GridColDef[] = [
    { field: 'company', headerName: 'Company', type: 'string', width: 220, editable: false },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left'
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      type: 'string',
      width: 180
    },
    {
      field: 'position',
      headerName: 'Position',
      width: 220
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell(params: any) {
        return userSession.id == user_id ? (
          <>
            <IconButton
              size='small'
              title={`Update this recommendation Id = ${params.row.id} `}
              onClick={() => {
                handleModalForm('edit', params.row)
              }}
            >
              <Icon icon='material-symbols:edit-square-outline' width='24' height='24' color={thisGray} />
            </IconButton>
            <IconButton
              size='small'
              title={`Update this recommendation Id = ${params.row.id} `}
              onClick={() => handleModalDelete(params.row)}
            >
              <Icon icon='material-symbols:delete-outline' width='24' height='24' color={thisGray} />
            </IconButton>
          </>
        ) : (
          ''
        )
      }
    }
  ]

  return (
    <>
      {userSession.id == user_id && (
        <SeafarerRecommendationForm
          user_id={user_id}
          key={seafarerRecommendation ? seafarerRecommendation['id'] : 0}
          seafarerRecommendation={seafarerRecommendation}
          type={modalFormType}
          handleModalForm={handleModalForm}
          loadRecommendation={loadRecommendation}
          showModal={modalFormOpen}
        />
      )}

      {userSession.id == user_id && (
        <SeafarerRecommendationDeleteConfirm
          seafarerRecommendation={seafarerRecommendation}
          handleModalDelete={handleModalDelete}
          loadRecommendation={loadRecommendation}
          showModal={modalDeleteOpen}
        />
      )}
      <Grid item container xs={12} md={12} lg={12}>
        <Grid item xs={12} md={6} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Certificate of recommendation
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Grid container md={12} justifyContent={'right'}>
            {userSession.id == user_id && (
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
                <div> Add more recommendation </div>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Paper>
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
              slots={{ noRowsOverlay: loading ? LoadingIcon : CustomNoRowsOverlay }}
              pageSizeOptions={[5, 10]}
              getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            />
          </TableContainer>
        </Paper>
      </Grid>
      <Divider style={{ width: '100%', margin: '20px 0' }} />
    </>
  )
}

export default SeafarerRecommendationTable
