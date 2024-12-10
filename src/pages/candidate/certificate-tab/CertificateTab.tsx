import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FadeProps,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material'
import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import ISeafarerCompetencyData from '../../../contract/models/seafarer_competency'
import ISeafarerProficiencyData from '../../../contract/models/seafarer_proficiency'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { differenceInDays, format } from 'date-fns'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import SeafarerCompetencyForm from '../SeafarerCompetency/SeafarerCompetencyForm'
import toast from 'react-hot-toast'
import SeafarerProficiencyForm from '../SeafarerProficiency/SeafarerProficiencyForm'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface ICertificateTabProps {
  defaultValue?: number
}

const CertificateTab: React.FC<ICertificateTabProps> = ({ defaultValue = 0 }) => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [value, setValue] = useState(defaultValue)

  // data user coc
  const [loadingCOC, setLoadingCOC] = useState(false)
  const [userCOC, setUserCOC] = useState<ISeafarerCompetencyData[]>([])
  const [seafarerCompetency, setSeafarerCompetency] = useState(undefined)
  const [modalFormType, setModalFormType] = useState('create')
  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [cocId, setCocId] = useState<any>(null)
  const [onLoadingDelete, setOnLoadingDelete] = useState(false)

  // data user cop
  const [loadingCOP, setLoadingCOP] = useState(false)
  const [userCOP, setUserCOP] = useState<ISeafarerProficiencyData[]>([])
  const [seafarerProficiency, setSeafarerProficiency] = useState()
  const [modalFormTypeTwo, setModalFormTypeTwo] = useState('create')
  const [modalFormOpenTwo, setModalFormOpenTwo] = useState(false)
  const [modalDeleteOpenTwo, setModalDeleteOpenTwo] = useState(false)
  const [copId, setCopId] = useState<any>(null)
  const [onLoadingDeleteTwo, setOnLoadingDeleteTwo] = useState(false)

  const loadCompetency = () => {
    setLoadingCOC(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-competencies/user-id/' + user?.id).then(response => {
      const result = response.data.data.map((item: ISeafarerCompetencyData) => {
        return {
          ...item
        }
      })

      setUserCOC(result)
      setLoadingCOC(false)
    })
  }

  const loadProficiency = () => {
    setLoadingCOP(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-proficiencies/user-id/' + user?.id).then(response => {
      const result = response.data.data.map((item: ISeafarerProficiencyData) => {
        return {
          ...item
        }
      })

      setUserCOP(result)
      setLoadingCOP(false)
    })
  }

  const handleModalForm = (type: string, data: any = undefined) => {
    setModalFormOpen(modalFormOpen ? false : true)
    setModalFormType(type)
    setSeafarerCompetency(type == 'edit' ? data : undefined)
  }

  const handleModalFormCOP = (type: string, data: any = undefined) => {
    setModalFormTypeTwo(type)
    if (type == 'edit') {
      setSeafarerProficiency(data)
    } else {
      setSeafarerProficiency(undefined)
    }

    setModalFormOpenTwo(modalFormOpenTwo ? false : true)
  }

  const deleteCompetency = async (id?: number) => {
    setOnLoadingDelete(true)
    try {
      await HttpClient.del(AppConfig.baseUrl + '/seafarer-competencies/' + id)

      toast.success('delete competency success')
      loadCompetency()
    } catch (err) {
      toast.error(JSON.stringify(err))
    } finally {
      setOnLoadingDelete(false)
      setCocId(null)
      setModalDeleteOpen(false)
    }
  }

  const deleteProficiency = async (id?: number) => {
    try {
      await HttpClient.del(AppConfig.baseUrl + '/seafarer-proficiencies/' + id)

      toast.success('delete proficiency success')
      loadProficiency()
    } catch (err) {
      toast.error(JSON.stringify(err), { icon: 'danger' })
    } finally {
      setOnLoadingDeleteTwo(false)
      setCopId(null)
      setModalDeleteOpenTwo(false)
    }
  }

  const handlerTooltip = (e: any) => {
    const validUntil = e?.valid_until ? new Date(e.valid_until) : null
    const daysLeft = validUntil ? differenceInDays(validUntil, new Date()) : null

    // Tentukan warna berdasarkan kondisi
    const iconColor =
      daysLeft !== null
        ? daysLeft <= 0
          ? 'red' // Expired
          : daysLeft <= 30
          ? '#FFA500' // Warning (H-30)
          : undefined
        : undefined

    return (
      <Typography
        sx={{
          color: '#868686',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '21px',
          flex: '30%',
          display: 'flex', // For aligning tooltip and text
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {validUntil && daysLeft !== null && daysLeft <= 30 && (
          <Tooltip
            title={
              daysLeft <= 0
                ? `Your certificate is no longer valid. Please renew to ensure your profile remains accurate`
                : '`This certificate is nearing expiration. Renew it to maintain profile validity`'
            }
            arrow
          >
            <Icon icon='ion:warning' fontSize={'16px'} color={iconColor} />
          </Tooltip>
        )}
        {validUntil ? `Valid until ${format(validUntil, 'LLL yyyy')}` : 'Valid Lifetime'}
      </Typography>
    )
  }

  useEffect(() => {
    loadCompetency()
    loadProficiency()
  }, [])

  const renderCOC = () => {
    return (
      <>
        <Dialog open={modalDeleteOpen} maxWidth='sm' TransitionComponent={Transition}>
          <DialogContent sx={{ padding: '0px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  Delete Certification of Competency
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
              <Typography>Are you sure you want to delete your Certification of Competency?</Typography>
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
                onClick={() => deleteCompetency(cocId)}
                sx={{ background: 'red', textTransform: 'capitalize', flex: 1 }}
              >
                {onLoadingDelete ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Delete'}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        {userCOC.length == 0 ? (
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
                  No certificate yet
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#404040', textAlign: 'center' }}>
                  Add your certificates to showcase your qualifications
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                  variant='outlined'
                  onClick={() => handleModalForm('create')}
                >
                  <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                  Add Certificate
                </Button>
              </Box>
            </Box>
          </Box>
        ) : loadingCOC ? (
          <div>loading...</div>
        ) : (
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '32px',
                gap: isMobile ? '40px' : 0,
                marginTop: '56px'
              }}
            >
              <Box>
                <Typography fontSize={16} fontWeight={700} color={'#32497A'}>
                  Certificate of Competency
                </Typography>
                <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                  Add your certificates to showcase your qualifications
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
              {userCOC?.map((e, index) => (
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
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Typography fontSize={16} fontWeight={700} color={'#404040'}>
                      {e?.competency?.title} - {e?.certificate_number}
                    </Typography>
                    <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                      {e?.country ? e?.country?.nicename : '-'}
                    </Typography>
                    {handlerTooltip(e)}
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
                          setModalDeleteOpen(true)
                          setCocId(e?.id)
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

  const renderCOP = () => {
    return (
      <>
        <Dialog open={modalDeleteOpenTwo} maxWidth='sm' TransitionComponent={Transition}>
          <DialogContent sx={{ padding: '0px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  Delete Certification of Proficiency
                </Typography>
              </Box>
              <IconButton size='small' onClick={() => setModalDeleteOpenTwo(!modalDeleteOpenTwo)}>
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
              <Typography>Are you sure you want to delete your Certification of Proficiency?</Typography>
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
                onClick={() => setModalDeleteOpenTwo(!modalDeleteOpenTwo)}
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
                onClick={() => deleteProficiency(copId)}
                sx={{ background: 'red', textTransform: 'capitalize', flex: 1 }}
              >
                {onLoadingDeleteTwo ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Delete'}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        {userCOP.length == 0 ? (
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
                  No certificate yet
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#404040', textAlign: 'center' }}>
                  Add your certificates to showcase your qualifications
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                  variant='outlined'
                  onClick={() => handleModalFormCOP('create')}
                >
                  <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                  Add Certificate
                </Button>
              </Box>
            </Box>
          </Box>
        ) : loadingCOP ? (
          <div>loading...</div>
        ) : (
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '32px',
                gap: isMobile ? '40px' : 0,
                marginTop: '56px'
              }}
            >
              <Box>
                <Typography fontSize={16} fontWeight={700} color={'#32497A'}>
                  Certificate of Proficiency
                </Typography>
                <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                  Add your certificates to showcase your qualifications
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                  variant='outlined'
                  onClick={() => handleModalFormCOP('create')}
                >
                  <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                  Add
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {userCOP?.map((e, index) => (
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
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Typography fontSize={16} fontWeight={700} color={'#404040'}>
                      {e?.proficiency?.title} - {e?.certificate_number}
                    </Typography>
                    <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                      {e?.country ? e?.country?.nicename : '-'}
                    </Typography>
                    {handlerTooltip(e)}
                    {/* <Typography
                      sx={{
                        color: '#868686',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '21px',
                        flex: '30%'
                      }}
                    >
                      {e?.valid_until
                        ? 'Valid until ' + format(new Date(e?.valid_until), 'LLL yyyy')
                        : 'Valid Lifetime'}
                    </Typography> */}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <Icon
                        icon={'ph:pencil-simple-line-light'}
                        fontSize={24}
                        style={{ marginRight: '10px', cursor: 'pointer' }}
                        onClick={() => handleModalFormCOP('edit', e)}
                      />
                      <Icon
                        icon={'material-symbols-light:delete-outline'}
                        fontSize={24}
                        style={{ marginRight: '10px', color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                          setModalDeleteOpenTwo(true)
                          setCopId(e?.id)
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

  return (
    <>
      <SeafarerProficiencyForm
        user_id={user?.id}
        key={seafarerProficiency ? seafarerProficiency['id'] : 0}
        seafarerProficiency={seafarerProficiency}
        type={modalFormTypeTwo}
        handleModalForm={handleModalFormCOP}
        loadProficiency={loadProficiency}
        showModal={modalFormOpenTwo}
      />
      <SeafarerCompetencyForm
        key={seafarerCompetency ? seafarerCompetency['id'] : 0}
        user_id={user?.id}
        seafarerCompetency={seafarerCompetency}
        type={modalFormType}
        handleModalForm={handleModalForm}
        loadCompetency={loadCompetency}
        showModal={modalFormOpen}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}
        >
          <BottomNavigationAction
            label='Certification of Competency'
            sx={{
              height: '40px',
              display: 'inline',
              padding: '10px',
              borderRadius: '6px',
              border: value == 0 ? '1.5px solid #0B58A6' : '1.5px solid #DADADA',
              background: value == 0 ? '#CBE2F9' : '#F8F8F7',
              fontSize: '14',
              fontWeight: 700,
              color: '#BFBFBF',
              maxWidth: 'max-content',
              '& .Mui-selected': {
                color: '#0B58A6'
              }
            }}
          />
          <BottomNavigationAction
            label='Certification of Proficiency'
            sx={{
              height: '40px',
              display: 'inline',
              padding: '10px',
              borderRadius: '6px',
              border: value == 1 ? '1.5px solid #0B58A6' : '1.5px solid #DADADA',
              background: value == 1 ? '#CBE2F9' : '#F8F8F7',
              fontSize: '14',
              fontWeight: 700,
              color: '#BFBFBF',
              maxWidth: 'max-content',
              '& .Mui-selected': {
                color: '#0B58A6'
              }
            }}
          />
        </BottomNavigation>
      </Box>

      {value == 0 ? renderCOC() : renderCOP()}
    </>
  )
}

export default CertificateTab
