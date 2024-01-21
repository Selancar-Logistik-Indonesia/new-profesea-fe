import { NavLink, NavGroup, LayoutProps } from 'src/@core/layouts/types'
import VerticalNavLink from './VerticalNavLink'
import NavItemType from 'src/contract/types/navItemType'

interface Props {
  parent?: NavGroup,
  navHover?: boolean,
  navVisible?: boolean,
  groupActive: string[],
  isSubToSub?: NavGroup,
  currentActiveGroup: string[],
  navigationBorderWidth: number,
  settings: LayoutProps['settings'],
  saveSettings: LayoutProps['saveSettings'],
  setGroupActive: (value: string[]) => void,
  setCurrentActiveGroup: (item: string[]) => void,
  homeNavItems: { title: string, path: string }[],
  navItems: NavItemType[],
}

const VerticalNavItems = (props: Props) => {
  const { homeNavItems, navItems } = props;
  const menus: { title: string, path: string }[] = [];

  homeNavItems.forEach((item) => {
    menus.push(item);
  });

  navItems.forEach((item) => {
    menus.push({
      title: item.title,
      path: item.onClick,
    });
  });

  const RenderMenuItems = menus.map((item, index) => {
    const menuItem: NavLink = {
      title: item.title,
      path: item.path,
    };

    return <VerticalNavLink settings={props.settings} navigationBorderWidth={1} key={index} item={menuItem} collapsedNavWidth={1} toggleNavVisibility={() => { return; }} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
