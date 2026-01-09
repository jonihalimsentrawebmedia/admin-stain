import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDetailUniversity } from '@/pages/modules/website-utama/profile/data/types.ts'

export const UseGetDetailDataProdi = () => {
  const [dataProdi, setDataProdi] = useState<IDetailUniversity>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['data-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDataProdi(data)
    }
  }, [data])

  return { dataProdi, loading }
}
