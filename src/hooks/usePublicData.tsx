import { useContext } from 'react'
import PublicDataContext from 'src/context/PublicDataContext'

export const usePublicData = () => useContext(PublicDataContext)
