export interface HealthStatusData {
  status: string
  message?: string
  [key: string]: any
}

// Cache the promise to avoid creating a new one on every render
let healthPromise: Promise<HealthStatusData> | null = null

export function useHealthStatus(): Promise<HealthStatusData> {
  if (!healthPromise) {
    healthPromise = fetchHealthStatus()
  }
  return healthPromise
}

async function fetchHealthStatus(): Promise<HealthStatusData> {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || ''
    const response = await fetch(`${baseUrl}/api/health`)
    if (!response.ok) return { status: 'error' }
    const data = await response.json()
    return data
  } catch (error: any) {
    return { status: 'error', message: error?.message || 'Failed to fetch health status' }
  }
}

