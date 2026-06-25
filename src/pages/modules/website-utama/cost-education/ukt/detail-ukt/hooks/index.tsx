import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDataCostUktProdi } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/data/types.tsx'

export const UseGetUktByEntranceProdi = (id_prodi: string) => {
  const { data: listPriceUkt, isLoading, isFetching } = useQuery<IDataCostUktProdi>({
    queryKey: ['list_price_ukt', id_prodi],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/biaya-pendidikan-ukt/prodi/${id_prodi}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { listPriceUkt, loading }
}

interface props {
  id_prodi: string
  id_ukt_jalur_masuk: string
}

export const USeGetUktByProdiEntrance = (props: props) => {
  const { id_prodi, id_ukt_jalur_masuk } = props

  const { data: detail, isLoading, isFetching } = useQuery<IDataCostUktProdi>({
    queryKey: ['detail_ukt_prodi', id_prodi, id_ukt_jalur_masuk],
    refetchOnWindowFocus: false,
    enabled: !!id_prodi && !!id_ukt_jalur_masuk,
    queryFn: () =>
      AxiosClient.get(
        `website-utama/biaya-pendidikan-ukt/prodi/${id_prodi}/jalur-masuk/${id_ukt_jalur_masuk}`
      ).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail, loading }
}
