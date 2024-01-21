import { useContext } from 'react'
import SocialAlumniContext from 'src/context/SocialAlumniContext' 

export const useAlumniFeed = () => useContext(SocialAlumniContext)
