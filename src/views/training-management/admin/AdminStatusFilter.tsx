import { Badge, Box, Grid, Typography } from '@mui/material'

type TabItem = {
  label: string
  value: string
  count?: number
}

type Props = {
  tabItems: TabItem[]
  tabs: string
  setTabs: (value: string) => void
}

type TabProps = {
  tabs: string
  setTabs: (value: string) => void
  label: string
  value: string
  count: number
  notify?: boolean
}

const Tab = (props: TabProps) => {
  const { tabs, setTabs, label, value, count, notify } = props
  const isActive = tabs === value

  return (
    <Badge
      color='error'
      variant='dot'
      invisible={!notify || count === 0}
      sx={{
        '& .MuiBadge-badge': {
          top: '4px',
          right: '4px',
          boxShadow: '0 0 0 2px #FFFFFF'
        }
      }}
    >
      <Box
        onClick={() => setTabs(value)}
        sx={{
          cursor: 'pointer',
          p: '8px 12px',
          borderRadius: '12px',
          border: `1px solid ${isActive ? '#32497A' : '#E7E7E7'}`,
          backgroundColor: isActive ? '#F2F8FE' : 'inherit',
          '&:hover': { borderColor: '#32497A' }
        }}
      >
        <Typography
          sx={{
            color: isActive ? '#32497A' : '#404040',
            fontSize: 14,
            fontWeight: '400',
            userSelect: 'none',
            '&:hover': { color: '#32497A' }
          }}
        >
          {label} ({count})
        </Typography>
      </Box>
    </Badge>
  )
}

const AdminStatusFilter = (props: Props) => {
  const { tabItems, tabs, setTabs } = props

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        px: '24px',
        pt: '16px',
        gap: '10px',
        alignItems: 'center'
      }}
    >
      <Typography sx={{ color: '#404040', fontSize: 16, fontWeight: 700 }}>Status</Typography>
      {tabItems.map((tabItem, i) => (
        <Tab
          key={i}
          tabs={tabs}
          setTabs={setTabs}
          label={tabItem.label}
          value={tabItem.value}
          count={tabItem.count ?? 0}
          notify={tabItem.value === 'unregistered' || tabItem.value === 'paid'}
        />
      ))}
    </Grid>
  )
}

export default AdminStatusFilter
