import React, { useEffect, useState } from 'react'

import ISeafarerCompetencyData from '../../contract/models/seafarer_competency'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { Box, Button, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { Icon } from '@iconify/react'

interface ICocSectionProps {
  userId: number
  userName: string
}

const CocSection: React.FC<ICocSectionProps> = ({ userId, userName }) => {
  const [data, setData] = useState<ISeafarerCompetencyData[]>([])
  const [visibleCount, setVisibleCount] = useState<number>(3) // Number of visible items initially
  const [showMoreClicked, setShowMoreClicked] = useState(false)

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const isDataHidden = userId == user?.id || user?.team_id === 3 ? false : true

  const loadCompetency = () => {
    HttpClient.get(AppConfig.baseUrl + '/seafarer-competencies/user-id/' + userId).then(response => {
      const result = response.data.data.map((item: ISeafarerCompetencyData) => {
        return {
          ...item
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
    loadCompetency()
  }, [userId])

  return (
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Certificate of Competency
        </Typography>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 14, fontWeight: '400' }}>
          {userId === user?.id ? (
            <>
              You Have <span style={{ color: 'rgba(50, 73, 122, 1)' }}>{data.length} Certificates.</span>
            </>
          ) : (
            <>
              {userName} has <span style={{ color: 'rgba(50, 73, 122, 1)' }}>{data.length} Certificates.</span>
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
                    flexDirection: 'column',
                    gap: 3,
                    flexWrap: 'wrap',
                    m: 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                      sx={{
                        color: 'rgba(45, 52, 54, 1)',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '20px',
                        flex: '70%'
                      }}
                    >
                      {item?.competency.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#868686',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '21px',
                        flex: '30%',
                        textAlign: 'end'
                      }}
                    >
                      {item?.valid_until
                        ? 'Valid until ' + format(new Date(item?.valid_until), 'LLL yyyy')
                        : 'Valid Lifetime'}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ color: 'rgba(45, 52, 54, 1)', fontWeight: 700, fontSize: '14px', lineHeight: '21px' }}
                  >
                    Certificate No.{' '}
                    <span style={{ fontWeight: 400 }}>
                      {isDataHidden ? '***** ***** *****' : item?.certificate_number}
                    </span>
                  </Typography>
                  {!isDataHidden && item?.filename && (
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
                        color: 'rgba(50, 73, 122, 1) !important'
                      }}
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_BASE_API}/public/data/competency/preview/${item?.id}`,
                          '_blank'
                        )
                      }
                    >
                      Show Credential
                    </Button>
                  )}
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
              setVisibleCount(3)
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

export default CocSection
