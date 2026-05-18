import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IListCostEducation } from '@/pages/modules/website-utama/cost-education/data/types.ts'

interface props extends BasicProps {
  id_fakultas: string
  id_prodi: string
  id_jenjang: string
  id_jalur_masuk: string
}

export const UseGetCostEducation = (props: props) => {
  const {
    id_fakultas,
    id_prodi,
    id_jenjang,
    id_jalur_masuk,
    page = '1',
    limit = '10',
    search = '',
  } = props

  const [costEducation, setCostEducation] = useState<IListCostEducation[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'cost_education',
      {
        page,
        limit,
        search,
        id_fakultas,
        id_prodi,
        id_jenjang,
        id_jalur_masuk,
      },
    ],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.append('page', page)
      params.append('limit', limit)
      if (search) params.append('search', search)
      if (id_fakultas) params.append('id_fakultas', id_fakultas)
      if (id_prodi) params.append('id_prodi', id_prodi)
      if (id_jenjang) params.append('id_jenjang', id_jenjang)
      if (id_jalur_masuk) params.append('id_jalur_masuk', id_jalur_masuk)

      const res = await AxiosClient.get(`/website-utama/biaya-pendidikan-ukt?${params.toString()}`)
      return res.data
    },
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCostEducation(data.data || [])
      setMeta(data.meta)
    }
  }, [data])

  return { costEducation, meta, loading }
}

export const UseGetStatusPublish = () => {
  const [publish, setPublish] = useState<{
    tipe: 'NON_UKT' | 'UKT'
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status_publish'],
    queryFn: () =>
      AxiosClient.get(`/website-utama/biaya-pendidikan-ukt/tipe`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPublish(data)
    }
  }, [data])

  return { publish, loading }
}
