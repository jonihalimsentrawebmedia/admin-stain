import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface IHumanResource {
  nama: string
  id_sdm: string
  jabatan: string
}

export const UseGetHumanResource = () => {
  const [humanResource, setHumanResource] = useState<IHumanResource[]>([])

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['human-resource'],
    queryFn: () =>
      AxiosClient.get('/eoffice/ref/sdm?search=&page=0&limit=0').then((res) => res?.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setHumanResource(data)
    }
  }, [data])

  return { loading, humanResource }
}
