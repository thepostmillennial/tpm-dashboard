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
    title: 'Editors\' Picks',
    key: 'editorspicks',
    url: '/content/picks',
    icon: 'fe fe-edit',
    roles: ['admin', 'editor'],
  },
  {
    category: true,
    title: 'Members',
  },
  {
    title: 'Members',
    key: 'members',
    url: '/members',
    icon: 'fe fe-user',
    roles: ['superadmin', 'admin', 'editor'],
  },
  {
    title: 'Membership',
    key: 'membership',
    url: '/members/membership',
    icon: 'fe fe-user-check',
    roles: ['superadmin', 'admin', 'editor'],
  },
  {
    category: true,
    title: 'Contribution',
  },
  {
    title: 'Contributions',
    key: 'contributions',
    url: '/contributions',
    icon: 'fe fe-dollar-sign',
    roles: ['superadmin', 'admin', 'editor'],
  },
  {
    title: 'Reminders',
    key: 'reminders',
    url: '/contributions/reminders',
    icon: 'fe fe-dollar-sign',
    roles: ['superadmin', 'admin', 'editor'],
  },
  {
    category: true,
    title: 'Architectures',
  },
  {
    title: 'Cache System',
    key: 'cache-system',
    url: '/system/cache',
    icon: 'fe fe-hard-drive',
    roles: ['superadmin', 'admin', 'editor'],
  },
  {
    category: true,
    title: 'System',
  },
  {
    title: 'Users',
    key: 'system-users',
    url: '/system/users',
    icon: 'fe fe-users',
    roles: ['superadmin', 'admin', 'editor'],
  },
  {
    title: 'Danger Zone',
    key: 'danger-zone',
    icon: 'fe fe-alert-triangle',
    disabled: true,
  },
]
