import type { IUnitFacilities } from '../data/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetFacilitiesUnitDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IUnitFacilities>({
    queryKey: ['detail-facilities-unit-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/unit-fasilitas/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailFacilities: data, loading }
}

export const UseGetLogFacilities = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-facilities-unit-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/unit-fasilitas-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
