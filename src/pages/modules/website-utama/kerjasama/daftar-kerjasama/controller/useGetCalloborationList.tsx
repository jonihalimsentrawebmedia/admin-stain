import { useSearchParams } from 'react-router-dom'
import type { CalloborationList } from '../model'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetCalloborationList = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const id_jenis_kerjasama = searchParams.get('id_jenis_kerjasama') || ''
  const id_kategori_kerjasama = searchParams.get('id_kategori_kerjasama') || ''
  const id_bidang_kerjasama = searchParams.get('id_bidang_kerjasama') || ''
  const id_sub_kategori_kerjasama = searchParams.get('id_sub_kategori_kerjasama') || ''

  let ParamsSearch: URLSearchParams

  ParamsSearch = new URLSearchParams({
    page,
    limit,
    search,
    id_jenis_kerjasama,
    id_kategori_kerjasama,
    id_bidang_kerjasama,
    id_sub_kategori_kerjasama,
  })

  const [calloborationList, setCaloborationList] = useState<CalloborationList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: CalloborationList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-calloboration', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/website-utama/kerjasama?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setCaloborationList(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    calloborationList,
    loading,
    meta,
  }
}

export default useGetCalloborationList
