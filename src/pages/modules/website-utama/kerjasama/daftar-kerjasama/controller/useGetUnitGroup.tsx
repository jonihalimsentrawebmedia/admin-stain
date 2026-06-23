import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'

interface Props {
  kelompok?: string
}
const useGetGroupUnit = (props?: Props) => {
  const { kelompok } = props ?? {}

  const { data, isLoading, isFetching } = useQuery<{
    data: {
      id_satuan_organisasi: string
      nama_satuan_organisasi: string
    }[]
  }>({
    enabled: kelompok !== undefined && kelompok !== null,
    refetchOnWindowFocus: false,
    queryKey: ['groups-unit', kelompok],
    queryFn: () =>
      AxiosClient.get(`/website-utama/ref/unit-kelompok/${kelompok}`).then((res) => res.data),
  })
  const loading = isLoading || isFetching

  return {
    groupUnit: data?.data ?? [],
    loading,
  }
}

export default useGetGroupUnit
