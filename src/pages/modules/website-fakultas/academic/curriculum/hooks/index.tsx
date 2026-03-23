import { useEffect, useState } from 'react'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetCurriculumPerProdi = () => {
  const [curriculum, setCurriculum] = useState<ICurriculum[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['curriculum-per-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/kurikulum').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCurriculum(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { curriculum, loading, meta }
}
