import * as React from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'

import { ISeafarerTravelDocumentDelete } from './SeafarerTravelDocumentInterface'

export default function SeafarerTravelDocumentDeleteConfirm(props: ISeafarerTravelDocumentDelete) {
  const { seafarerTravelDocument, showModal, handleModalDelete, loadTravelDocument } = props
  const id = seafarerTravelDocument?.id

  const deleteTravelDocument = async (id?: number) => {
    try {
      await HttpClient.del(AppConfig.baseUrl + '/seafarer-travel-documents/' + id)

      toast.success('delete travel document success')
      loadTravelDocument()
      handleModalDelete()
    } catch (err) {
      toast.error(JSON.stringify(err), { icon: 'danger' })
    }
  }

  return (
    <React.Fragment>
      <Dialog onClose={() => handleModalDelete()} open={showModal} maxWidth={'md'}>
        <DialogTitle>
          <IconButton
            aria-label='close'
            onClick={() => handleModalDelete()}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              Delete Travel Document
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure want to delete this travel document{' '}
            <b>
              {seafarerTravelDocument?.document} -{seafarerTravelDocument?.no}
            </b>{' '}
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => deleteTravelDocument(id)}>
            Delete {}
          </Button>
          <Button autoFocus onClick={() => handleModalDelete()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
