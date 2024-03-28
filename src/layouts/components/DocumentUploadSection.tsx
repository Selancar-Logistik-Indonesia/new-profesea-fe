import { Key } from 'react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

interface IDocumentUpload {
  setOpenAddModalDoc: (openAddModalDoc: boolean) => void
  openAddModalDoc: boolean
  editDocument: (itemhead: {
    id: React.Key | null | undefined
    document_name: string | null | undefined
    path: string
  }) => void
  itemData: any
  deleteDocument: (itemheadId: Key | null | undefined) => void
}

export default function DocumentUploadSection(props: IDocumentUpload) {
  const { setOpenAddModalDoc, editDocument, deleteDocument, itemData, openAddModalDoc } = props

  return (
    <>
      <Grid item container xs={12}>
        <Grid xs={10} md={11}>
          <Grid container item xs={12} justifyContent={'left'}>
            <Typography variant='body2' sx={{ color: '#32487A', fontSize: '18px', fontWeight: '600' }}>
              Document Upload
            </Typography>
          </Grid>
          <Grid container item xs={12} justifyContent={'left'}>
            <Typography variant='body2' sx={{ color: '#262525', fontSize: '12px' }}>
              Upload your Document Info
            </Typography>
          </Grid>
        </Grid>
        <Grid display='flex' justifyContent='flex-end' alignItems='flex-end' xs={2} md={1}>
          <Button variant='contained' size='small' onClick={() => setOpenAddModalDoc(!openAddModalDoc)}>
            <Icon
              fontSize='small'
              icon={'solar:add-circle-bold-duotone'}
              color={'success'}
              style={{ fontSize: '18px' }}
            />
            <div style={{ marginLeft: 5 }}>ADD</div>
          </Button>
        </Grid>
        <Divider style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
        <Grid item container xs={12}>
          {itemData.map((itemhead: any) => (
            <>
              <Typography> {itemhead.document_name}</Typography>
              <Grid item container xs={12} marginTop={2} key={itemhead.id} alignItems='center'>
                <Grid xs={12} md={9} container direction='row' alignItems='center'>
                  <Icon
                    fontSize='large'
                    icon={'solar:document-bold'}
                    color={'info'}
                    style={{ fontSize: '18px', margin: '5px' }}
                  />
                  <Typography variant='body2' sx={{ color: '#262525', fontSize: '14px' }}>
                    {itemhead.document_number}
                  </Typography>
                </Grid>
                <Grid xs={12} md={3} display='flex' item container>
                  <Grid xs={12} md={12} container direction='row' justifyContent='flex-end' alignItems='center'>
                    <Box margin={1}>
                      <Button variant='outlined' color='info' size='small' href={itemhead.path} target='_blank'>
                        <Icon
                          fontSize='large'
                          icon={'icon-park-outline:preview-open'}
                          color={'info'}
                          style={{ fontSize: '18px' }}
                        />
                      </Button>
                    </Box>
                    <Box margin={1}>
                      <Button variant='outlined' color='primary' size='small' onClick={() => editDocument(itemhead)}>
                        <Icon
                          fontSize='large'
                          icon={'solar:pen-new-round-bold-duotone'}
                          color={'primary'}
                          style={{ fontSize: '18px' }}
                        />
                      </Button>
                    </Box>
                    <Box margin={1}>
                      <Button variant='outlined' color='error' size='small' onClick={() => deleteDocument(itemhead.id)}>
                        <Icon
                          fontSize='large'
                          icon={'solar:trash-bin-trash-bold-duotone'}
                          color={'error'}
                          style={{ fontSize: '18px' }}
                        />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Divider style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
            </>
          ))}
        </Grid>
      </Grid>
    </>
  )
}
