import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons
} from '@mui/x-data-grid'

import { Grid, Typography } from '@mui/material'

const initialRows: GridRowsProp = [
  {
    id: 1,
    document: 'Seaman Book / ID Card',
    no: '12345678',
    date_of_issue: new Date(),
    country_issue: 'Indonesia',
    valid_date: new Date()
  },
  {
    id: 2,
    document: 'Passport',
    no: '12345678',
    date_of_issue: new Date(),
    country_issue: 'Indonesia',
    valid_date: new Date()
  },
  {
    id: 3,
    document: 'USA Visa',
    no: '12345678',
    date_of_issue: new Date(),
    country_issue: 'Indonesia',
    valid_date: new Date()
  },

  {
    id: 4,
    document: 'Schengen Visa',
    no: '12345678',
    date_of_issue: new Date(),
    country_issue: 'Indonesia',
    valid_date: new Date()
  }
]

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = 1
    setRows(oldRows => [...oldRows, { id, document: '', no: '', isNew: true }])
    setRowModesModel(oldModel => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'document' }
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  )
}

function TravelDocumentTable() {
  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({})

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter(row => row.id !== id))
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = rows.find(row => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter(row => row.id !== id))
    }
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const columns: GridColDef[] = [
    { field: 'document', headerName: 'Document', width: 220, editable: true },
    {
      field: 'no',
      headerName: 'No',
      type: 'string',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'date_of_issue',
      headerName: 'Date of Issue',
      type: 'date',
      width: 180,
      editable: true
    },
    {
      field: 'country_issue',
      headerName: 'Country Issue',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Indonesia', 'United Kingdom', 'United State of America']
    },
    {
      field: 'valid_date',
      headerName: 'Valid Date',
      type: 'date',
      width: 180,
      editable: true
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />
        ]
      }
    }
  ]

  return (
    <>
      <Grid xs={10} md={11}>
        <Grid container item xs={12} justifyContent={'left'}>
          <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
            Travel Document
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          height: 400,
          width: '100%'
          // '& .actions': {
          //   color: 'text.secondary'
          // },
          // '& .textPrimary': {
          //   color: 'text.primary'
          // }
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel }
          }}
        />
      </Box>
    </>
  )
}

export default TravelDocumentTable
