// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, Ref, useState, forwardRef, ReactElement, useCallback  } from 'react'

import { AppConfig } from "src/configs/api";
// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import DialogAdd from 'src/pages/admin/master/job-categories/DialogAdd'
import Fade, { FadeProps } from '@mui/material/Fade'

import { HttpClient } from 'src/services/index'
import DialogEdit from './DialogEdit';
import DialogDelete from './DialogDelete';
import TextField from '@mui/material/TextField';
import i18n from "i18next";

import { useTranslation, initReactI18next } from "react-i18next";
import ns1 from 'src/lang/id.json';
import ns2 from 'src/lang/en.json';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            id: ns1,
            en: ns2
        },

        // if you're using a language detector, do not define the lng optio
        fallbackLng: "id",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

type Order = 'asc' | 'desc'
type props = {};

interface Data {
  id : number
  name : string
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface EnhancedTableToolbarProps {
  numSelected: number
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })

  console.log(stabilizedThis)
  return stabilizedThis.map(el => el[0])
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  }
]

function EnhancedTableHead(props: EnhancedTableProps) {
  // ** Props
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='normal'align='center'>
          No
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding='none'align='center'>
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

const TraingCategory = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<Order>('asc')
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [orderBy, setOrderBy] = useState<keyof Data>('name')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [searched, setSearched] = useState<string>('')

  const [category, getCategory] = useState<any>([]);
  const [rows, getRows] = useState<Data[]>([]);
  // const [rows, setRows] = useState('');
  const apiPage = page + 1;
  const showAll = () =>{
    // console.log(rowsPerPage)
    HttpClient.get(AppConfig.baseUrl+"/job-category?search="+searched+"&page="+apiPage+"&take="+rowsPerPage)
    .then((response)=>{
      const allData = response.data.categories;
      getCategory(allData);
      getRows(allData.data);
    }).catch(error => console.error(`Error : ${error}`));
  }

  useEffect(()=>{
    showAll();
  }, [apiPage, rowsPerPage, searched])


  const handleSearch = (val: string) => {
    setSearched(val);
    setRowsPerPage(10)
    console.log(val)
    // HttpClient.get(AppConfig.baseUrl+"/job-category?search="+val+"&page="+apiPage+"&take="+rowsPerPage)
    // .then((response)=>{
    //   const allData = response.data.categories;
    //   getCategory(allData);
    //   getRows(allData.data);
    // }).catch(error => console.error(`Error : ${error}`));
  }
 

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - category.total) : 0
  // console.log(emptyRows)

  return (
    <>
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} md={12}>
        <Card>
        <CardHeader title='List Job Categories' sx={{ pb: 3, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid  container justifyContent="flex-end">
              <Grid item>
                <TextField
                size='small'
                sx={{ mr: 6, mb: 2 }}
                placeholder='Search'
                onChange={e => handleSearch(e.target.value)}
                />
              </Grid>
              <Grid item sx={{ mr: 6, mb: 2 }}>
                <DialogAdd />
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={category.total}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
                  {rows
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name)
                      const labelId = `enhanced-table-checkbox-${index}`

                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.name}
                          role='checkbox'
                          selected={isItemSelected}
                          aria-checked={isItemSelected}>
                          {/* <TableCell padding='checkbox' onClick={event => handleClick(event, row.name)}>
                            <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                          </TableCell> */}
                          <TableCell id={labelId} padding='normal' align='center'>
                            {Math.max((page * rowsPerPage) + index + 1)}
                          </TableCell>
                          <TableCell component='th' id={labelId} scope='row' padding='none'>
                            {row.name}
                          </TableCell>
                          <TableCell padding='none'align='center'>
                            <Grid container justifyContent="center">
                              <DialogEdit {...row} />
                              <DialogDelete {...row} />
                            </Grid>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      sx={{
                        height: 53 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              page={page}
              component='div'
              count={category.total || 0}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10, 25, 50, 100, 150, 250]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </>
  )
}

export default TraingCategory
