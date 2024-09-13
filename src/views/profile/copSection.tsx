import React, { useEffect, useState } from 'react'

import ISeafarerProficiencyData from '../../contract/models/seafarer_proficiency'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'

interface ICopSectionProps {
  userId: number
}

const CopSection: React.FC<ICopSectionProps> = ({ userId }) => {
  const [data, setData] = useState<ISeafarerProficiencyData[]>([])

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const isDataHidden = userId == user?.id || user?.team_id === 3 ? false : true

  const loadProficiency = () => {
    HttpClient.get(AppConfig.baseUrl + '/seafarer-proficiencies/user-id/' + userId).then(response => {
      const result = response.data.data.map((item: ISeafarerProficiencyData) => {
        return {
          ...item,
          certificate_number: item.certificate_number,
          proficiency: item.proficiency,
          country: item.country
        }
      })

      setData(result)
    })
  }

  useEffect(() => {
    loadProficiency()
  }, [])

  return (
    <Box sx={{ borderRadius: '16px', backgroundColor: '#FFFFFF', boxShadow: 3, overflow: 'hidden' }}>
      <Box sx={{ p: '24px' }}>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
          Certificate of Proficiency
        </Typography>
        <Typography sx={{ mb: '10px', color: 'black', fontSize: 14, fontWeight: '400' }}>
          You Have <span style={{ color: 'rgba(50, 73, 122, 1)' }}>{data.length} Certificates</span>
        </Typography>
        {data && data.length > 0
          ? data.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  borderBottom: '1px solid var(--light-action-disabled-background, rgba(76, 78, 100, 0.12))'
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
                      {item?.proficiency.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(82, 82, 82, 1)',
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
                </Box>
              </Box>
            ))
          : null}
      </Box>
    </Box>
  )
}

export default CopSection
