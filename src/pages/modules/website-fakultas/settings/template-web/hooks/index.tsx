import { useEffect, useState } from 'react'
import type { IThemeUnit } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTemplateFaculty = () => {
  const [template, setTemplate] = useState<IThemeUnit[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/thema').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplate(data)
    }
  }, [data])

  return { template, loading }
}
