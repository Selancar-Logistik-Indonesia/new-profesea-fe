import { PaginationItem } from '@mui/material'

const CustomPaginationItem = (props: any) => {
  const { selected, ...other } = props

  return (
    <PaginationItem
      {...other}
      sx={{
        border: 'none',
        fontWeight: 400,
        borderRadius: '4px',
        margin: '0 4px',
        ...(selected
          ? {
              backgroundColor: '#32497A',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#32497A'
              }
            }
          : {
              backgroundColor: '#DDDDDD',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#CCCCCC'
              }
            })
      }}
    />
  )
}

export default CustomPaginationItem
