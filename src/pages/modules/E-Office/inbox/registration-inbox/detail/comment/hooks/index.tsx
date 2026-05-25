import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ICommentLetter } from '@/pages/modules/E-Office/inbox/registration-inbox/detail/comment/data/types.ts'

export const UseGetComment = (id_pejabat_inbox: string) => {
  const [comment, setComment] = useState<ICommentLetter[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['comment', id_pejabat_inbox],
    enabled: !!id_pejabat_inbox,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/komentar/${id_pejabat_inbox}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setComment(data)
    }
  }, [data])

  return { loading, comment }
}
