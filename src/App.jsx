import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { AppProvider } from '@/context/app-context'
import { Toaster } from '@/components/ui/toaster'
import { Spinner } from '@/components/ui/spinner'

// Lazy load pages
const HomePage = lazy(() => import('@/pages/page'))
const LoginPage = lazy(() => import('@/pages/login/page'))
const SignupPage = lazy(() => import('@/pages/signup/page'))
const ProfilePage = lazy(() => import('@/pages/profile/page'))
const SearchPage = lazy(() => import('@/pages/search/page'))

// Dashboard
const DashboardLayoutWrapper = lazy(() => import('@/pages/dashboard/layout'))
const DashboardAdmin = lazy(() => import('@/pages/dashboard/admin/page'))
const DashboardAdminAnalytics = lazy(() => import('@/pages/dashboard/admin/analytics/page'))
const DashboardAdminCategories = lazy(() => import('@/pages/dashboard/admin/categories/page'))
const DashboardAdminUsers = lazy(() => import('@/pages/dashboard/admin/users/page'))
const DashboardEmployer = lazy(() => import('@/pages/dashboard/employer/page'))
const DashboardEmployerCompany = lazy(() => import('@/pages/dashboard/employer/company/page'))
const DashboardEmployerSaved = lazy(() => import('@/pages/dashboard/employer/saved/page'))
const DashboardJobseeker = lazy(() => import('@/pages/dashboard/jobseeker/page'))

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Spinner className="h-10 w-10" />
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AppProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayoutWrapper />}>
                 {/* Redirect /dashboard to a default role or handle 404/selection. 
                     For now, let's just let the sub-routes handle it. 
                     Maybe a default index is needed? 
                     I'll verify if there is a main dashboard page later. 
                 */}
                <Route path="admin" element={<DashboardAdmin />} />
                <Route path="admin/analytics" element={<DashboardAdminAnalytics />} />
                <Route path="admin/categories" element={<DashboardAdminCategories />} />
                <Route path="admin/users" element={<DashboardAdminUsers />} />
                
                <Route path="employer" element={<DashboardEmployer />} />
                <Route path="employer/company" element={<DashboardEmployerCompany />} />
                <Route path="employer/saved" element={<DashboardEmployerSaved />} />

                <Route path="jobseeker" element={<DashboardJobseeker />} />
              </Route>

              {/* Catch all - 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Toaster />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
