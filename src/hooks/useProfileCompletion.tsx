import { useContext } from 'react'
import ProfileCompletionContext from 'src/context/ProfileCompletionContext'

export const useProfileCompletion = () => useContext(ProfileCompletionContext)
