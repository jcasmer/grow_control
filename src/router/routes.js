
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/default'),
    children: [
      { path: '/login', component: () => import('pages/Login') }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
