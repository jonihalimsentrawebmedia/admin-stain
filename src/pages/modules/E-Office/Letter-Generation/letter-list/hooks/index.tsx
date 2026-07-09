// eoffice/mail-surat-undangan

import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMailInvitationLetterList } from '@/pages/modules/E-Office/Letter-Generation/letter-list/data/types.ts'
import type { IMailInvitationLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/data/types.ts'

interface Props extends BasicProps {
  status: 'MENUNGGU' | 'DIPROSES' | 'SELESAI' | 'DIBATALKAN' | 'DIHAPUS'
  id_template: string
}

export const UseGetListLetterGenerate = (props: Props) => {
  const { status, page, limit, search, id_template } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (status) params.append('status', status ?? '')
  if (id_template) params.append('id_jenis_template_surat', id_template ?? '')

  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useQuery<{ data: IMailInvitationLetterList[]; meta: Meta }>({
    queryKey: ['letter-generate', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/mail-surat?${params}`).then((res) => res.data),
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

interface countProps extends BasicProps {
  status?: string
  id_jenis_template_surat?: string
}

export interface ILetterStatusCount {
  DIBATALKAN: number
  DIHAPUS: number
  DIPROSES: number
  MENUNGGU: number
  SELESAI: number
}

export const UseGetCountLetter = (props?: countProps) => {
  const { status, id_jenis_template_surat, page, limit, search } = props ?? {}

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (status) params.append('status', status ?? '')
  if (id_jenis_template_surat)
    params.append('id_jenis_template_surat', id_jenis_template_surat ?? '')

  const { data, isLoading, isFetching } = useQuery<ILetterStatusCount>({
    queryKey: ['letter-generate-count', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat/status-count?${params}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching
  return { count: data, loading }
}
