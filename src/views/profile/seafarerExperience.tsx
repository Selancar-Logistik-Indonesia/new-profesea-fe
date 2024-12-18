import React, { useEffect, useState } from 'react'
import ISeafarerExperienceData from '../../contract/models/seafarer_experience'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { Button, Box, Typography, Divider } from '@mui/material'
import { format } from 'date-fns'
import { Icon } from '@iconify/react'

export interface ISeafarerExperienceProps {
  userId: number
  userName: string
}

const SeafarerExperience: React.FC<ISeafarerExperienceProps> = ({ userId, userName }) => {
  const [data, setData] = useState<ISeafarerExperienceData[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(5) // Number of visible items initially
  const [showMoreClicked, setShowMoreClicked] = useState(false)

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const loadExperience = () => {
    HttpClient.get(AppConfig.baseUrl + '/seafarer-experiences/user-id/' + userId).then(response => {
      const result = response.data.data.map((item: ISeafarerExperienceData) => {
        return {
          ...item,
          sign_in: new Date(item.sign_in),
          sign_off: new Date(item.sign_off),
          rank: item.rank,
          vessel_type: item.vessel_type
        }
      })

      setData(result)
    })
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
        <Typography sx={{ mb: '20px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Sea Experience
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
          ? data.map((item, index) => (
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
                    flexDirection: 'column',
                    gap: 2,
                    flexWrap: 'wrap',
                    m: 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                      sx={{ color: 'rgba(45, 52, 54, 1)', fontWeight: 700, fontSize: '16px', lineHeight: '20px' }}
                    >
                      {item?.rank?.name}
                    </Typography>
                    <Typography sx={{ color: '#868686', fontWeight: 300, fontSize: '14px', lineHeight: '21px' }}>
                      {item?.sign_in && item?.sign_off
                        ? format(new Date(item?.sign_in), 'LLL yyyy') +
                          ' - ' +
                          format(new Date(item?.sign_off), 'LLL yyyy')
                        : '-'}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: 'rgba(45, 52, 54, 1)',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: '21px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {item?.company}
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
                    {item?.vessel_name} - {item?.vessel_type.name}{' '}
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
                    <b>GRT</b> {item?.grt ? item?.grt : '-'} / <b>DWT</b> {item?.dwt ? item?.dwt : '-'}
                  </Typography>
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

export default SeafarerExperience
