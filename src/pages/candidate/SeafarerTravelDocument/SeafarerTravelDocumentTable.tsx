import { useEffect, useState } from 'react'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { Box, Card, CardContent, Paper, Grid, Typography, Button, IconButton, Hidden } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'

import { ISeafarerTravelDocumentProps } from './../../../contract/types/seafarer_travel_document_type'
import ISeafarerTravelDocumentData from './../../../contract/models/seafarer_travel_document'

import SeafarerTravelDocumentForm from './SeafarerTravelDocumentForm'
import SeafarerTravelDocumentDeleteConfirm from './SeafarerTravelDocumentDeleteConfirm'
import LoadingIcon from 'src/layouts/components/LoadingIcon'
import CustomNoRowsOverlay from 'src/layouts/components/NoRowDataTable'
import { IUser } from 'src/contract/models/user'

const SeafarerTravelDocumentTable = (props: ISeafarerTravelDocumentProps) => {
  // const [rows, setRows] = useState([])
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
          country_issue: item.country.name,
          date_of_issue: new Date(item.date_of_issue),
          valid_date_column: item.valid_date ? new Date(item?.valid_date) : 'lifetime'
        }
      })

      //setRows(result)
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

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '.MuiDataGrid-grid-scrollContainer': {
      overflow: 'scroll !important',
      '&::-webkit-scrollbar-track': {
        width: '6px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px'
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
        backgroundColor: '#f5f5f5'
      }
    }
  }))

  // const columns: GridColDef[] = [
  //   { field: 'document', headerName: 'Document', flex: 1 },
  //   {
  //     field: 'no',
  //     headerName: 'No',
  //     type: 'string',

  //     align: 'left',
  //     headerAlign: 'left',
  //     flex: 1
  //   },
  //   {
  //     field: 'date_of_issue',
  //     headerName: 'Date of Issue',
  //     type: 'date',

  //     flex: 1
  //   },
  //   {
  //     field: 'country_issue',
  //     headerName: 'Country Issue',
  //     type: 'number',

  //     flex: 1
  //   },
  //   {
  //     field: 'valid_date_column',
  //     headerName: 'Valid Date',
  //     type: 'string',

  //     flex: 1
  //   },
  //   {
  //     field: 'download',
  //     headerName: 'Download',

  //     flex: 1,
  //     renderCell(params: any) {
  //       return user_id == userSession?.id && params.row.filename ? (
  //         <a
  //           href='#'
  //           onClick={() =>
  //             HttpClient.downloadFile(
  //               process.env.NEXT_PUBLIC_BASE_API + `/seafarer-travel-documents/download/${params.row.id}/`,
  //               params.row.filename
  //             )
  //           }
  //         >
  //           {' '}
  //           <Icon icon='bi:file-earmark-arrow-down-fill' width='24' height='24' color={thisGray} />{' '}
  //         </a>
  //       ) : (
  //         ''
  //       )
  //     }
  //   },
  //   {
  //     field: 'action',
  //     headerName: 'Action',

  //     flex: 1,
  //     renderCell(params: any) {
  //       return user_id == userSession?.id ? (
  //         <>
  //           <IconButton
  //             size='small'
  //             title={`Update this Travel Document Id = ${params.row.id} `}
  //             onClick={() => {
  //               handleModalForm('edit', params.row)
  //             }}
  //           >
  //             <Icon icon='material-symbols:edit-square-outline' width='24' height='24' color={thisGray} />
  //           </IconButton>
  //           <IconButton
  //             size='small'
  //             title={`Update this Travel Document Id = ${params.row.id} `}
  //             onClick={() => {
  //               handleModalDelete(params.row)
  //             }}
  //           >
  //             <Icon icon='material-symbols:delete-outline' width='24' height='24' color={thisGray} />
  //           </IconButton>
  //         </>
  //       ) : (
  //         ''
  //       )
  //     }
  //   }
  // ]

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
      <Grid container direction='column' spacing={1} item xs={12} md={6} lg={12}>
        <Grid item xs={12} md={6} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Travel Document
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container md={12} xs={12} justifyContent={'right'}>
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
                <div> Add Travel Document </div>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item spacing={6} className='match-height'>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          <CardContent>
            <Box style={{ width: '100%' }}>
              <StyledDataGrid
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
                slots={{ noRowsOverlay: loading ? LoadingIcon : CustomNoRowsOverlay }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default SeafarerTravelDocumentTable
