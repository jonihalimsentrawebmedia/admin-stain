import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICopyLetter } from '@/pages/modules/E-Office/inbox/copy-letter/data/types.ts'
import type { IDispositionInbox } from '@/pages/modules/E-Office/inbox/disposition/data/types.ts'

export const UseGetCopyLetter = () => {
  const [copyLetter, setCopyLetter] = useState<ICopyLetter[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['copy-letter'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/surat-masuk/tembusan').then((res) => res.data),
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
