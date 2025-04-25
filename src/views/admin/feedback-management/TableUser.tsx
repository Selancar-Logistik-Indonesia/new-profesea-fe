import { Box, Button } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import PopupDetails from "./PopupDetails";
import { useState } from "react";



const TableUser = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState()


    const handleClick = (row: any) =>{
        setSelectedRow(row)
        setIsOpen(true)
    }

    const handleClose = () =>{
        setIsOpen(false)
    }

    const column: GridColDef[] = [
        { field: 'no', headerName: 'No.', sortable: true },
        { field: 'name', headerName: 'Company Name', sortable: true, minWidth: 300 },
        { field: 'email', headerName: 'Email', sortable: true, minWidth: 250 },
        { field: 'date', headerName: 'Date Submitted', sortable: true, minWidth: 150 },
        { field: 'selectedFeatures', headerName: 'Selected Features', sortable: true, minWidth: 100 },
        { field: 'action', headerName: 'Action', sortable: false, minWidth: 100,
            renderCell: (cell) => {
                const { row } = cell;

                return (
                  <>
                    <Button variant='contained' onClick={() => handleClick(row)}>View</Button>
                    <PopupDetails isOpen={isOpen} handleClose={handleClose}/>
                  </>
                )
              }
         },

    ]

    const testRows = [
        {
        id:1,
        no: 12,
        name:'test user',
        email:'test email',
        date:'12-12-2025',
        selectedFeatures:8
    },
        {
        id:1,
        no: 12,
        name:'test user',
        email:'test email',
        date:'12-12-2025',
        selectedFeatures:8
    },
]


    return(
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
            disableColumnFilter
            columns={column}
            rows={testRows}
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 2,
                    page: 1
                  }
                }
              }}
              disableRowSelectionOnClick
              getRowId={row => row.id}
            />
        </Box>
    )
}



export default TableUser