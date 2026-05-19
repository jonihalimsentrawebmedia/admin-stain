import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { TariffTypeList } from '@/pages/modules/website-utama/cost-education/non-ukt/tariff-type/data/type.ts'

interface props extends BasicProps {
  id_jenjang: string
}

export const UseGetTariffType = (props: props) => {
  const { id_jenjang, search, page, limit } = props

  const [tariffType, setTariffType] = useState<TariffTypeList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (id_jenjang) params.append('id_jenjang', id_jenjang ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['tariff_type', params],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/jenis-tarif').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTariffType(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { tariffType, meta, loading }
}
