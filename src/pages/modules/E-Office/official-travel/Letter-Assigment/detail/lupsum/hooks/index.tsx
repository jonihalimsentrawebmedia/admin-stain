import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDetailLupSum, ILupSumAssignment } from '../data/types'

interface props extends BasicProps {
  id: string
}

export const UseGetLumpSum = (props: props) => {
  const { search, limit, page, id } = props
  const [lupSum, setLupSum] = useState<ILupSumAssignment[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '10')
  if (page) Params.append('page', page ?? '1')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lump-sum', Params.toString()],
    queryFn: () =>
      AxiosClient(`/eoffice/mail-surat-tugas/${id}/lumpsum?${Params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  })
  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLupSum(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, lupSum }
}

export const UseGetLumpSumDetail = (id_employee: string) => {
  const [detail, setDetail] = useState<IDetailLupSum>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lump-sum-detail', id_employee],
    queryFn: () =>
      AxiosClient(`/eoffice/mail-surat-tugas-pegawai/${id_employee}/lumpsum`).then(
        (res) => res.data.data
      ),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
