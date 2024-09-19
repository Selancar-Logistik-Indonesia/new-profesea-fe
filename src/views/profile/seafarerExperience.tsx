import React, { useEffect, useState } from 'react'
import ISeafarerExperienceData from '../../contract/models/seafarer_experience'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'

export interface ISeafarerExperienceProps {
  userId: number
}

const SeafarerExperience: React.FC<ISeafarerExperienceProps> = ({ userId }) => {
  const [data, setData] = useState<ISeafarerExperienceData[]>([])

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

  useEffect(() => {
    loadExperience()
  }, [])

  return (
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '20px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Sea Experience
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
                    <Typography
                      sx={{ color: '#868686', fontWeight: 300, fontSize: '14px', lineHeight: '21px' }}
                    >
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
      </Box>
    </Box>
  )
}

export default SeafarerExperience
