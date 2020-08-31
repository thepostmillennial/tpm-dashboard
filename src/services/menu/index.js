export const getMenuData = [
  {
    category: true,
    title: 'Dashboards',
  },
  {
    title: 'Dashboards',
    key: 'dashboards',
    icon: 'fe fe-home',
    roles: ['superadmin', 'admin', 'editor'],
    count: 0,
    children: [
      {
        title: 'Dashboard Alpha',
        key: 'dashboard',
        url: '/dashboard/alpha',
      },
      {
        title: 'Dashboard Beta',
        key: 'dashboardBeta',
        url: '/dashboard/beta',
      },
      {
        title: 'Dashboard Gamma',
        key: 'dashboardGamma',
        url: '/dashboard/gamma',
      },
      {
        title: 'Crypto Terminal',
        key: 'dashboardCrypto',
        url: '/dashboard/crypto',
      },
    ],
  },
  {
    category: true,
    title: 'Content',
  },
  {
    title: 'Content',
    key: 'content',
    icon: 'fe fe-edit',
    roles: ['admin', 'editor'],
    children: [
      {
        title: 'Editors\' Picks',
        key: 'editorspicks',
        url: '/content/editorspicks',
      },
    ],
  },
  {
    category: true,
    title: 'Members',
  },
  {
    category: true,
    title: 'Membership',
  },
  {
    category: true,
    title: 'Architectures',
  },
  {
    category: true,
    title: 'System',
  },
  {
    title: 'System',
    key: 'system',
    icon: 'fe fe-settings',
    roles: ['superadmin', 'admin', 'editor'],
    children: [
      {
        title: 'Users',
        key: 'system-users',
        url: '/system/users',
      },
    ],
  },
  {
    title: 'Disabled Item',
    key: 'disabledItem',
    icon: 'fe fe-slash',
    disabled: true,
  },
]
