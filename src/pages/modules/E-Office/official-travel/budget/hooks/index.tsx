import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBudgetOfficialTravel } from '@/pages/modules/E-Office/official-travel/budget/data/types.ts'

interface props extends BasicProps {
  tahun: string
}

export const UseGetBudgetOfficialTravel = (props: props) => {
  const { tahun, search, page, limit } = props

  const [budget, setBudget] = useState<IBudgetOfficialTravel[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (tahun) Params.append('tahun', tahun)
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['budget-official-travel', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/anggaran?${Params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBudget(data?.data ?? [])
      setMeta(data?.meta ?? [])
    }
  }, [data])

  return { meta, loading, budget }
}
