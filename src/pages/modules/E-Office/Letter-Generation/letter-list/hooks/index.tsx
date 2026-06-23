// eoffice/mail-surat-undangan

import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMailInvitationLetterList } from '@/pages/modules/E-Office/Letter-Generation/letter-list/data/types.ts'
import type { IMailInvitationLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/data/types.ts'

interface Props extends BasicProps {
  status: 'MENUNGGU' | 'DIPROSES' | 'SELESAI' | 'DIBATALKAN' | 'DIHAPUS'
}

export const UseGetListLetterGenerate = (props: Props) => {
  const { status, page, limit, search } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (status) params.append('status', status ?? '')

  const { data: queryData, isLoading, isFetching } = useQuery<{ data: IMailInvitationLetterList[]; meta: Meta }>({
    queryKey: ['letter-generate', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-undangan?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching
  return { letterTypeGenerate: queryData?.data ?? [], meta: queryData?.meta, loading }
}

export const UseGetDetailLetterGenerate = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IMailInvitationLetter>({
    queryKey: ['letter-generate-detail', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-undangan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching
  return { letter: data, loading }
}
