import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IListSlider } from '../data/index'

export const UseGetSliderDetailEditor = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IListSlider>({
    queryKey: ['detail-slider-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/slider-atas/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailSlider: data, loading }
}

export const UseGetLogTopSliderEditor = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['log-slider-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/slider-atas-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
