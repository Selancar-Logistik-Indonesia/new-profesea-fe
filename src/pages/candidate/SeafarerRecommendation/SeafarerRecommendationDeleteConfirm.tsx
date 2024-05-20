import * as React from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'

import { ISeafarerRecommendationDelete } from '../../../contract/types/seafarer_recommendation_type'

export default function SeafarerRecommendationDeleteConfirm(props: ISeafarerRecommendationDelete) {
  const { seafarerRecommendation, showModal, handleModalDelete, loadRecommendation } = props
  const id = seafarerRecommendation?.id

  const deleteRecommendation = async (id?: number) => {
    try {
      await HttpClient.del(AppConfig.baseUrl + '/seafarer-proficiencies/' + id)

      toast.success('delete Recommendation success')
      loadRecommendation()
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
              Delete Recommendation
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure want to delete this Recommendation : <b>{seafarerRecommendation?.position}</b> ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => deleteRecommendation(id)}>
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
