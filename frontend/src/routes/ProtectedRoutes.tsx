import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface LayoutProps {
    children: ReactNode
}

const ProtectedRoutes = ({children}: LayoutProps) => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return <Navigate to='/signin'></Navigate>
  }

  return children ? <>{children}</> : ''
}

export default ProtectedRoutes