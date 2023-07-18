import { useContext } from 'react'
import SocialFeedContext from 'src/context/SocialFeedContext'

export const useSocialFeed = () => useContext(SocialFeedContext)
