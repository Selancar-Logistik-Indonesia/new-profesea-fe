import { useEffect, useState } from 'react'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { Divider, Grid, Typography, Button, Paper, TableContainer, IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'

import { IUser } from 'src/contract/models/user'
import { ISeafarerProficiencyProps } from '../../../contract/types/seafarer_proficiency_type'
import ISeafarerProficiencyData from '../../../contract/models/seafarer_proficiency'
import SeafarerProficiencyForm from './SeafarerProficiencyForm'

import SeafarerProficiencyDeleteConfirm from './SeafarerProficiencyDeleteConfirm'
import LoadingIcon from 'src/layouts/components/LoadingIcon'
import CustomNoRowsOverlay from 'src/layouts/components/NoRowDataTable'

const SeafarerProficiencyTable = (props: ISeafarerProficiencyProps) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [seafarerProficiency, setSeafarerProficiency] = useState()
  const [modalFormType, setModalFormType] = useState('create')
  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

  const { user_id } = props

  const thisGray = 'rgba(66, 66, 66, 1)'

  const userSession = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const loadProficiency = () => {
    setLoading(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-proficiencies/user-id/' + user_id).then(response => {
      const result = response.data.data.map((item: ISeafarerProficiencyData) => {
        return {
          ...item,
          certificate_name: item.proficiency.title,
          country: item.country.name
        }
      })

      setRows(result)
      setLoading(false)
    })
  }

  const handleModalForm = (type: string, data: any = undefined) => {
    setModalFormType(type)
    if (type == 'edit') {
      setSeafarerProficiency(data)
    } else {
      setSeafarerProficiency(undefined)
    }

    setModalFormOpen(modalFormOpen ? false : true)
  }

  const handleModalDelete = (data: any = undefined) => {
    setSeafarerProficiency(data)
    setModalDeleteOpen(modalDeleteOpen ? false : true)
  }

  useEffect(() => {
    loadProficiency()
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
      width: 220,
      renderCell: (params: any) => {
        return params.row.valid_until ? <>{params.row.valid_until}</> : 'lifetime'
      }
    },
    {
      field: 'download',
      headerName: 'Download',

      width: 180,
      renderCell(params: any) {
        return userSession.id == user_id && params.row.filename ? (
          <a
            href='#'
            onClick={() =>
              HttpClient.downloadFile(
                process.env.NEXT_PUBLIC_BASE_API + `/seafarer-competencies/download/${params.row.id}/`,
                params.row.certificate_number
              )
            }
          >
            {' '}
            <Icon icon='bi:file-earmark-arrow-down-fill' width='24' height='24' color={thisGray} />{' '}
          </a>
        ) : (
          ''
        )
      }
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
              title={`Update this Proficiency Id = ${params.row.id} `}
              onClick={() => {
                handleModalForm('edit', params.row)
              }}
            >
              <Icon icon='material-symbols:edit-square-outline' width='24' height='24' color={thisGray} />
            </IconButton>
            <IconButton
              size='small'
              title={`Update this Proficiency Id = ${params.row.id} `}
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
        <SeafarerProficiencyForm
          user_id={user_id}
          key={seafarerProficiency ? seafarerProficiency['id'] : 0}
          seafarerProficiency={seafarerProficiency}
          type={modalFormType}
          handleModalForm={handleModalForm}
          loadProficiency={loadProficiency}
          showModal={modalFormOpen}
        />
      )}

      {userSession.id == user_id && (
        <SeafarerProficiencyDeleteConfirm
          seafarerProficiency={seafarerProficiency}
          handleModalDelete={handleModalDelete}
          loadProficiency={loadProficiency}
          showModal={modalDeleteOpen}
        />
      )}
      <Grid item container xs={12} md={12} lg={12}>
        <Grid item xs={12} md={6} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Proficiency
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
                <div> Add Proficiency </div>
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

export default SeafarerProficiencyTable
