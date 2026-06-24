import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'
import type { ICategoryDocument } from '@/pages/modules/SPI/quality-assurance/document-system/category/data/types.ts'

export const UseGetCategoryDocument = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (limit) Params.append('limit', limit ?? '1')
  if (page) Params.append('page', page ?? '10')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<ICategoryDocument[]>>({
    queryKey: ['category-document', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/spi/kategori-sistem-dokumen?${Params}`).then((res) => res.data),
  })

  const category: ICategoryDocument[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { loading, meta, category }
}
