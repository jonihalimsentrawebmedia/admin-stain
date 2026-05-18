import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDataCostUktProdi } from '@/pages/modules/website-utama/cost-education/detail-ukt/data/types.tsx'

export const UseGetUktByEntranceProdi = (id_prodi: string) => {
  const [listPriceUkt, setListPriceUkt] = useState<IDataCostUktProdi>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list_price_ukt'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/biaya-pendidikan-ukt/prodi/${id_prodi}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListPriceUkt(data)
    }
  }, [data])

  return { listPriceUkt, loading }
}
