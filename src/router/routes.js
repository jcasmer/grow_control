
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
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
