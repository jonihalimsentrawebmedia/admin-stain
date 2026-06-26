import type {IServices} from "@/pages/modules/LPPM/services/data/types.tsx";
import type {Meta} from "@/components/common/table/TablePagination.tsx";
import {useQuery} from "@tanstack/react-query";
import AxiosClient from "@/provider/axios.tsx";
import type {basicProps} from "@/pages/modules/LPPM/hooks/types.ts";

export const UseGetServices = (props?: basicProps) => {
  const {page, limit, search} = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page.toString())
  if (limit) ParamsSearch.append('limit', limit.toString())
  if (search) ParamsSearch.append('search', search.toString())

  const {data, isLoading, isFetching} = useQuery<{ data: IServices[]; meta: Meta }>({
    queryKey: ['services', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/layanan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {service: data?.data ?? [], meta: data?.meta, loading}
}
