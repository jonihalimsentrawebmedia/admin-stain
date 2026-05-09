import AxiosClient from '@/provider/axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface Props {
  kelompok?: string
}
const useGetGroupUnit = (props?: Props) => {
  const { kelompok } = props ?? {}
  const [groupUnit, setGroupUnit] = useState<
    {
      id_satuan_organisasi: string
      nama_satuan_organisasi: string
    }[]
  >([])

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

  useEffect(() => {
    if (data) {
      setGroupUnit(data.data ?? [])
    }
  }, [data])

  return {
    groupUnit,
    loading,
  }
}

export default useGetGroupUnit
