import { useEffect, useState } from 'react'
import type { Subscription, UserSubscriptionsResponse } from 'types/subscription'
import axios from 'axios'


export function useUserSubscriptions(userId: string) {
  const [data, setData] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) return

    setLoading(true)
    setError(null)

    axios
      .get<UserSubscriptionsResponse>(
        `http://127.0.0.1:3333/subscription/userSubscriptions/${userId}`
      )
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [userId])

  return { data, loading, error }
}
