import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Dikti {
  id: string
  nama: string
  id_jenis_unit: number
}

const useGetListDikti = (id: string) => {
  const [dikti, setDikti] = useState<Dikti[]>([])

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryKey: ['satuan-organisasi-list-dikti', id],
    queryFn: () => AxiosClient.get(`/pengaturan/dikti/unit-kerja/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDikti(data.data ?? [])
    }
  }, [data])

  return {
    dikti,
    loading,
  }
}

export default useGetListDikti
