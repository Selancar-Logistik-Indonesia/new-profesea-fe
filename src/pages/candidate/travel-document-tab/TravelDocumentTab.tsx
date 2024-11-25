import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
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
import Image from 'next/image'
import { Icon } from '@iconify/react'

// interfaces
import ITravelDocumentSeafarer from '../../../contract/models/seafarer_travel_document'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import SeafarerTravelDocumentForm from '../SeafarerTravelDocument/SeafarerTravelDocumentForm'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const TravelDocumentTab = () => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [userTravelDocument, setUserTravelDocument] = useState<ITravelDocumentSeafarer[]>([])
  const [travelDocument, setTravelDocument] = useState()
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [onLoadingDelete, setOnLoadingDelete] = useState(false)
  const [travelId, setTravelId] = useState<any>(null)
  const [modalFormType, setModalFormType] = useState('create')

  const [openModalAdd, setOpenModalAdd] = useState(false)

  const handleFetchTravelDocument = () => {
    HttpClient.get(AppConfig.baseUrl + '/seafarer-travel-documents/user-id/' + user?.id).then(response => {
      const result = response?.data?.data

      setUserTravelDocument(result)
    })
  }

  const handleDeleteTravelDocument = async (id: any) => {
    setOnLoadingDelete(true)
    try {
      await HttpClient.del(AppConfig.baseUrl + '/seafarer-travel-documents/' + id)

      toast.success('delete travel document success')
      handleFetchTravelDocument()
    } catch (err) {
      toast.error(JSON.stringify(err), { icon: 'danger' })
    } finally {
      setOnLoadingDelete(false)
      setTravelId(null)
      setOpenModalDelete(false)
    }
  }

  const handleModalForm = (type: string, data: any = undefined) => {
    setTravelDocument(type == 'edit' ? data : {})
    setModalFormType(type)
    setOpenModalAdd(openModalAdd ? false : true)
  }

  useEffect(() => {
    handleFetchTravelDocument()
  }, [])

  return (
    <>
      <Dialog open={openModalDelete} maxWidth='sm' TransitionComponent={Transition}>
        <DialogContent sx={{ padding: '0px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
            <Box>
              <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                Delete Travel Document
              </Typography>
            </Box>
            <IconButton size='small' onClick={() => setOpenModalDelete(!openModalDelete)}>
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
            <Typography>Are you sure you want to delete your Travel Document?</Typography>
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
              onClick={() => setOpenModalDelete(!openModalDelete)}
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
              onClick={() => handleDeleteTravelDocument(travelId)}
              sx={{ background: 'red', textTransform: 'capitalize', flex: 1 }}
            >
              {onLoadingDelete ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Delete'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <SeafarerTravelDocumentForm
        type={modalFormType}
        key={travelDocument ? travelDocument['id'] : 0}
        seafarerTravelDocument={travelDocument}
        user_id={user?.id}
        handleModalForm={handleModalForm}
        loadTravelDocument={handleFetchTravelDocument}
        showModal={openModalAdd}
      />
      {userTravelDocument.length == 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: isMobile ? '64px' : '78px',
            px: isMobile ? '24px' : '350px'
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '151px', alignItems: 'center' }}>
              <Image src={'/images/fluent-mdl2_education.png'} alt={'mdl2'} width={'64'} height={'65'} />
              <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#404040', textAlign: 'center' }}>
                No travel document yet
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#404040', textAlign: 'center' }}>
                stand out and unlock more opportunities!
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                variant='outlined'
                onClick={() => handleModalForm('create')}
              >
                <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                Add travel document
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <div>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', gap: isMobile ? '40px' : 0 }}
          >
            <Box>
              <Typography fontSize={16} fontWeight={700} color={'#32497A'}>
                Travel Document {`(${userTravelDocument?.length})`}
              </Typography>
              <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                Enhance your profile by adding your travel document
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                variant='outlined'
                onClick={() => handleModalForm('create')}
              >
                <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                Add
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {userTravelDocument.map((e, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
                  background: '#FFF',
                  padding: '24px'
                }}
              >
                <Box>
                  <Typography fontSize={16} fontWeight={700} color={'#404040'}>
                    {e?.document || '-'} - <span style={{ fontWeight: 400 }}>{e?.no || '-'}</span>
                  </Typography>
                  <Typography
                    sx={{ color: 'rgba(82, 82, 82, 1)', fontWeight: 400, fontSize: '14px', lineHeight: '21px' }}
                  >
                    {e?.is_lifetime
                      ? 'Valid Lifetime'
                      : e?.valid_date
                      ? 'Valid until ' + format(new Date(e?.valid_date), 'dd LLL yyyy')
                      : 'Valid until -'}
                  </Typography>
                  <Button
                    variant='outlined'
                    sx={{
                      width: { sm: '100%', md: '160px' },
                      height: '37px',
                      borderColor: 'rgba(50, 73, 122, 1) !important',
                      textTransform: 'capitalize',
                      fontWeight: 400,
                      fontSize: { sm: '14px', md: '14px' },
                      lineHeight: '21px',
                      color: 'rgba(50, 73, 122, 1) !important',
                      marginTop: '8px'
                    }}
                    onClick={() =>
                      window.open(
                        `${process.env.NEXT_PUBLIC_BASE_API}/public/data/travel-document/preview/${e?.id}`,
                        '_blank'
                      )
                    }
                  >
                    Show Credential
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Icon
                      icon={'ph:pencil-simple-line-light'}
                      fontSize={24}
                      style={{ marginRight: '10px', cursor: 'pointer' }}
                      onClick={() => handleModalForm('edit', e)}
                    />
                    <Icon
                      icon={'material-symbols-light:delete-outline'}
                      fontSize={24}
                      style={{ marginRight: '10px', color: 'red', cursor: 'pointer' }}
                      onClick={() => {
                        setOpenModalDelete(true)
                        setTravelId(e?.id)
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </div>
      )}
    </>
  )
}

export default TravelDocumentTab
