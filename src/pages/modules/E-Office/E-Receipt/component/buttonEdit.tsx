import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  EreceiptSchema,
  type TEreceiptSchema,
} from '@/pages/modules/E-Office/E-Receipt/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormEreceipt from '@/pages/modules/E-Office/E-Receipt/component/form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IEreceipt } from '@/pages/modules/E-Office/E-Receipt/data/types.ts'

interface props {
  data: IEreceipt
}

const ButtonEditEreceipt = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TEreceiptSchema>({
    resolver: zodResolver(EreceiptSchema),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        no_kwitansi: data?.no_kwitansi,
        tanggal: data?.tanggal?.split('T')[0] ?? '',
        nama_penerima: data?.nama_penerima,
        nama_penyetor: data?.nama_penyetor,
        warna: data?.warna,
        jumlah: Number(data?.jumlah),
        keterangan: data?.keterangan ?? '',
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TEreceiptSchema) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/kwitansi/${data?.id_kwitansi}`, {
      ...value,
      tanggal: new Date(value?.tanggal).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success')
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['e-receipt'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'text-white bg-yellow-500 p-1.5 hover:text-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Kwitansi'} open={open} setOpen={setOpen}>
        <FormEreceipt
          form={form}
          setOpen={setOpen}
          open={open}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditEreceipt
