import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/types.ts'

export const UseGetBankAccount = () => {
  const [bankAccount, setBankAccount] = useState<IBankAccount[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['bank-account'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusilkom/rekening').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setBankAccount(data?.data)
    }
  }, [data])

  return { loading, meta, bankAccount }
}
