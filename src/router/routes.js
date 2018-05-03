
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
    component: () => import('layouts/Login/Login'),
    children: [
      { path: '/login', component: () => import('pages/Login/Login') }
    ]
  },
  {
    path: '/diagnostic',
    component: () => import('layouts/default'),
    children: [
      { path: '/diagnostic', component: () => import('pages/TypeDiagnostic/Diagnostic') },
      { path: '/diagnostic/:id', component: () => import('pages/TypeDiagnostic/EditDiagnostic') }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
