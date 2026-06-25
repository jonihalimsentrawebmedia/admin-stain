import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IEmployee,
  ISDMNavigation,
} from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

interface props extends BasicProps {
  id_unit_kerja?: string
  id_status?: string
  filter?: string
}

export const UseGetEmployee = (props?: props) => {
  const { page, limit, search, id_unit_kerja, id_status, filter } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (id_unit_kerja) Params.append('id_unit_kerja', id_unit_kerja ?? '')
  if (id_status) Params.append('id_status', id_status ?? '')
  if (filter) Params.append('filter', props?.filter ?? '')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IEmployee[]>>({
    queryKey: ['employee', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/sdm?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, employee: data?.data ?? [] }
}

export const UseGetEmployeeById = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: IEmployee; step: ISDMNavigation }>({
    queryKey: ['employee-by-id', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/website-utama/sdm/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { employee: data?.data, loading, nextPrevId: data?.step }
}

export const UseGetReFUnit = () => {
  const { data, isLoading, isFetching } = useQuery<
    { id_satuan_organisasi: string; nama_satuan_organisasi: string }[]
  >({
    queryKey: ['work-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/ref/unit').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { workUnit: data ?? [], loading }
}
