import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export interface IHumanResource {
  nama: string
  id_sdm: string
  jabatan: string[]
  nama_unit_kerja: string
  no_hp: string
  nip: string
  nik: string
  alamat: string
  nidn: string
  id_satuan_kerja: string
  tanggal_lahir: string
}

export const UseGetHumanResource = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery<{ data: IHumanResource[]; meta: Meta }>({
    refetchOnWindowFocus: false,
    queryKey: ['human-resource', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/ref/sdm?${Params}`).then((res) => res?.data),
  })

  const loading = isLoading || isFetching

  return { loading, humanResource: data?.data ?? [], meta: data?.meta }
}
