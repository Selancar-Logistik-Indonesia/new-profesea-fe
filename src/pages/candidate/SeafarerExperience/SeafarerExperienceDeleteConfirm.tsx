import * as React from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'

import { ISeafarerExperienceDelete } from './../../../contract/types/seafarer_experience_type'

export default function SeafarerExperienceDeleteConfirm(props: ISeafarerExperienceDelete) {
  const { seafarerExperience, showModal, handleModalDelete, loadExperience } = props
  const id = seafarerExperience?.id

  const deleteExperience = async (id?: number) => {
    try {
      await HttpClient.del(AppConfig.baseUrl + '/seafarer-experiences/' + id)

      toast('delete experience success')
      loadExperience()
      handleModalDelete()
    } catch (err) {
      handleModalDelete()
      toast(JSON.stringify(err), { icon: 'danger' })
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
              Delete Experience
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure want to delete this experience :{' '}
            <b>
              {seafarerExperience?.vessel_name} - {seafarerExperience?.company}
            </b>{' '}
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => deleteExperience(id)}>
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
