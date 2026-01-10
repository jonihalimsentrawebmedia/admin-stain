import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/data/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetRegistrationProdi = () => {
  const [registrationProdi, setRegistrationProdi] = useState<IRegistrationPath[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['registration-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/jalur-pendaftaran').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setRegistrationProdi(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { registrationProdi, loading, meta }
}
