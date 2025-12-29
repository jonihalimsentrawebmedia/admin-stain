import { useEffect, useState } from 'react'
import type { IIdentityCampus } from '@/pages/modules/website-utama/Identity/types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'

export const UseGetIdentity = () => {
  const [identityCampus, setIdentityCampus] = useState<IIdentityCampus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['identity-campus'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/identitas').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setIdentityCampus(data)
    }
  }, [data])

  return { identityCampus, loading }
}

export const UseGetIdentityBackground = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-identity'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/identitas-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}
