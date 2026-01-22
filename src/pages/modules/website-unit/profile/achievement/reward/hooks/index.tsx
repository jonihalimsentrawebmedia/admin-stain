import { useEffect, useState } from 'react'
import type { IReward } from '@/pages/modules/website-unit/profile/achievement/reward/data/types.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetReward = (id: string) => {
  const [reward, setReward] = useState<IReward[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['reward', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit/profil/unit-kategori-penghargaan-penghargaan/${id}/penghargaan`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setReward(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { reward, loading, meta }
}
