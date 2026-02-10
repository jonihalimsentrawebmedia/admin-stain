import { useEffect, useState } from 'react'
import type { IThemeUnit } from '../data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTemplateUnit = () => {
  const [templateUnit, setTemplateUnit] = useState<IThemeUnit[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/thema').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplateUnit(data)
    }
  }, [data])

  return { templateUnit, loading }
}
