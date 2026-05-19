import type { BasicProps } from '@/utils/globalType.ts'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { NonUktEntranceList, NonUktProdi } from '../data/types.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'

interface props extends BasicProps {
  id_fakultas: string
  id_prodi: string
  id_jenjang: string
  id_jalur_masuk: string
}

export const UseGetCostEducationNonUkt = (props: props) => {
  const {
    id_fakultas,
    id_prodi,
    id_jenjang,
    id_jalur_masuk,
    page = '1',
    limit = '10',
    search = '',
  } = props

  const [costEducation, setCostEducation] = useState<NonUktEntranceList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'cost_education_non_ukt',
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

      const res = await AxiosClient.get(
        `/website-utama/biaya-pendidikan-non-ukt?${params.toString()}`
      )
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

export const UseGetDetailCostNonUkt = (id: string) => {
  const [detailCost, setDetailCost] = useState<NonUktProdi>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail_cost_non_ukt', id],
    queryFn: () =>
      AxiosClient.get(`/website-utama/biaya-pendidikan-non-ukt/jalur-masuk/${id}`).then(
        (res) => res.data?.data
      ),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetailCost(data)
    }
  }, [data])

  return { detailCost, loading }
}

export const UseGetNonUKTBackground = () => {
  const [background, setBackground] = useState<IBGThumbnail[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-non-ukt'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/biaya-pendidikan-non-ukt-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}

