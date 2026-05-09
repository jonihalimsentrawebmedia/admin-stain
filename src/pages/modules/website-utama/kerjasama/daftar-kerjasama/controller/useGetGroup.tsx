import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Props {
  id_universitas?: string
}
const useGetGroup = (props?: Props) => {
  const { id_universitas } = props ?? {}
  const params = new URLSearchParams()
  const [groups, setGroups] = useState<string[]>([])
  if (id_universitas) params.set(`id_universitas`, id_universitas)

  const { data, isLoading, isFetching } = useQuery<{
    data: string[]
  }>({
    refetchOnWindowFocus: false,
    enabled: id_universitas !== undefined && id_universitas !== null,
    queryKey: ['groups', params.toString()],
    queryFn: () =>
      AxiosClient.get(`/website-utama/ref/kelompok?${params.toString()}`).then((res) => res.data),
  })
  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGroups(data.data ?? [])
    }
  }, [data])

  return {
    groups,
    loading,
  }
}

export default useGetGroup
