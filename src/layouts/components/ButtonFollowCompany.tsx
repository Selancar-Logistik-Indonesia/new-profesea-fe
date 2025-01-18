import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'

export default function ButtonFollowCompany(props: {
  user_id: number
  friend_id: number
  getConnections: () => void | undefined
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [checkFollowship, setCheckFollowship] = useState<any>(null)
  const { user } = useAuth()
  const { user_id, friend_id, getConnections } = props

  const followCompany = () => {
    setIsLoading(true)
    HttpClient.post(AppConfig.baseUrl + '/user/follow-company/', {
      user_id: friend_id,
      company_id: user_id
    })
      .then(() => {
        if (getConnections) {
          getConnections()
        }

        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const unfollowCompany = () => {
    setIsLoading(true)
    HttpClient.post(AppConfig.baseUrl + `/user/unfollow-company/`, {
      user_id: friend_id,
      company_id: user_id
    })
      .then(() => {
        if (getConnections) {
          getConnections()
        }
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
        console.log('err button follow company', err)
      })
  }

  const checkFollowShip = () => {
    setTimeout(() => {
      HttpClient.get(AppConfig.baseUrl + `/user/followship-user-company/?user_id=${friend_id}&company_id=${user_id}`)
        .then(res => {
          const { id, user_id, friend_id } = res.data.data

          setCheckFollowship({
            id: id,
            user_id: user_id,
            friend_id: friend_id
          })
        })
        .catch(err => {
          console.log('err button follow company', err)
        })
    }, 2000)
  }

  useEffect(() => {
    if (friend_id & user_id) {
      checkFollowShip()
    }
  }, [])

  if (checkFollowship && user?.id == friend_id) {
    return (
      <Button
        disabled={isLoading}
        variant='contained'
        size='small'
        sx={{ marginRight: 2, fontSize: 14, textTransform: 'none', fontWeight: 300, p: '8px 12px' }}
        onClick={() => {
          unfollowCompany()
        }}
      >
        {isLoading ? 'Unfollowing ...' : 'Following'}
      </Button>
    )
  }

  if (checkFollowship && user?.id == friend_id) {
    return (
      <Button
        disabled={isLoading}
        variant='contained'
        size='small'
        sx={{ marginRight: 2, fontSize: 14, textTransform: 'none', fontWeight: 300, p: '8px 12px' }}
        onClick={() => {
          followCompany()
        }}
      >
        {isLoading ? 'Following ...' : 'Follow'}
      </Button>
    )
  }

  return <></>
}
