import type { IFacilitiesDetail } from '../data/index'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetFacilitiesDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IFacilitiesDetail>({
    queryKey: ['detail-facilities-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/fasilitas/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailFacilities: data, loading }
}

export const UseGetLogFacilities = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-facilities-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/fasilitas-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
