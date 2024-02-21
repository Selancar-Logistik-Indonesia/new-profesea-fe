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

import ISeafarerExperienceData from '../../contract/models/seafarer_experience'
import { IUser } from 'src/contract/models/user'

interface ISeafarerExperienceTable {
  user_id: number | undefined
  isEditable: boolean
  isDataHidden: boolean
  handleModalForm: any
  handleModalDelete: any
}



export default function SeafarerExperienceTable(props:ISeafarerExperienceTable) {
  
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

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
        type: 'date'
      },
      {
        field: 'sign_off',
        headerName: 'Sign Off',
        width: 150,
        type: 'date'
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
    return ()
}