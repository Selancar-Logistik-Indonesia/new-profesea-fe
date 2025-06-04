import { useRouter } from 'next/router'

const Account = () => {
  const router = useRouter()
  router.push('/account/my-account')
}

Account.acl = {
  action: 'read',
  subject: 'home'
}

export default Account
