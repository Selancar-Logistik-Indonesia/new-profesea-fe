import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

type TabItem = {
  label: string
  value: string
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
  onSelect: (element: HTMLDivElement) => void
}

const Tab = (props: TabProps) => {
  const { tabs, setTabs, label, value, onSelect } = props
  const isActive = tabs === value
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive && ref.current) {
      onSelect(ref.current)
    }
  }, [isActive])

  return (
    <Box
      ref={ref}
      onClick={() => setTabs(value)}
      sx={{
        cursor: 'pointer',
        flex: 1,
        py: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{
          color: isActive ? '#32497A' : '#BFBFBF',
          fontSize: 16,
          fontWeight: '700',
          userSelect: 'none',
          '&:hover': { color: '#32497A' }
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}

const CustomTabs = (props: Props) => {
  const { tabItems, tabs, setTabs } = props
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0
  })

  const handleTabSelect = (element: HTMLDivElement) => {
    const { offsetLeft, offsetWidth } = element
    setIndicatorStyle({
      left: offsetLeft,
      width: offsetWidth
    })
  }

  return (
    <Grid
      container
      sx={{
        borderBottom: 1.5,
        borderColor: '#E7E7E7',
        flexWrap: 'nowrap',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          height: '3px',
          bgcolor: '#32497A',
          transition: 'all 0.3s ease-in-out',
          left: indicatorStyle.left,
          width: indicatorStyle.width
        }}
      />
      {tabItems.map((tabItem, i) => (
        <Tab
          key={i}
          tabs={tabs}
          setTabs={setTabs}
          label={tabItem.label}
          value={tabItem.value}
          onSelect={handleTabSelect}
        />
      ))}
    </Grid>
  )
}

export default CustomTabs
