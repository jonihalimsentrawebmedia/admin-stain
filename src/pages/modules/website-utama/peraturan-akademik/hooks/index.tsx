import { useEffect, useState } from 'react'
import type { IAcademicRules } from '@/pages/modules/website-utama/peraturan-akademik/types'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetDetailAcademicRules = () => {
  const [academicRules, setAcademicRules] = useState<IAcademicRules>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['academic-rules'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/pengaturan-akademik').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcademicRules(data)
    }
  }, [data])

  return { academicRules, loading }
}
