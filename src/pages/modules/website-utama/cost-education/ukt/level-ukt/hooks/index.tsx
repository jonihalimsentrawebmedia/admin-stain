import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ILevelUkt } from '@/pages/modules/website-utama/cost-education/ukt/level-ukt/data/types.ts'

interface props extends BasicProps {
  id_jenjang: string
}

export const UseGetLevelUkt = (props: props) => {
  const { search, limit, page, id_jenjang } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (id_jenjang) params.append('id_jenjang_pendidikan', id_jenjang ?? '')

  const { data, isLoading, isFetching } = useQuery<{
    data: ILevelUkt[]
    meta: Meta
  }>({
    queryKey: ['level_ukt', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tingkatan-ukt?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { levelUkt: data?.data ?? [], meta: data?.meta, loading }
}
