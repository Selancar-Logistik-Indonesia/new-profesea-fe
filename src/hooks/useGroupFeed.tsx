import { useContext } from 'react'
 import SocialGroupContext from 'src/context/SocialGroupContext'

export const useGroupFeed = () => useContext(SocialGroupContext)
