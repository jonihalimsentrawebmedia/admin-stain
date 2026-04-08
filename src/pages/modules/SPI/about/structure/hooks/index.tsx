import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetStructureOrganization = () => {
  const [structure, setStructure] = useState<{ isi: string }>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['structure-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStructure(data)
    }
  }, [data])

  return { structure, loading }
}
