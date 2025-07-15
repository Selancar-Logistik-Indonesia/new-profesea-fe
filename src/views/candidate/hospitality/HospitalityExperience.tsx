import { Button, Checkbox, CircularProgress, FormControlLabel, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { AppConfig } from 'src/configs/api'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { refreshsession } from 'src/utils/helpers'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { differenceInMonths, differenceInYears, format, parseISO } from 'date-fns'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'
import { useProfileCompletion } from 'src/hooks/useProfileCompletion'
import DialogAddExperience from './DialogAddExperience'
import DialogEditExperience from './DialogEditExperience'

interface IHospitalityExperienceTabProps {
  dataUser: IUser
}

export function calculateYearsAndMonths(startDate: any, endDate: any) {
  const start = parseISO(startDate)
  const end = parseISO(endDate)

  const years = differenceInYears(end, start)
  const months = differenceInMonths(end, start) % 12

  return `${years} yrs ${months} months`
}

const HospitalityExperienceTab: React.FC<IHospitalityExperienceTabProps> = ({ dataUser }) => {
  const { refetch, setRefetch } = useProfileCompletion()
  const [noExperience, setNoExperience] = useState(dataUser?.no_experience)
  const [userWorkExperience, setUserWorkExperience] = useState<any[]>([])
  const [loadingWorkExperience, setLoadingWorkExperience] = useState(true)
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [openAddModalWE, setOpenAddModalWE] = useState(false)
  const [hookSignature, setHookSignature] = useState(v4())
  const [openEditModalWE, setOpenEditModalWE] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>()

  const loadExperience = () => {
    setLoadingWorkExperience(true)
    HttpClient.get(AppConfig.baseUrl + '/user/experience?page=1&take=100').then(response => {
      const itemData = response.data.experiences
      console.log(itemData)
      setUserWorkExperience(itemData)
      setLoadingWorkExperience(false)
    })
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoExperience(event.target.checked)

    const json = {
      country_id: dataUser?.country_id,
      employee_type: dataUser?.employee_type,
      name: dataUser?.name,
      phone: dataUser?.phone,
      date_of_birth: dataUser?.date_of_birth,
      website: dataUser?.website,
      about: dataUser?.about,
      address_country_id: dataUser?.address?.country_id,
      address_city_id: dataUser?.address?.city_id,
      address_address: dataUser?.address?.address,
      gender: dataUser?.gender,
      no_experience: event.target.checked
      // team_id:props.datauser.team_id
    }

    await HttpClient.patch(AppConfig.baseUrl + '/user/update-profile', json)
    refreshsession()
  }

  const deletewe = async (id: any) => {
    const resp = await HttpClient.del(`/user/experience/` + id)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    loadExperience()
    setRefetch(!refetch)
    toast.success(`  deleted successfully!`)
  }

  const editWorkExperience = (item: any) => {
    setSelectedItem(item)
    setOpenEditModalWE(!openEditModalWE)
  }

  useEffect(() => {
    loadExperience()
  }, [hookSignature])

  if (loadingWorkExperience) {
    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </>
    )
  }

  return (
    <>
      <DialogAddExperience
        visible={openAddModalWE}
        getUserExperience={loadExperience}
        onStateChange={() => setHookSignature(v4())}
        onCloseClick={() => setOpenAddModalWE(!openAddModalWE)}
      />

      <DialogEditExperience
        key={selectedItem?.id}
        selectedItem={selectedItem}
        visible={openEditModalWE}
        onCloseClick={() => setOpenEditModalWE(!openEditModalWE)}
        onStateChange={() => setHookSignature(v4())}
      />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        {userWorkExperience.length == 0 && (
          <Box>
            <FormControlLabel
              control={<Checkbox checked={noExperience} onChange={handleChange} />}
              label='I have no experience'
            />
          </Box>
        )}
      </Box>

      {userWorkExperience.length == 0 ? (
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
              <Image src={'/images/mask-group.png'} alt={'mdl2'} width={'64'} height={'65'} />
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
                  onClick={() => setOpenAddModalWE(true)}
                >
                  <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                  Add experience
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      ) : loadingWorkExperience ? (
        <div>loading...</div>
      ) : (
        <div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
              gap: isMobile ? '40px' : 0,
              marginTop: '20px'
            }}
          >
            <Box>
              <Typography fontSize={16} fontWeight={700} color={'#32497A'}>
                Work Experience
              </Typography>
              <Typography fontSize={14} fontWeight={400} color={'#404040'}>
                Add your work experience to strengthen your profile
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
                variant='outlined'
                onClick={() => setOpenAddModalWE(true)}
              >
                <Icon icon={'mdi-light:plus'} fontSize={16} style={{ marginRight: '10px' }} />
                Add
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {userWorkExperience?.map((e, index) => (
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  {/* upper section */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Typography fontSize={16} fontWeight={700} color={'#404040'}>
                      {e?.role_type.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'end', alignSelf: 'flex-end' }}>
                      <Icon
                        icon={'ph:pencil-simple-line-light'}
                        fontSize={24}
                        style={{ marginRight: '10px', cursor: 'pointer' }}
                        onClick={() => editWorkExperience(e)}
                      />
                      <Icon
                        icon={'material-symbols-light:delete-outline'}
                        fontSize={24}
                        style={{ marginRight: '10px', color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                          deletewe(e?.id)
                        }}
                      />
                    </Box>
                  </Box>
                  {/* main section */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                    <Box
                      component={'img'}
                      src={e?.logo}
                      alt={e?.institution}
                      sx={{ maxWidth: '77px', Width: '77px', height: '77px', objectFit: 'cover' }}
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100%'}}>
                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                      >
                        <Typography fontSize={16} fontWeight={700} color={'#1F1F1F'}>
                          {e?.position ? e?.position : '-'}
                        </Typography>
                        <Typography sx={{ color: '#868686', fontWeight: 300, fontSize: '14px', lineHeight: '21px' }}>
                          {e?.start_date && e?.end_date
                            ? format(new Date(e?.start_date), 'LLL yyyy') +
                              ' - ' +
                              format(new Date(e?.end_date), 'LLL yyyy')
                            : format(new Date(e?.start_date), 'LLL yyyy') + ' - ' + 'Now'}{' '}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: '#525252',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '21px',
                          textTransform: 'lowercase',
                          '&::first-letter': {
                            textTransform: 'uppercase'
                          }
                        }}
                      >
                        {e?.institution}
                      </Typography>

                      <Typography
                        sx={{
                          color: '#999999',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '21px',
                          textTransform: 'lowercase',
                          '&::first-letter': {
                            textTransform: 'uppercase'
                          }
                        }}
                      >
                        {e?.country.name}
                      </Typography>
                      

                      <Typography sx={{ color: '#868686', fontWeight: 300, fontSize: '14px', lineHeight: '21px' }}>
                        {e?.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}
                ></Box>
              </Box>
            ))}
          </Box>
        </div>
      )}
    </>
  )
}

export default HospitalityExperienceTab
