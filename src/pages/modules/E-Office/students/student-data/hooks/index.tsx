import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStudentData } from '../data/types.ts'

export const UseGetStudentData = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}
  const [studentData, setStudentData] = useState<IStudentData[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['student-data', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/mahasiswa?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStudentData(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, studentData }
}

export const UseGetDetailStudentData = (id: string) => {
  const [studentData, setStudentData] = useState<IStudentData>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['student-data-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/mahasiswa/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStudentData(data)
    }
  }, [data])

  return { studentData, loading }
}
