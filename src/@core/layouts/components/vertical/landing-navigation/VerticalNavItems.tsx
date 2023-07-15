// ** Type Imports
import { NavLink, NavGroup, LayoutProps, NavSectionTitle } from 'src/@core/layouts/types'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

interface Props {
  parent?: NavGroup
  navHover?: boolean
  navVisible?: boolean
  groupActive: string[]
  isSubToSub?: NavGroup
  currentActiveGroup: string[]
  navigationBorderWidth: number
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  setGroupActive: (value: string[]) => void
  setCurrentActiveGroup: (item: string[]) => void
  homeNavItems: { title: string, path: string }[],
}

const VerticalNavItems = (props: Props) => {
  const { homeNavItems } = props

  const RenderMenuItems = homeNavItems.map((item, index) => {
    const menuItem: NavLink = {
      title: item.title,
      path: item.path,
    };

    return <VerticalNavLink settings={props.settings} navigationBorderWidth={1} key={index} item={menuItem} collapsedNavWidth={1} toggleNavVisibility={() => { }} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
