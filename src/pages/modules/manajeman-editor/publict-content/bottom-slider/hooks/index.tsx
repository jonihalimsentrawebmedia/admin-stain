import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IListBottomSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data'

export const UseGetSliderButtonDetailEditor = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IListBottomSlider>({
    queryKey: ['bottom-slider-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/slider-bawah/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detailSlider: data, loading }
}

export const UseGetLogBottomSliderEditor = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<any[]>({
    queryKey: ['bottom-slider-log-editor', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/editor/slider-bawah-log/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { logData: data ?? [], loading }
}
