import {
  CircleIcon,
  WindmillIcon,
  TypographyIcon,
  ShadowIcon,
  PaletteIcon,
  KeyIcon,
  BugIcon,
  DashboardIcon,
  BrandChromeIcon,
  HelpIcon
} from 'vue-tabler-icons';

const sidebarItem = [
  { header: 'Dashboard' },
  {
    title: 'Default',
    icon: DashboardIcon,
    to: '/dashboard'
  },
  { divider: true },
  { header: 'Pages' },
  {
    title: '狗宝儿',
    icon: KeyIcon,
    to: '/auth',
    children: [
      {
        title: '狗宝儿01',
        icon: CircleIcon,
        to: '/auth/login'
      },
      {
        title: '狗宝儿02',
        icon: CircleIcon,
        to: '/auth/register'
      }
    ]
  },
  {
    title: '汪汪汪',
    icon: BugIcon,
    to: '/wangwangwang'
  },
  {
    title: '狗宝儿',
    icon: BugIcon,
    to: '/gbe'
  }
];

export default sidebarItem;
