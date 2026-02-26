import { useEffect, useState } from 'react'
import type { IProfileSecretary } from '@/pages/modules/LPPM/about/leader/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetSecretary = () => {
  const [detailSecretary, setDetailSecretary] = useState<IProfileSecretary>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-secretary'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient('/lppm/sekretaris').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) setDetailSecretary(data)
  }, [data])

  return { detailSecretary, loading }
}
