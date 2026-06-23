import { useQuery } from '@tanstack/react-query'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetDomainNotExists = ({ group, id }: { group: string; id: string }) => {
  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList[]
    meta: Meta
  }>({
    queryKey: ['satuan-organisasi-domain-not-exists', group, id],
    enabled: !!group,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(
        `/pengaturan/satuan-organisasi-domain-not-exists/${group}?page=0&limit=0&include_ids=${id}`
      ).then((res) => res?.data),
  })

  const loading = isLoading || isFetching

  return { loading, organizationUnit: data?.data ?? [], meta: data?.meta }
}
