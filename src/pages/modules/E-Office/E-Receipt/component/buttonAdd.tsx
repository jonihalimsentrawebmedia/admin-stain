import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  EreceiptSchema,
  type TEreceiptSchema,
} from '@/pages/modules/E-Office/E-Receipt/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormEreceipt from '@/pages/modules/E-Office/E-Receipt/component/form.tsx'

const ButtonAddEreceipt = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TEreceiptSchema>({
    resolver: zodResolver(EreceiptSchema),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TEreceiptSchema) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/kwitansi', {
      ...value,
      jumlah: value?.jumlah.toString(),
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
      <Button className={'rounded-full text-white'} onClick={() => setOpen(!open)}>
        <BiPlus />
        Tambah Kwitansi
      </Button>

      <DialogBasic title={'Tambah Kwitansi'} open={open} setOpen={setOpen} className={'min-w-3xl'}>
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

export default ButtonAddEreceipt
