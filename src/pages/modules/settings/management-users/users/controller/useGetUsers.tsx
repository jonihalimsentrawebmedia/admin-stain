import { useEffect, useState } from 'react'
import type { UserList } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'

const useGetUsers = () => {
  const [searchParams] = useSearchParams()
  const [meta, setMeta] = useState<Meta>()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const level = searchParams.get('level') || ''
  const [users, setUsers] = useState<UserList[]>([])

  const { data, isLoading, isFetching } = useQuery<{
    data: UserList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['users-list', { page, limit, search,level }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/manajemen-user/users?${searchParams.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUsers(data.data??[])
      setMeta(data.meta)
    }
  }, [data])

  return {
    users,
    loading,
    meta,
  }
}

export default useGetUsers
