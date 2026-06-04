import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICopyLetter } from '@/pages/modules/E-Office/inbox/copy-letter/data/types.ts'
import type { IDispositionInbox } from '@/pages/modules/E-Office/inbox/disposition/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetCopyLetter = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}
  const [copyLetter, setCopyLetter] = useState<ICopyLetter[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['copy-letter', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/tembusan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCopyLetter(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, copyLetter, meta }
}

export const UseGetCopyLetterDetail = (id: string) => {
  const [copyLetterDetail, setCopyLetterDetail] = useState<IDispositionInbox>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['copy-letter-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/tembusan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCopyLetterDetail(data)
    }
  }, [data])

  return { loading, copyLetterDetail }
}
