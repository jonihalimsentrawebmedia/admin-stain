import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ListLetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types.ts'

interface props extends BasicProps {
  tahun: string
  bulan: string
}

export const UseGetLetterAssigment = (props: props) => {
  const { search, page, limit, tahun, bulan } = props

  const [letterAssignment, setLetterAssignment] = useState<ListLetterAssignment[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (tahun) Params.append('tahun', tahun ?? '')
  if (bulan) Params.append('bulan', bulan ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['letter-assignment', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/mail-surat-tugas?${Params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLetterAssignment(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, letterAssignment }
}
