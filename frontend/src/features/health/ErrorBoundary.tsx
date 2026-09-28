import { ReactNode } from 'react'
import { StatusDot } from '../../components/ui/StatusDot'

interface ErrorBoundaryProps {
  children?: ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  let error: { message?: string } | null = null
  try {
    return <>{children}</>
  } catch (e: any) {
    error = e
  }

  return (
    <div className="flex items-center">
      <StatusDot status="error" />
      <span className="text-red-600">Error: {error?.message || 'Something went wrong'}</span>
    </div>
  )
}

