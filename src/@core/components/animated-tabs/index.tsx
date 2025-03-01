import { Box, Tab, Tabs } from '@mui/material'

interface TabOption {
  value: string
  label: string
}

interface AnimatedTabsProps {
  tabs: TabOption[]
  activeTab: any
  setActiveTab: (value: any) => void
}

const AnimatedTabs = (props: AnimatedTabsProps) => {
  const { tabs, activeTab, setActiveTab } = props
  const handleChange = (value: any) => {
    setActiveTab(value)
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Tabs
        variant='fullWidth'
        value={activeTab}
        onChange={(_, newValue) => handleChange(newValue)}
        sx={{
          backgroundColor: '#F8F8F7',
          borderRadius: '6px',
          '& .MuiTabs-indicator': {
            display: 'none'
          }
        }}
      >
        {tabs.map((tab, i) => (
          <Tab
            key={i}
            value={tab.value}
            disableRipple
            sx={{ width: '100%', zIndex: 2, textTransform: 'none', fontSize: 16, fontWeight: 700 }}
            label={tab.label}
          />
        ))}
      </Tabs>
      <Box
        sx={{
          position: 'absolute',
          top: '4px',
          left: `calc(4px + ${Math.max(
            tabs.findIndex(tab => tab.value === activeTab),
            0
          )} * ${100 / tabs.length}%)`,
          width: `calc(${100 / tabs.length}% - 8px)`,
          height: 'calc(100% - 8px)',
          backgroundColor: '#F2F8FE',
          borderRadius: '6px',
          transition: 'left 0.5s ease-in-out',
          boxShadow: '1px 1px 8px rgba(0,0,0, 0.1)',
          zIndex: 0
        }}
      />
    </Box>
  )
}

export default AnimatedTabs
