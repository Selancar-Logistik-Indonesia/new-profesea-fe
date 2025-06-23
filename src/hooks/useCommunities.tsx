import { useContext } from 'react'
import CommunitiesContext from 'src/context/CommunitiesContext'

export const useCommunities = () => useContext(CommunitiesContext)
