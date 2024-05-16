import { useEffect, useState } from 'react'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { Divider, Grid, Typography, Button, Paper, IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'

import { ISeafarerTravelDocumentProps } from '../../../contract/types/seafarer_travel_document_type'
import ISeafarerTravelDocumentData from '../../../contract/models/seafarer_travel_document'

import SeafarerTravelDocumentForm from './SeafarerTravelDocumentForm'
import SeafarerTravelDocumentDeleteConfirm from './SeafarerTravelDocumentDeleteConfirm'
import LoadingIcon from 'src/layouts/components/LoadingIcon'
import CustomNoRowsOverlay from 'src/layouts/components/NoRowDataTable'
import { IUser } from 'src/contract/models/user'

const SeafarerTravelDocumentTable = (props: ISeafarerTravelDocumentProps) => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [seafarerTravelDocument, setSeafarerTravelDocument] = useState()
  const [modalFormType, setModalFormType] = useState('create')
  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

  const { user_id } = props

  const thisGray = 'rgba(66, 66, 66, 1)'

  const userSession = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const loadTravelDocument = () => {
    setLoading(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-travel-documents/user-id/' + user_id).then(response => {
      const result = response.data.data.map((item: ISeafarerTravelDocumentData) => {
        return {
          ...item,
          country_issue: item?.country?.name,
          date_of_issue: new Date(item.date_of_issue),
          valid_date_column: item.valid_date ? new Date(item?.valid_date) : 'lifetime'
        }
      })

      setRows(result)
      setLoading(false)
    })
  }

  const handleModalForm = (type: string, data: any = undefined) => {
    setSeafarerTravelDocument(type == 'edit' ? data : {})
    setModalFormType(type)
    setModalFormOpen(modalFormOpen ? false : true)
  }

  const handleModalDelete = (data: any = undefined) => {
    setSeafarerTravelDocument(data)
    setModalDeleteOpen(modalDeleteOpen ? false : true)
  }

  useEffect(() => {
    loadTravelDocument()
  }, [])

  const columns: GridColDef[] = [
    { field: 'document', headerName: 'Document', width: 220 },
    {
      field: 'no',
      headerName: 'No',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left'
    },
    {
      field: 'date_of_issue',
      headerName: 'Date of Issue',
      type: 'date',
      width: 180
    },
    {
      field: 'country_issue',
      headerName: 'Country Issue',
      width: 220,
      type: 'number'
    },
    {
      field: 'valid_date_column',
      headerName: 'Valid Date',
      type: 'string',
      width: 180
    },
    {
      field: 'download',
      headerName: 'Credentials',

      width: 180,
      renderCell(params: any) {
        return user_id == userSession?.id && params.row.filename ? (
          <a
            href={process.env.NEXT_PUBLIC_BASE_API + `/seafarer-travel-documents/preview/${params.row.id}/`}
            target='_blank'
            // onClick={() =>
            //   HttpClient.downloadFile(
            //     process.env.NEXT_PUBLIC_BASE_API + `/seafarer-travel-documents/download/${params.row.id}/`,
            //     params.row.filename
            //   )
            // }
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
        return user_id == userSession?.id ? (
          <>
            <IconButton
              size='small'
              title={`Update this Travel Document Id = ${params.row.id} `}
              onClick={() => {
                handleModalForm('edit', params.row)
              }}
            >
              <Icon icon='material-symbols:edit-square-outline' width='24' height='24' color={thisGray} />
            </IconButton>
            <IconButton
              size='small'
              title={`Update this Travel Document Id = ${params.row.id} `}
              onClick={() => {
                handleModalDelete(params.row)
              }}
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
        <SeafarerTravelDocumentForm
          key={seafarerTravelDocument ? seafarerTravelDocument['id'] : 0}
          seafarerTravelDocument={seafarerTravelDocument}
          user_id={user_id}
          type={modalFormType}
          handleModalForm={handleModalForm}
          loadTravelDocument={loadTravelDocument}
          showModal={modalFormOpen}
        />
      )}
      {userSession.id == user_id && (
        <SeafarerTravelDocumentDeleteConfirm
          seafarerTravelDocument={seafarerTravelDocument}
          handleModalDelete={handleModalDelete}
          loadTravelDocument={loadTravelDocument}
          showModal={modalDeleteOpen}
        />
      )}
      <Grid container xs={12} md={12} lg={12}>
        <Grid item xs={12} md={6} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Travel Document
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
                <div> Add more Travel Document </div>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
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
      <Divider style={{ width: '100%', margin: '20px 0' }} />
    </>
  )
}

export default SeafarerTravelDocumentTable
