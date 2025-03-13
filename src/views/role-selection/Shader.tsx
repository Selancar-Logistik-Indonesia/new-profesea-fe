import { Box } from '@mui/material'

const Shader = ({ employeeType, value }: { employeeType: string; value: string }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: employeeType === value || employeeType === '' ? 0.1 : 0.5,
        zIndex: 2
      }}
    />
  )
}

export default Shader
