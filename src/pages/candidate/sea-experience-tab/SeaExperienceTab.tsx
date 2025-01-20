import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FadeProps,
  FormControlLabel,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Box } from '@mui/system'
import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { AppConfig } from 'src/configs/api'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { refreshsession } from 'src/utils/helpers'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import ISeafarerExperienceData from '../../../contract/models/seafarer_experience'
import ISeafarerRecommendationData from '../../../contract/models/seafarer_recommendation'
import { Icon } from '@iconify/react'
import SeafarerExperienceForm from '../SeafarerExperience/SeafarerExperienceForm'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import SeafarerRecommendationForm from '../SeafarerRecommendation/SeafarerRecommendationForm'
import { useProfileCompletion } from 'src/hooks/useProfileCompletion'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface ISeaExperienceTabProps {
  defaultValue?: number
}

const SeaExperienceTab: React.FC<ISeaExperienceTabProps> = ({ defaultValue = 0 }) => {
  const { refetch, setRefetch } = useProfileCompletion()
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [value, setValue] = useState(defaultValue)
  const [noExperience, setNoExperience] = useState(user?.no_experience)
  const [userSeaExprerience, setUserSeaExperience] = useState<ISeafarerExperienceData[]>([])
  const [seafarerExperience, setSeafarerExperience] = useState()
  const [modalFormType, setModalFormType] = useState('create')
  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [seaExperienceId, setSeaExperienceId] = useState<any>(null)
  const [onLoadingDelete, setOnLoadingDelete] = useState(false)

  // reference verification == recommendation
  const [userSeafarerRecommendations, setUserSeafarerRecommendations] = useState<ISeafarerRecommendationData[]>([])
  const [seafarerRecommendation, setSeafarerRecommendation] = useState()
  const [loadingTwo, setLoadingTwo] = useState(false)
  const [modalFormTypeTwo, setModalFormTypeTwo] = useState('create')
  const [modalFormOpenTwo, setModalFormOpenTwo] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [onLoadingDeleteTwo, setOnLoadingDeleteTwo] = useState(false)
  const [recommId, setRecommId] = useState<any>(null)

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoExperience(event.target.checked)

    const json = {
      country_id: user?.country_id,
      employee_type: user?.employee_type,
      name: user?.name,
      phone: user?.phone,
      date_of_birth: user?.date_of_birth,
      website: user?.website,
      about: user?.about,
      address_country_id: user?.address?.country_id,
      address_city_id: user?.address?.city_id,
      address_address: user?.address?.address,
      gender: user?.gender,
      no_experience: event.target.checked
      // team_id:props.datauser.team_id
    }

    await HttpClient.patch(AppConfig.baseUrl + '/user/update-profile', json)
    refreshsession()
  }

  const loadExperience = () => {
    setLoading(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-experiences/user-id/' + user?.id).then(response => {
      const result = response.data.data.map((item: ISeafarerExperienceData) => {
        return {
          ...item,
          sign_in: new Date(item.sign_in),
          sign_off: new Date(item.sign_off)
        }
      })

      setUserSeaExperience(result)
      setLoading(false)
    })
  }

  const loadRecommendation = () => {
    setLoadingTwo(true)
    HttpClient.get(AppConfig.baseUrl + '/seafarer-recommendations/user-id/' + user?.id).then(response => {
      const result = response.data.data.map((item: ISeafarerRecommendationData) => {
        return {
          ...item
        }
      })

      setUserSeafarerRecommendations(result)
      setLoadingTwo(false)
    })
  }

  const handleModalForm = (type: string, data: any = undefined) => {
    setSeafarerExperience(type == 'edit' ? data : {})
    setModalFormOpen(modalFormOpen ? false : true)
    setModalFormType(type)
  }

  const handleModalFormRecommendation = (type: string, data: any = undefined) => {
    setModalFormTypeTwo(type)
    if (type == 'edit') {
      setSeafarerRecommendation(data)
    } else {
      setSeafarerRecommendation(undefined)
    }

    setModalFormOpenTwo(modalFormOpenTwo ? false : true)
  }

  const handleDeleteSeaExperience = async (id: any) => {
    setOnLoadingDelete(true)
    try {
      await HttpClient.del(AppConfig.baseUrl + '/seafarer-experiences/' + id)

      toast.success('delete travel document success')
      loadExperience()
      setRefetch(!refetch)
    } catch (err) {
      toast.error(JSON.stringify(err), { icon: 'danger' })
    } finally {
      setOnLoadingDelete(false)
      setSeaExperienceId(null)
      setOpenModalDelete(false)
    }
  }

  const deleteRecommendation = async (id?: number) => {
    setOnLoadingDeleteTwo(true)
    try {
      await HttpClient.del(AppConfig.baseUrl + '/seafarer-recommendations/' + id)

      toast.success('delete reference verification success')
      loadRecommendation()
      setRefetch(!refetch)
    } catch (err) {
      toast.error(JSON.stringify(err), { icon: 'danger' })
    } finally {
      setOnLoadingDeleteTwo(false)
      setRecommId(null)
      setModalDeleteOpen(false)
    }
  }

  useEffect(() => {
    loadExperience()
    loadRecommendation()
  }, [])

  const renderSeaExperience = () => {
    return (
      <>
        <Dialog open={openModalDelete} maxWidth='sm' TransitionComponent={Transition}>
          <DialogContent sx={{ padding: '0px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  Delete Sea Experience
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
              <Typography>Are you sure you want to delete your Sea Experience?</Typography>
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
                onClick={() => handleDeleteSeaExperience(seaExperienceId)}
                sx={{ background: 'red', textTransform: 'capitalize', flex: 1 }}
              >
                {onLoadingDelete ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Delete'}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        {userSeaExprerience.length == 0 ? (
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
                <Image src={'/images/kapal-icon.png'} alt={'mdl2'} width={'64'} height={'65'} />
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#404040', textAlign: 'center' }}>
                  No sea experience yet
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#404040', textAlign: 'center' }}>
                  Share your career journey to highlight your expertise
                </Typography>
              </Box>
              {!noExperience && (
                <Box>
                  <Button
                    sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                    variant='outlined'
                    onClick={() => handleModalForm('create')}
                  >
                    <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                    Add sea experience
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        ) : loading ? (
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
                  Sea Experience
                </Typography>
                <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                  Add your sea experience to strengthen your profile
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
              {userSeaExprerience?.map((e, index) => (
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
                      {e?.rank?.name}
                    </Typography>
                    <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                      {e?.company ? e?.company : '-'}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(45, 52, 54, 1)',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '21px',
                        textTransform: 'capitalize'
                      }}
                    >
                      {e?.vessel_name} - {e?.vessel_type.name}{' '}
                      <span
                        style={{
                          height: '5px',
                          width: '5px',
                          backgroundColor: 'black',
                          borderRadius: '50%',
                          display: 'inline-block',
                          marginLeft: '5px',
                          marginRight: '5px',
                          marginBottom: '3px'
                        }}
                      />
                      <b>GRT</b> {e?.grt ? e?.grt : '-'} / <b>DWT</b> {e?.dwt ? e?.dwt : '-'}
                    </Typography>
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
                          setSeaExperienceId(e?.id)
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#868686', fontWeight: 300, fontSize: '14px', lineHeight: '21px' }}>
                        {e?.sign_in && e?.sign_off
                          ? format(new Date(e?.sign_in), 'LLL yyyy') + ' - ' + format(new Date(e?.sign_off), 'LLL yyyy')
                          : '-'}
                      </Typography>
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

  const renderReferenceVerification = () => {
    return (
      <>
        <Dialog open={modalDeleteOpen} maxWidth='sm' TransitionComponent={Transition}>
          <DialogContent sx={{ padding: '0px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  Delete Reference Verification
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
              <Typography>Are you sure you want to delete your Reference Verification?</Typography>
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
                onClick={() => deleteRecommendation(recommId)}
                sx={{ background: 'red', textTransform: 'capitalize', flex: 1 }}
              >
                {onLoadingDeleteTwo ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Delete'}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        {userSeafarerRecommendations.length == 0 ? (
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
                <Image src={'/images/kapal-icon.png'} alt={'mdl2'} width={'64'} height={'65'} />
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#404040', textAlign: 'center' }}>
                  No reference verification yet
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#404040', textAlign: 'center' }}>
                  Verify your references to boost profile credibility
                </Typography>
              </Box>
              {!noExperience && (
                <Box>
                  <Button
                    sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                    variant='outlined'
                    onClick={() => handleModalFormRecommendation('create')}
                  >
                    <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                    Add reference verification
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        ) : loadingTwo ? (
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
                  Reference Verification
                </Typography>
                <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                  Verify your references to boost profile credibility
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                  variant='outlined'
                  onClick={() => handleModalFormRecommendation('create')}
                >
                  <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                  Add
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {userSeafarerRecommendations?.map((e, index) => (
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
                      {e?.company}
                    </Typography>
                    <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                      {e?.position ? e?.position : '-'}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '24px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <Icon icon={'clarity:email-line'} fontSize={16} />
                        <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                          {e?.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <Icon icon={'solar:phone-outline'} fontSize={16} />
                        <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                          {e?.phone_number}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <Icon
                        icon={'ph:pencil-simple-line-light'}
                        fontSize={24}
                        style={{ marginRight: '10px', cursor: 'pointer' }}
                        onClick={() => handleModalFormRecommendation('edit', e)}
                      />
                      <Icon
                        icon={'material-symbols-light:delete-outline'}
                        fontSize={24}
                        style={{ marginRight: '10px', color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                          setModalDeleteOpen(true)
                          setRecommId(e?.id)
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
      <SeafarerExperienceForm
        key={seafarerExperience ? seafarerExperience['id'] : 0}
        seafarerExperience={seafarerExperience}
        type={modalFormType}
        handleModalForm={handleModalForm}
        loadExperience={loadExperience}
        showModal={modalFormOpen}
        user_id={user?.id}
      />

      <SeafarerRecommendationForm
        user_id={user?.id}
        key={seafarerRecommendation ? seafarerRecommendation['id'] : 0}
        seafarerRecommendation={seafarerRecommendation}
        type={modalFormTypeTwo}
        handleModalForm={handleModalFormRecommendation}
        loadRecommendation={loadRecommendation}
        showModal={modalFormOpenTwo}
      />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: !noExperience ? 'space-between' : 'flex-end',
          alignItems: 'center'
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
          sx={{ display: !noExperience ? 'flex' : 'none', flexDirection: 'row', gap: '16px' }}
        >
          <BottomNavigationAction
            label='Sea Experience'
            sx={{
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
            label='Reference Verification'
            sx={{
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

        {userSeaExprerience.length == 0 && (
          <Box>
            <FormControlLabel
              control={<Checkbox checked={noExperience} onChange={handleChange} />}
              label='I have no experience'
            />
          </Box>
        )}
      </Box>

      {value == 0 ? renderSeaExperience() : renderReferenceVerification()}
    </>
  )
}

export default SeaExperienceTab
