import { useEffect, useState } from 'react'

import { useAuth } from '@/contexts/Context'
import type { Subscription, UserSubscriptionsResponse } from '../../types/subscription'
import { config } from '@/config/env'

export function useUserSubscriptions(userId: string) {
  const [data, setData] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)


  useEffect(() => {
    if (!userId) return

    setLoading(true)
    setError(null)

    fetch(`${config.apiUrl}/subscription/userSubscriptions/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar inscrições')
        return res.json()
      })
      .then((json: UserSubscriptionsResponse) => setData(json.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [userId])

  return { data, loading, error }
}