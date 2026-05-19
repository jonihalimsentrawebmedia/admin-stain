import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDataCostUktProdi } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/data/types.tsx'

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

interface props {
  id_prodi: string
  id_ukt_jalur_masuk: string
}

export const USeGetUktByProdiEntrance = (props: props) => {
  const { id_prodi, id_ukt_jalur_masuk } = props
  const [detail, setDetail] = useState<IDataCostUktProdi>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail_ukt_prodi'],
    refetchOnWindowFocus: false,
    enabled: !!id_prodi && !!id_ukt_jalur_masuk,
    queryFn: () =>
      AxiosClient.get(
        `website-utama/biaya-pendidikan-ukt/prodi/${id_prodi}/jalur-masuk/${id_ukt_jalur_masuk}`
      ).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
