import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDetailUniversity } from '@/pages/modules/website-utama/profile/data/types.ts'

export const UseGetDetailDataUnit = () => {
  const [dataUnit, setDataUnit] = useState<IDetailUniversity>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['data-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDataUnit(data)
    }
  }, [data])

  return { dataUnit, loading }
}
