import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetDescriptionAuditManagement = () => {
  const [description, setDescription] = useState<{ isi: string }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['description-audit-management'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/tinjauan-manajemen').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDescription(data)
    }
  }, [data])

  return { description, loading }
}
