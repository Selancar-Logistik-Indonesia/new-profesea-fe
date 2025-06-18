import { Box, Button } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useState } from "react";
import { IReportedRowData } from "src/contract/models/report";




const ReportedDataGrid = ({feedbacks, loading, onChangePage, page, perPage, activeTab, rowCount} : {reports:IReportedRowData[], loading:boolean, onChangePage: any, page:number, perPage:number, activeTab:string, rowCount:number }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<IReportedRowData | null>(null)
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
        { field: 'content', headerName: 'Content Preview', sortable: true, minWidth: 200, align:'center', headerAlign:'center' },
        { field: 'postedBy', headerName: 'Posted By', sortable: true, minWidth: 250, align:'center', headerAlign:'center' },
        { field: 'reportedBy', headerName: 'Reported By', sortable: true, minWidth: 150, align:'center', headerAlign:'center' },
        { field: 'community', headerName: 'Community', sortable: true, minWidth: 170, align:'center', headerAlign:'center' },
        { field: 'reasons', headerName: 'Reason(s)', sortable: true, minWidth: 170, align:'center', headerAlign:'center' },
        { field: 'date', headerName: 'Date', sortable: true, minWidth: 170, align:'center', headerAlign:'center' },
        { field: 'action', headerName: 'Action', sortable: false, minWidth: 130,align:'center', headerAlign:'center',
            renderCell: (cell) => {
                const { row } = cell;

                return (
                  <>
                    <Button sx={{textTransform:'none'}} size='small' variant='contained' onClick={(e:any) => handleClick(row, e)}>View details</Button>
                  </>
                )
              }
         },

    ]



    return(
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid
            pageSizeOptions={[10,25,50,100]}
            rowCount={rowCount}
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



export default ReportedDataGrid