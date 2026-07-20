import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInvoiceOutPatient } from '../data/types.ts'

export const UseGetInvoiceOutPatient = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IInvoiceOutPatient>({
    queryKey: ['invoice-outpatient', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/pelayanan/pendaftaran/${id}/tagihan-rawat-jalan`).then(
        (res) => res.data?.data
      ),
    enabled: !!id,
  })

  const loading = isLoading || isFetching

  return { invoice: data, loading }
}
