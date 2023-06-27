// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

import { AppConfig } from "src/configs/api";

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { HttpClient } from 'src/services/index'

type Order = 'asc' | 'desc'

interface Data {
  id: number
  address: string
  country_id: number
  created_at: string
  email: string
  email_verified_at: string
  joblevel_id: number
  name: string
  phone: string
  role: string
  team: string
  team_id: number
  updated_at: string
  username: string
  plan_type: string
  about: string
  status: string
  action: string
}

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

  return stabilizedThis.map(el => el[0])
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'email'
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'phone'
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role'
  },
  {
    id: 'team_id',
    numeric: false,
    disablePadding: true,
    label: 'Plan'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Status'
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: true,
    label: 'Action'
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
        <TableCell padding='checkbox'>
          <Checkbox
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{ 'aria-label': 'select all desserts' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
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
      </TableRow>
    </TableHead>
  )
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  // ** Prop
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        px: theme => `${theme.spacing(5)} !important`,
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          Account List
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton sx={{ color: 'text.secondary' }}>
            <Icon icon='mdi:delete-outline' />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  )
}

const Accounts = () => {

  const [users, getUsers] = useState('');
  useEffect(() => {
    showAll();
  }, [])
  const showAll = () => {
    HttpClient.get(AppConfig.baseUrl + "/user/all")
      .then((response) => {
        const allData = response.data.users;
        getUsers(allData);
      }).catch(error => console.error(`Error : ${error}`));
  }
  const rows = Object.values(users);
  console.log(rows)

  // console.log(users)

  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<Order>('asc')
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [orderBy, setOrderBy] = useState<keyof Data>('name')
  const [selected, setSelected] = useState<readonly string[]>([])

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // gagal build, komen dlu :v
      // const newSelecteds = rows.map(n => n.name)
      // setSelected(newSelecteds)

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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={12}>
          <Card>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='role-select'>Select Role</InputLabel>
                    <Select
                      fullWidth
                      id='select-role'
                      label='Select Role'
                      labelId='role-select'
                      inputProps={{ placeholder: 'Select Role' }}
                    >
                      <MenuItem value=''>Select Role</MenuItem>
                      <MenuItem value='admin'>Admin</MenuItem>
                      <MenuItem value='author'>Author</MenuItem>
                      <MenuItem value='editor'>Editor</MenuItem>
                      <MenuItem value='maintainer'>Maintainer</MenuItem>
                      <MenuItem value='subscriber'>Subscriber</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='plan-select'>Select Plan</InputLabel>
                    <Select
                      fullWidth
                      id='select-plan'
                      label='Select Plan'
                      labelId='plan-select'
                      inputProps={{ placeholder: 'Select Plan' }}
                    >
                      <MenuItem value=''>Select Plan</MenuItem>
                      <MenuItem value='basic'>Basic</MenuItem>
                      <MenuItem value='company'>Company</MenuItem>
                      <MenuItem value='enterprise'>Enterprise</MenuItem>
                      <MenuItem value='team'>Team</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='status-select'>Select Status</InputLabel>
                    <Select
                      fullWidth
                      value={status}
                      id='select-status'
                      label='Select Status'
                      labelId='status-select'
                      inputProps={{ placeholder: 'Select Role' }}
                    >
                      <MenuItem value=''>Select Role</MenuItem>
                      <MenuItem value='pending'>Pending</MenuItem>
                      <MenuItem value='active'>Active</MenuItem>
                      <MenuItem value='inactive'>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={rows.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(rows as any, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name.toString())
                        const labelId = `enhanced-table-checkbox-${index}`

                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={row.name}
                            role='checkbox'
                            selected={isItemSelected}
                            aria-checked={isItemSelected}>
                            <TableCell padding='checkbox' onClick={event => handleClick(event, row.name.toString())}>
                              <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                            </TableCell>
                            <TableCell component='th' id={labelId} scope='row' padding='none'>
                              {row.name}
                            </TableCell>
                            <TableCell align='left'>{row.email}</TableCell>
                            <TableCell align='left'>{row.phone}</TableCell>
                            <TableCell align='left'>{row.role}</TableCell>
                            <TableCell align='left'>{row.plan_type}</TableCell>
                            <TableCell align='left'>{row.about}</TableCell>
                            <TableCell>
                              <IconButton aria-label='edit' color='warning' size='small'>
                                <Icon icon='mdi:pencil' />
                              </IconButton>
                              <IconButton aria-label='delete' color='error' size='small'>
                                <Icon icon='mdi:trash' />
                              </IconButton>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Accounts