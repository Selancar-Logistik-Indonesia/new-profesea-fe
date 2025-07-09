import { useRef, useState } from 'react'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { LayoutProps } from 'src/@core/layouts/types'
import themeConfig from 'src/configs/themeConfig'
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'
import themeOptions from 'src/@core/theme/ThemeOptions'
import NavItemType from 'src/contract/types/navItemType'
import { IUser } from 'src/contract/models/user'
import { Button, Divider } from '@mui/material'
import { display } from '@mui/system'
import { usePathname, useRouter } from 'next/navigation'
import LanguageDropdown from '../../shared-components/LanguageDropdown'

interface Props {
  navWidth: number | string
  navVisible: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  setNavVisible: (value: boolean) => void
  saveSettings: LayoutProps['saveSettings']
  homeNavItems: { title: string; path: string }[]
  navItems: NavItemType[]
  navMenuBranding: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  navMenuProps: LayoutProps['verticalLayoutProps']['navMenu']['componentProps']
  menuUnlockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
  afterNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['afterContent']
  beforeNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['beforeContent']
  user: IUser | null
}

const Navigation = (props: Props) => {
  const path = usePathname()
  const router = useRouter()
  const { hidden, settings, beforeNavMenuContent, saveSettings } = props
  const [navHover, setNavHover] = useState<boolean>(false)
  const [groupActive, setGroupActive] = useState<string[]>([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([])
  const shadowRef = useRef(null)
  const { beforeVerticalNavMenuContentPosition } = themeConfig
  let darkTheme = createTheme(themeOptions(settings, 'dark'))

  if (themeConfig.responsiveFontSizes) {
    darkTheme = responsiveFontSizes(darkTheme)
  }

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect

      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  // ** Scroll Menu
  const scrollMenu = (container: any) => {
    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      container = hidden ? container.target : container
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains('scrolled')) {
          // @ts-ignore
          shadowRef.current.classList.add('scrolled')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('scrolled')
      }
    }
  }

  const handleOnClickRegister = () => {
    const targetPath = path === '/employer/' || path === '/employer/pricing/' ? '/register/employer' : '/register'
    router.push(targetPath)
  }

  const ScrollWrapper = hidden ? Box : PerfectScrollbar

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer {...props} navHover={navHover} setNavHover={setNavHover}>
        <VerticalNavHeader {...props} navHover={navHover} />
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* @ts-ignore */}
          <ScrollWrapper
            {...(hidden
              ? {
                  onScroll: (container: any) => scrollMenu(container),
                  sx: {
                    height: '90vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }
                }
              : {
                  options: { wheelPropagation: false },
                  onScrollY: (container: any) => scrollMenu(container),
                  containerRef: (ref: any) => handleInfiniteScroll(ref)
                })}
          >
            <List className='nav-items' sx={{ pt: 0, '& > :first-of-type': { mt: '0' } }}>
              <VerticalNavItems
                navHover={navHover}
                groupActive={groupActive}
                setGroupActive={setGroupActive}
                currentActiveGroup={currentActiveGroup}
                setCurrentActiveGroup={setCurrentActiveGroup}
                {...props}
              />
              <Box sx={{ mt: '12px !important', px: '28px' }}>
                <Divider />
                <Box sx={{ display: 'flex', mt: '24px' }}>
                  <LanguageDropdown settings={settings} saveSettings={saveSettings} />
                </Box>
              </Box>
            </List>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', px: '24px' }}>
              <Button
                size='medium'
                variant='contained'
                sx={{ textTransform: 'capitalize' }}
                onClick={handleOnClickRegister}
              >
                Register
              </Button>
              <Button
                size='medium'
                variant='outlined'
                sx={{ textTransform: 'capitalize' }}
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            </Box>
          </ScrollWrapper>
        </Box>
      </Drawer>
    </ThemeProvider>
  )
}

export default Navigation
