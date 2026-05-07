import type { LevelUserList } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'

const useGetLevelUser = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [meta, setMeta] = useState<Meta>()
  const [levelUser, setLevelUser] = useState<LevelUserList[]>([])

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{
    data: LevelUserList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-level-users', Params.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/manajemen-user/level-users?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLevelUser(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return {
    levelUser,
    loading,
    meta,
  }
}

export default useGetLevelUser
