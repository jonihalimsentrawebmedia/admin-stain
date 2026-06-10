import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMailTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/data/types.ts'

export const UseGetTypeLetters = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}
  const [letterType, setLetterType] = useState<IMailTypeLetter[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['code-letter-type'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/mail-jenis-surat').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data?.meta)
      setLetterType(data?.data)
    }
  }, [data])

  return { loading, meta, letterType }
}
