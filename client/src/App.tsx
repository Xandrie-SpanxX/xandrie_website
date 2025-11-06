import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Route, Switch } from 'wouter'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './contexts/ThemeContext'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PerformerDashboard from './pages/PerformerDashboard'
import ClientDashboard from './pages/ClientDashboard'
import LoginPage from './pages/LoginPage'
import DocumentLibrary from './pages/DocumentLibrary'

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'performer' | 'client' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setIsAuthenticated(true)
          setUserType(data.userType)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/documents" component={DocumentLibrary} />

      {/* Protected Routes */}
      {isAuthenticated && userType === 'performer' && (
        <Route path="/performer/dashboard" component={PerformerDashboard} />
      )}
      {isAuthenticated && userType === 'client' && (
        <Route path="/client/dashboard" component={ClientDashboard} />
      )}

      {/* 404 Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

