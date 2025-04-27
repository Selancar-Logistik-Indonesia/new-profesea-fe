import { Box, Button, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import PopupDetails from "./PopupDetails";
import { useState } from "react";
import { IFeedbackRowData } from "src/contract/models/feedback";




const TableUser = ({feedbacks, loading, onChangePage, page, perPage} : {feedbacks:IFeedbackRowData[], loading:boolean, onChangePage: any, page:number, perPage:number }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<IFeedbackRowData | null>(null)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


    const handleClick = (row: any, e: React.MouseEvent<HTMLButtonElement>) =>{
        setAnchorEl(e.currentTarget);
        setSelectedRow(row)
        setIsOpen(true)
    }

    const handleClose = () =>{
        setIsOpen(false)
        setAnchorEl(null);
    }

    const column: GridColDef[] = [
        { field: 'no', headerName: 'No.', sortable: true,
          renderCell: (cell) => {
            const { row } = cell;

            return (
              <Typography>{row.no}.</Typography>
            )
          }
         },
        { field: 'name', headerName: 'Company Name', sortable: true, minWidth: 200, align:'center', headerAlign:'center' },
        { field: 'email', headerName: 'Email', sortable: true, minWidth: 250, align:'center', headerAlign:'center' },
        { field: 'date', headerName: 'Date Submitted', sortable: true, minWidth: 150, align:'center', headerAlign:'center' },
        { field: 'selectedFeatures', headerName: 'Selected Features', sortable: true, minWidth: 170, align:'center', headerAlign:'center' },
        { field: 'action', headerName: 'Action', sortable: false, minWidth: 130,align:'center', headerAlign:'center',
            renderCell: (cell) => {
                const { row } = cell;

                return (
                  <>
                    <Button sx={{textTransform:'none'}} size='small' variant='contained' onClick={(e:any) => handleClick(row, e)}>View details</Button>
                    <PopupDetails isOpen={isOpen} handleClose={handleClose} row={selectedRow} anchorEl={anchorEl}/>
                  </>
                )
              }
         },

    ]



    return(
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
            paginationMode="server"
            disableColumnMenu
            onPaginationModelChange={onChangePage}
            loading={loading}
            disableColumnFilter
            columns={column}
            rows={feedbacks}
            initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: perPage,
                    page: page
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