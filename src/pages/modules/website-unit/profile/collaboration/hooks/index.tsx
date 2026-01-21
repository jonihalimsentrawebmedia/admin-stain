import { useEffect, useState } from 'react'
import type { CalloborationList } from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/model'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetUnitCollaboration = () => {
  const [unitCollaboration, setUnitCollaboration] = useState<CalloborationList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-collaboration'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil/kerjasama').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitCollaboration(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { unitCollaboration, loading, meta }
}
