import { Icon } from '@iconify/react'
import { Box, Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import CompanyDocument from 'src/layouts/components/onboarding/CompanyDocument'

type DialogProps = {
  visible: boolean
  onCloseClick: VoidFunction
}

const DialogUpload = (props: DialogProps) => {
  const { visible, onCloseClick } = props

  return (
    <Dialog maxWidth='md' fullWidth={true} open={visible} onClose={onCloseClick}>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
              Add Document
            </Typography>
          </Box>
          <IconButton size='small' onClick={() => onCloseClick()}>
            <Icon icon='mdi:close' fontSize={'16px'} />
          </IconButton>
        </Box>
        <Box sx={{ mt: '24px' }}>
          <CompanyDocument
            beforeLink='none'
            isEditCompany={true}
            onClose={() => {
              onCloseClick()
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DialogUpload
