import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetLecturerFaculty = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const [lecturer, setLecturer] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lecturer-faculty', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/profil/dosen?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLecturer(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { lecturer, loading, meta }
}
