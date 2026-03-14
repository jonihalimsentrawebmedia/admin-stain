import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProcedureText } from './types.tsx'

export const UseGetProcedureJobseeker = () => {
  const [procedure, setProcedure] = useState<IProcedureText>()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['procedure-job-seeker'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/pusat-karir/prosedur-pendaftaran-pencari-kerja').then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProcedure(data)
    }
  }, [data])

  return { procedure, loading }
}
