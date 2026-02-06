import { useEffect, useState } from 'react'
import type { IThemeProdi } from '@/pages/modules/website-prodi/settings/template-website/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetTemplateProdi = () => {
  const [templateProdi, setTemplateProdi] = useState<IThemeProdi[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['template-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/thema').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTemplateProdi(data)
    }
  }, [data])

  return { templateProdi, loading }
}
