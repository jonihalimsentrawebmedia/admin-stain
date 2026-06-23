import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export interface IInstitution {
  id_satuan_organisasi: string
  kelompok: string
  nama: string
  singkatan: string | null
  logo: string | null
}

interface props extends BasicProps {
  kelompok?: string
  parent_id?: string
}

export const UseGetUnitInstitution = (props?: props) => {
  const { kelompok, parent_id, page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (kelompok) Params.append('kelompok', kelompok ?? '')
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (parent_id) Params.append('parent_id', parent_id ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IInstitution[] }>({
    queryKey: ['institution', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/eoffice/ref/satuan-organisasi-children?${Params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { loading, institution: data?.data ?? [] }
}

export const UseGetUnitActive = () => {
  const { data, isLoading, isFetching } = useQuery<{ data: IInstitution[] }>({
    queryKey: ['active'],
    queryFn: () => AxiosClient.get('/eoffice/ref/unit-filter-domain').then((res) => res.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { loading, institution: data?.data ?? [] }
}
