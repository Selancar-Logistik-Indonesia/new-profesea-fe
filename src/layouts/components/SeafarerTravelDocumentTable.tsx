import { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import LoadingIcon from 'src/layouts/components/LoadingIcon'
import CustomNoRowsOverlay from 'src/layouts/components/NoRowDataTable'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

import { IUser } from 'src/contract/models/user'
import ISeafarerTravelDocumentData from '../../contract/models/seafarer_travel_document'

interface ISeafarerTravelDocumentTable {
  user_id: number | null | undefined
  selectedUser: IUser | null
  isEditable: boolean
  isDataHidden: boolean
  handleModalForm: any
  handleModalDelete: any
}

export default function SeafarerTravelDocumentTable(props: ISeafarerTravelDocumentTable) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const { user_id, isEditable, isDataHidden, handleModalForm, handleModalDelete } = props

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

      setRows(result)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (user_id) {
      loadTravelDocument()
    }
  }, [user_id])

  const columns: GridColDef[] = [
    { field: 'document', headerName: 'Document', width: 220 },
    {
      field: 'no',
      headerName: 'No',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      renderCell(params: any) {
        return isDataHidden == true ? '***** ***** *****' : params.row.no
      }
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
    }
  ]

  const columnDownload: GridColDef[] = [
    {
      field: 'download',
      headerName: 'Credentials',

      width: 180,
      renderCell(params: any) {
        return user_id == userSession?.id && params.row.filename ? (
          <a
            href='#'
            onClick={() =>
              HttpClient.downloadFile(
                process.env.NEXT_PUBLIC_BASE_API + `/seafarer-travel-documents/download/${params.row.id}/`,
                params.row.filename
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
    }
  ]

  const columnAction: GridColDef[] = [
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

  const settingColumn = userSession?.is_crewing == 1 ? [...columnDownload] : []

  const finalColumn = isEditable ? [...columns, ...settingColumn, ...columnAction] : [...columns, ...settingColumn]

  return (
    <DataGrid
      autoHeight={true}
      rows={rows}
      columns={finalColumn}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 }
        }
      }}
      pageSizeOptions={[5, 10]}
      slots={{ noRowsOverlay: loading ? LoadingIcon : CustomNoRowsOverlay }}
      getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
    />
  )
}
