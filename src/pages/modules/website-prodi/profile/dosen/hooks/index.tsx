import { useEffect, useState } from 'react'
import type { Dosen } from '@/pages/modules/website-utama/program-studi/detail/model/dosen.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetLecturer = () => {
  const [lecturer, setLecturer] = useState<Dosen[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lecturer-profile'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil/dosen').then((res) => res.data),
  })

  useEffect(() => {
    if (data) {
      setLecturer(data.data)
      setMeta(data.meta)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { lecturer, loading, meta }
}
