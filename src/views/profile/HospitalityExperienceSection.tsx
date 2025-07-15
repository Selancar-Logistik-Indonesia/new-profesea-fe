import React, { useEffect, useState } from 'react'
import { IHospitalityExperienceData } from '../../contract/models/seafarer_experience'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { Button, Box, Typography, Divider } from '@mui/material'
import { Icon } from '@iconify/react'
import { format } from 'date-fns'

export interface IHospitalityExperienceSection {
  userId: number
  userName: string
}

const HospitalityExperienceSection: React.FC<IHospitalityExperienceSection> = ({ userId, userName }) => {
  const [data, setData] = useState<IHospitalityExperienceData[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(5) // Number of visible items initially
  const [showMoreClicked, setShowMoreClicked] = useState(false)

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const loadExperience = () => {
    HttpClient.get(AppConfig.baseUrl + `/public/data/user/work-experiences?page=1&take=50&user_id=${userId}`).then(
      response => {
        const result = response.data.experiences

        setData(result)
      }
    )
  }

  const handleShowMore = () => {
    setVisibleCount(data.length)
    setShowMoreClicked(true)
  }

  useEffect(() => {
    loadExperience()
  }, [userId])

  return (
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '6px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Experience
        </Typography>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 14, fontWeight: '400' }}>
          {userId === user?.id ? (
            <>
              You Have <span style={{ color: 'rgba(50, 73, 122, 1)' }}>{data.length} Experiences.</span>
            </>
          ) : (
            <>
              {userName} has <span style={{ color: 'rgba(50, 73, 122, 1)' }}>{data.length} Experiences.</span>
            </>
          )}
        </Typography>
        {data && data.length > 0
          ? data.slice(0, visibleCount).map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  borderBottom:
                    data.length - 1 == index
                      ? ''
                      : '1px solid var(--light-action-disabled-background, rgba(76, 78, 100, 0.12))'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    m: 2
                  }}
                >
                  <Box component={'img'} src={item?.logo} alt={item?.institution} sx={{maxWidth:'77px', Width:'77px',height:'77px', objectFit:'cover'}}/>
                    <Box
                      sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          sx={{ color: 'rgba(45, 52, 54, 1)', fontWeight: 700, fontSize: '16px', lineHeight: '20px' }}
                        >
                          {item?.position}
                        </Typography>
                        <Typography sx={{ color: '#868686', fontWeight: 300, fontSize: '14px', lineHeight: '21px' }}>
                          {item?.start_date && item?.end_date
                            ? format(new Date(item?.start_date), 'LLL yyyy') +
                              ' - ' +
                              format(new Date(item?.end_date), 'LLL yyyy')
                            : format(new Date(item?.start_date), 'LLL yyyy') + ' - ' + 'Now'}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          color: '#525252',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '21px',
                          textTransform: 'capitalize'
                        }}
                      >
                        {item?.work_place}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#999999',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '21px',
                          textTransform: 'capitalize'
                        }}
                      >
                        {item?.country.nicename}{' '}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#5E5E5E',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '21px'
                        }}
                      >
                        {item?.description}{' '}
                      </Typography>
                    </Box>
                </Box>
              </Box>
            ))
          : null}

        <Divider sx={{ mx: '24px' }} />
        {visibleCount < data.length && (
          <Button
            onClick={handleShowMore}
            endIcon={<Icon icon='mingcute:down-fill' style={{ fontSize: 12 }} />}
            sx={{
              width: '100%',
              py: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'none',
              color: 'rgba(50, 73, 122, 1)',
              fontSize: 14,
              fontWeight: '400',
              borderRadius: '0 !important',
              lineHeight: '21px'
            }}
          >
            Show More
          </Button>
        )}

        {visibleCount === data?.length && showMoreClicked && (
          <Button
            onClick={() => {
              setVisibleCount(5)
              setShowMoreClicked(false)
            }}
            endIcon={<Icon icon='mingcute:up-fill' style={{ fontSize: 12 }} />}
            sx={{
              width: '100%',
              py: '14px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'none',
              color: 'rgba(50, 73, 122, 1)',
              fontSize: 14,
              fontWeight: '400',
              borderRadius: '0 !important',
              lineHeight: '21px'
            }}
          >
            Show Less
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default HospitalityExperienceSection
