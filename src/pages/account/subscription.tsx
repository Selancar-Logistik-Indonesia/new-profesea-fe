import CandidatePlanComparison from 'src/@core/components/subscription/CandidatePlanComparison'
import AccountLayout from 'src/@core/layouts/AccountLayout'

const AccountSubscription = () => {
  return (
    <AccountLayout page='Subscription'>
      <CandidatePlanComparison />
    </AccountLayout>
  )
}

AccountSubscription.acl = {
  action: 'read',
  subject: 'home'
}

export default AccountSubscription
