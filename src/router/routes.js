
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
      { path: '/diagnostic', name: 'diagnostic', component: () => import('pages/TypeDiagnostic/Diagnostic') },
      { path: '/diagnostic/:id', component: () => import('pages/TypeDiagnostic/EditDiagnostic') }
    ]
  },
  {
    path: '/advice',
    component: () => import('layouts/default'),
    children: [
      { path: '/advice', name: 'advice', component: () => import('pages/Advices/Advice') },
      { path: '/advice/:id', component: () => import('pages/Advices/EditAdvice') }
    ]
  },
  {
    path: '/relationship',
    component: () => import('layouts/default'),
    children: [
      { path: '/relationship', name: 'relationship', component: () => import('pages/Relationships/Relationship') },
      { path: '/relationship/:id', component: () => import('pages/Relationships/EditRelationship') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/default'),
    children: [
      { path: '/user', name: 'user', component: () => import('pages/Users/User') },
      { path: '/user/:id', component: () => import('pages/Users/EditUser') }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
