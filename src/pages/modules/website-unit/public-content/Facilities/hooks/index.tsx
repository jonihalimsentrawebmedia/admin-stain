import type { IPropsData } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import type { INewsStatus } from '@/pages/modules/website-utama/public-content/news/hooks'
import type { IUnitFacilities } from '@/pages/modules/website-unit/public-content/Facilities/data/types.tsx'
interface ILogFacilities {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const UseGetFacilitiesUnit = (props: IPropsData) => {
  const { page, limit, status_publish, search } = props

  const ParamsSearch = new URLSearchParams({ page: page ?? '1', limit: limit ?? '10' })
  if (status_publish) ParamsSearch.append('status-publish', status_publish)
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IUnitFacilities[]; meta: Meta }>({
    queryKey: ['facilities-unit', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/unit-fasilitas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { facilitiesUnit: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetFacilitiesUnitDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IUnitFacilities>({
    queryKey: ['facilities-unit-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/unit-fasilitas/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { facilitiesUnitDetail: data, loading }
}

export const UseGetFacilitiesUnitStatus = () => {
  const { data, isLoading, isFetching } = useQuery<INewsStatus>({
    queryKey: ['facilities-unit-status'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/unit-fasilitas/status').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { status: data, loading }
}

export const UseGetLogFacilitiesUnit = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ILogFacilities[]>({
    queryKey: ['log-unit-facilities', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit/unit-fasilitas-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
