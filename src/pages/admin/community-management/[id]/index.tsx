import { useSearchParams } from "next/navigation"
import CommunityDetail from "src/views/community/CommunityDetail"



const CommunityDetailPage = () => {
    const params = useSearchParams()
    console.log(params.get('id'))

    return (
        <CommunityDetail communityId={params.get('id')} />
    )
}


CommunityDetailPage.acl = {
    action: 'read',
    subject: 'admin-community-management'
  }

export default CommunityDetailPage