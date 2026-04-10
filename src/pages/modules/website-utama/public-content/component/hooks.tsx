import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { UseGetSession } from '@/pages/modules/website-utama/session'

export const UseGetTreeData = () => {
  const [treeNodes, setTreeNodes] = useState<any[]>([])

  const { session } = UseGetSession()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['tree-nodes', session],
    refetchOnWindowFocus: false,
    enabled: !!session,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/satuan-organisasi-tree/${session?.id_satuan_organisasi}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTreeNodes(data)
    }
  }, [data])

  return { loading, treeNodes }
}

export interface list_unit_terkait {
  id_slider_atas_terkait: string
  id_slider_atas_utama: string
  id_unit: string
  nama_unit: string
}
;[]
