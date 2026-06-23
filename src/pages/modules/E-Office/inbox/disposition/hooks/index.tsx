import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IDisposition,
  IDispositionInbox,
} from '@/pages/modules/E-Office/inbox/disposition/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

interface props extends BasicProps {
  id_unit: string
}

export const UseGetDisposition = (props?: props) => {
  const { id_unit, page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (id_unit) Params.append('id_unit', id_unit ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IDisposition[]; meta: Meta }>({
    queryKey: ['disposition', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/disposisi?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, disposition: data?.data ?? [], meta: data?.meta }
}

export const UseGetDispositionDetail = (id_pejabatInbox: string) => {
  const { data, isLoading, isFetching } = useQuery<IDispositionInbox>({
    queryKey: ['disposition-detail', id_pejabatInbox],
    enabled: !!id_pejabatInbox,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/surat-masuk/disposisi/${id_pejabatInbox}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, dispositionDetail: data }
}

export const UseGetCountDisposition = () => {
  const { data, isLoading, isFetching } = useQuery<{
    belum_dibaca: number
    belum_direspon: number
    sudah_direspon: number
  }>({
    queryKey: ['count-disposition'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/surat-masuk/count').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, count: data }
}

export interface IChartNature {
  id_sifat_surat: string
  nama_sifat: string
  total: number
  created_at?: string
  updated_at?: string
}

export const UseGetDispositionByNature = () => {
  const { data, isLoading, isFetching } = useQuery<IChartNature[]>({
    queryKey: ['nature-disposition'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/surat-masuk/statistik/sifat').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { loading, nature: data ?? [] }
}
