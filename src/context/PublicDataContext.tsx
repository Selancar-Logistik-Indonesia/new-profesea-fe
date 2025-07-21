import { createContext, ReactNode, useMemo, useState } from 'react'
import DialogLogin from 'src/@core/components/login-modal'
import { useAuth } from 'src/hooks/useAuth'

type Props = { children: ReactNode }

type PublicDataContextType = {
  openDialogLogin: boolean
  setOpenDialogLogin: (open: boolean) => void
  setCustomLoginCardHeader: (header: any) => void
  unauthenticatedUserAction: () => void
}

const defaultValue: PublicDataContextType = {
  openDialogLogin: false,
  setOpenDialogLogin: () => {},
  setCustomLoginCardHeader: () => {},
  unauthenticatedUserAction: () => {}
}

const PublicDataContext = createContext(defaultValue)

const PublicDataProvider = (props: Props) => {
  const { user } = useAuth()
  const [openDialogLogin, setOpenDialogLogin] = useState(false)
  const [customLoginCardHeader, setCustomLoginCardHeader] = useState<any>(null)

  const unauthenticatedUserAction = () => {
    setOpenDialogLogin(true)
  }

  const values = useMemo(
    () => ({
      openDialogLogin,
      setOpenDialogLogin,
      setCustomLoginCardHeader,
      unauthenticatedUserAction
    }),
    [openDialogLogin, setOpenDialogLogin, setCustomLoginCardHeader, unauthenticatedUserAction]
  )

  return (
    <PublicDataContext.Provider value={values}>
      {!user && openDialogLogin && (
        <DialogLogin
          customHeader={customLoginCardHeader}
          defaultShowInputs={false}
          isBanner={false}
          visible={openDialogLogin}
          onCloseClick={() => {
            setOpenDialogLogin(!openDialogLogin)
          }}
        />
      )}
      {props.children}
    </PublicDataContext.Provider>
  )
}

export { PublicDataProvider }

export default PublicDataContext
