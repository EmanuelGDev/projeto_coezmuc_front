import { useEffect, useState } from 'react'

import { useAuth } from '@/contexts/Context'
import type { Subscription, UserSubscriptionsResponse } from '../../types/subscription'

export function useUserSubscriptions(userId: string) {
  const [data, setData] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!userId) return

    setLoading(true)
    setError(null)

    fetch(`http://127.0.0.1:3333/subscription/userSubscriptions/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.token}`
      }
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