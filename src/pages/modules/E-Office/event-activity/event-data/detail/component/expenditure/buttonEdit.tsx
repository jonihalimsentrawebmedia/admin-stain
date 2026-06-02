import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ResolverExpenditure, type TResolverExpenditure } from './resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormExpenditure } from './form.tsx'
import type { IExpenditureEvent } from './hooks.tsx'
import { format } from 'date-fns'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IExpenditureEvent
}

export const ButtonEditExpenditure = (props: props) => {
  const { id } = useParams()
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverExpenditure>({
    resolver: zodResolver(ResolverExpenditure),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        jumlah_pengeluaran: Number(data?.jumlah_pengeluaran) || 0,
        tanggal_pengeluaran: data.tanggal_pengeluaran
          ? format(data?.tanggal_pengeluaran, 'yyyy-MM-dd')
          : '',
        url_file_pengeluaran: data?.url_file_pengeluaran,
        key_url_file_pengeluaran: data?.key_file_pengeluaran,
        tempat_pembelian: data?.tempat_pembelian,
        uraian_pengeluaran: data?.uraian_pengeluaran,
        yang_membayar: data?.yang_membayar,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: TResolverExpenditure) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/acara/${id}/pengeluaran/${data?.id_acara_pengeluaran}`, {
      ...value,
      tanggal_pengeluaran: new Date(value.tanggal_pengeluaran).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['expenditure'],
          })
          toast.success(res.data.message || 'Success')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Something went wrong')
      })
  }

  return (
    <>
      <button
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Data'} open={open} setOpen={setOpen} className={'min-w-2xl'}>
        <FormExpenditure
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          setOpen={setOpen}
          open={open}
        />
      </DialogBasic>
    </>
  )
}
