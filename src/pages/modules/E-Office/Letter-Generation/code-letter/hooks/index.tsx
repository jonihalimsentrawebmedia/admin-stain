// eoffice/nomor-surat-otomatis

import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { INUmberLetterAutomatic } from '@/pages/modules/E-Office/Letter-Generation/code-letter/data/types.ts'

export const UseGetLetterNumberAutomatic = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const [letterNumber, setLetterNumber] = useState<INUmberLetterAutomatic[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['letter-number-automatic', Params.toString()],
    queryFn: () => AxiosClient(`/eoffice/nomor-surat-otomatis?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLetterNumber(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, letterNumber }
}

export const UseGetDetailLetterNumberAutomatic = (id: string) => {
  const [letterNumber, setLetterNumber] = useState<INUmberLetterAutomatic>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['letter-number-automatic-detail', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/eoffice/nomor-surat-otomatis/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLetterNumber(data)
    }
  }, [data])

  return { letterNumber, loading }
}
