import { ReactNode } from 'react'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Loading = () => {
  return <Spinner />
}

Loading.guestGuard = false
Loading.authGuard = false
Loading.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
export default Loading
