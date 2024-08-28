import { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import LoadingIcon from 'src/layouts/components/LoadingIcon'
import CustomNoRowsOverlay from 'src/layouts/components/NoRowDataTable'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

import ISeafarerProficiencyData from '../../contract/models/seafarer_proficiency'
import { IUser } from 'src/contract/models/user'

interface ISeafarerProficiencyTable {
  user_id: number | null | undefined
  selectedUser: IUser | null
  isHiddenData: boolean
  isEditable: boolean
  handleModalForm: any
  handleModalDelete: any
}

export default function SeafarerProficiencyTable(props: ISeafarerProficiencyTable) {
  const { user_id, isEditable, isHiddenData, handleModalForm, handleModalDelete } = props
  const thisGray = 'rgba(66, 66, 66, 1)'
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const loadProficiency = () => {
    setLoading(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-proficiencies/user-id/' + user_id).then(response => {
      const result = response.data.data.map((item: ISeafarerProficiencyData) => {
        return {
          ...item,
          certificate_number: item.certificate_number,
          certificate_name: item.proficiency.title,
          country: item.country.name
        }
      })

      setRows(result)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (user_id) {
      loadProficiency()
    }
  }, [user_id])

  const columns: GridColDef[] = [
    { field: 'certificate_name', headerName: 'Certificate Name', type: 'string', width: 220, editable: false },
    {
      field: 'certificate_number',
      headerName: 'Certificate Number',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params: any) => {
        return isHiddenData ? '***** ****** ******' : params.certificate_number
      }
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
    }
  ]

  const columnDownload: GridColDef[] = [
    {
      field: 'download',
      headerName: 'Credentials',

      width: 180,
      renderCell(params: any) {
        return params.row.filename ? (
          <a
            href='#'
            onClick={() =>
              HttpClient.downloadFile(
                process.env.NEXT_PUBLIC_BASE_API + `/seafarer-proficiencies/download/${params.row.id}/`,
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
    }
  ]

  const columnAction: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell(params: any) {
        return (
          <>
            <IconButton
              size='small'
              title={`Update this Proficiency Id = ${params.row.id} `}
              onClick={() => handleModalForm('edit', params.row)}
            >
              <Icon icon='material-symbols:edit-square-outline' width='24' height='24' color={thisGray} />
            </IconButton>
            <IconButton
              size='small'
              title={`Update this Competency Id = ${params.row.id} `}
              onClick={() => handleModalDelete(params.row)}
            >
              <Icon icon='material-symbols:delete-outline' width='24' height='24' color={thisGray} />
            </IconButton>
          </>
        )
      }
    }
  ]

  const settingColumn = user?.is_crewing == 1 ? [...columnDownload] : []

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
