import { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import { Icon } from '@iconify/react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import LoadingIcon from 'src/layouts/components/LoadingIcon'
import CustomNoRowsOverlay from 'src/layouts/components/NoRowDataTable'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

import ISeafarerRecommendationData from '../../contract/models/seafarer_recommendation'
import { IUser } from 'src/contract/models/user'

interface ISeafarerRecommendationTable {
  user_id: number | null | undefined
  selectedUser: IUser | null
  isHiddenData: boolean
  isEditable: boolean
  handleModalDelete: any
}

export default function SeafarerRecommendationTable(props: ISeafarerRecommendationTable) {
  const { user_id, isEditable, handleModalDelete } = props
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    if (user_id) {
      loadRecommendation()
    }
  }, [user_id])

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
              title={`Update this Recommendation Id = ${params.row.id} `}
              onClick={() => handleModalDelete(params.row)}
            >
              <Icon icon='material-symbols:delete-outline' width='24' height='24' />
            </IconButton>
          </>
        )
      }
    }
  ]

  const finalColumn = isEditable ? [...columns, ...columnAction] : [...columns]

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
