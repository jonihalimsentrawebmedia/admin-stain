import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInvoiceInPatient } from './types.ts'

export const UseGetInvoiceInPatient = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IInvoiceInPatient>({
    queryKey: ['invoice-inpatient', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/simrs/pelayanan/pendaftaran/${id}/tagihan-rawat-inap`).then(
        (res) => res.data?.data
      ),
    enabled: !!id,
  })

  const loading = isLoading || isFetching

  return { invoice: data, loading }
}
