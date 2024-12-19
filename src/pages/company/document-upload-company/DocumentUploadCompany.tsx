import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FadeProps,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material'
import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import { IDocument } from 'src/contract/models/document'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import CompanyDocument from 'src/layouts/components/onboarding/CompanyDocument'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DocumentUploadCompany = () => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [documents, setDocuments] = useState<IDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [onLoadingDelete, setOnLoadingDelete] = useState(false)
  const [docId, setDocId] = useState(null)

  const firstLoad = () => {
    setLoading(true)
    HttpClient.get(AppConfig.baseUrl + '/user/document').then(response => {
      const itemData = response.data.documents

      const arr = []

      for (let x = 0; x < itemData.length; x++) {
        const element = itemData[x]
        if (element.childs.length > 0) {
          arr.push({ id: element.id, name: element.document_type })
        }
      }

      setDocuments(itemData)
      setLoading(false)
    })
  }

  const handleDeleteDocument = async () => {
    setOnLoadingDelete(true)
    const resp = await HttpClient.del(`/user/document/` + docId)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    firstLoad()
    setModalDeleteOpen(false)
    setOnLoadingDelete(false)
  }

  const openModalDelete = (id: any) => {
    setDocId(id)
    setModalDeleteOpen(true)
  }

  useEffect(() => {
    firstLoad()
  }, [])

  return (
    <>
      <Dialog open={modalDeleteOpen} maxWidth='sm' TransitionComponent={Transition}>
        <DialogContent sx={{ padding: '0px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
            <Box>
              <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                Delete Document
              </Typography>
            </Box>
            <IconButton size='small' onClick={() => setModalDeleteOpen(!modalDeleteOpen)}>
              <Icon icon='mdi:close' fontSize={'16px'} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: '32px',
              px: '16px',
              borderTop: '1px solid #F0F0F0',
              borderBottom: '1px solid #F0F0F0'
            }}
          >
            <Typography>Are you sure you want to delete this document?</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '0px', display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              gap: 4
            }}
          >
            <Button
              variant='contained'
              size='small'
              onClick={() => setModalDeleteOpen(!modalDeleteOpen)}
              sx={{
                background: '#DDD',
                flex: 1,
                border: 'none',
                textTransform: 'capitalize',
                color: '#404040',
                '&:hover': {
                  backgroundColor: 'initial'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={() => handleDeleteDocument()}
              sx={{ background: 'red', textTransform: 'capitalize', flex: 1 }}
            >
              {onLoadingDelete ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Delete'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth open={openDialog} maxWidth='md' scroll='body' TransitionComponent={Transition}>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                Add Document
              </Typography>
            </Box>
            <IconButton size='small' onClick={() => setOpenDialog(false)}>
              <Icon icon='mdi:close' fontSize={'16px'} />
            </IconButton>
          </Box>
          <Box sx={{ mt: '24px' }}>
            <CompanyDocument
              beforeLink='test'
              isEditCompany={true}
              onClose={() => {
                setOpenDialog(false)
                firstLoad()
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : documents?.length == 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: isMobile ? '64px' : '78px',
            px: isMobile ? '24px' : '360px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <Image src={'/images/clarity_certificate-line.png'} alt={'mdl2'} width={'64'} height={'65'} />
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#404040', textAlign: 'center' }}>
                No document yet
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#404040', textAlign: 'center' }}>
                Submit the necessary documents for verification to gain the ability to post jobs and connect with
                potential candidates.
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                variant='outlined'
                onClick={() => setOpenDialog(true)}
              >
                <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                Add Document
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '32px',
              gap: isMobile ? '40px' : 0,
              marginTop: '20px'
            }}
          >
            <Box>
              <Typography fontSize={16} fontWeight={700} color={'#32497A'}>
                Document
              </Typography>
              <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                Submit documents to verify and start posting jobs
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                variant='outlined'
                onClick={() => setOpenDialog(true)}
              >
                <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                Add
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {documents.filter(d => d.document_type == 'M1').length != 0 && (
              <Box>
                <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700, mb: '6px' }}>NIB</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {documents
                    .filter(d => d.document_type === 'M1')
                    .map((d, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '12px',
                          background: '#FAFAFA',
                          border: '1px solid #BFBFBF',
                          borderRadius: '8px'
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <Icon icon='ph:file-text' fontSize={24} />
                          <Box
                            onClick={() => window.open(d?.path, '_blank')}
                            sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                          >
                            <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700 }}>
                              {d?.document_name}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton onClick={() => openModalDelete(d?.id)}>
                          <Icon icon='ic:baseline-clear' />
                        </IconButton>
                      </Box>
                    ))}
                </Box>
              </Box>
            )}
            {documents.filter(d => d.document_type == 'M2').length != 0 && (
              <Box>
                <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700, mb: '6px' }}>Menkumham</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {documents
                    .filter(d => d.document_type === 'M2')
                    .map((d, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '12px',
                          background: '#FAFAFA',
                          border: '1px solid #BFBFBF',
                          borderRadius: '8px'
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <Icon icon='ph:file-text' fontSize={24} />
                          <Box
                            onClick={() => window.open(d?.path, '_blank')}
                            sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                          >
                            <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700 }}>
                              {d?.document_name}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton onClick={() => openModalDelete(d?.id)}>
                          <Icon icon='ic:baseline-clear' />
                        </IconButton>
                      </Box>
                    ))}
                </Box>
              </Box>
            )}
            {documents.filter(d => d.document_type == 'M3').length != 0 && (
              <Box>
                <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700, mb: '6px' }}>SIUPAKK</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {documents
                    .filter(d => d.document_type === 'M3')
                    .map((d, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '12px',
                          background: '#FAFAFA',
                          border: '1px solid #BFBFBF',
                          borderRadius: '8px'
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <Icon icon='ph:file-text' fontSize={24} />
                          <Box
                            onClick={() => window.open(d?.path, '_blank')}
                            sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                          >
                            <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700 }}>
                              {d?.document_name}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton onClick={() => openModalDelete(d?.id)}>
                          <Icon icon='ic:baseline-clear' />
                        </IconButton>
                      </Box>
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        </div>
      )}
    </>
  )
}

export default DocumentUploadCompany
