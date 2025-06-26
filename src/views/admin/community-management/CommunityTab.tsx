import { Grid, Pagination, Typography } from '@mui/material'
import CustomPaginationItem from 'src/@core/components/pagination/item'
import CardGroupCommunity from 'src/views/community/CardGroupCommunity'
import CardGroupSkeleton from 'src/views/community/CardGroupSkeleton'

interface ICommunityTab {
  communities: any
  handleDelete: (id: number) => void
  loading: boolean
  page: number
  setPage: (page: number) => void
  pageItems: number
  totalCommunities: number
}

const CommunityTab = ({ communities, handleDelete, loading, setPage, page, pageItems, totalCommunities }: ICommunityTab) => {
  if (loading) {
    return <Grid container spacing={6}>
            {Array.from({ length: 9 }).map((_, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CardGroupSkeleton />
              </Grid>
            ))}
    </Grid>
  }

  return (
    <Grid container spacing={6}>
      <Grid container item spacing={6} xs={12}>
        {communities.map((community: any) => {
          return (
            <Grid item xs={12} md={4} key={community.id}>
              <CardGroupCommunity
                is_private={community.is_private}
                key={community.id}
                id={community.id}
                name={community.name}
                description={community.description}
                banner_url={community.banner_url}
                discussions_count={community.total_feeds}
                members_count={community.total_members}
                owner={community.created_by}
                handleDelete={handleDelete}
              />
            </Grid>
          )
        })}
      </Grid>
      {/* pagination */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#949EA2', fontSize: 12, fontWeight: 400 }}>{`Showing ${
          page * pageItems < totalCommunities ? page * pageItems : totalCommunities
        } out of ${totalCommunities} results`}</Typography>
        <Pagination
          size='small'
          count={Math.ceil(totalCommunities / pageItems)}
          page={page}
          onChange={(_, newValue) => setPage(newValue)}
          variant='outlined'
          shape='rounded'
          renderItem={item => <CustomPaginationItem {...item} />}
          sx={{ mr: 110 }}
        />
      </Grid>
    </Grid>
  )
}

export default CommunityTab
