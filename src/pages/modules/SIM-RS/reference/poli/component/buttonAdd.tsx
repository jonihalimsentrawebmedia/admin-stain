import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type TResolverPoliCreate, ResolverPoliCreate } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormPoliCreate } from './forms.tsx'

export const ButtonAddPoli = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPoliCreate>({
    resolver: zodResolver(ResolverPoliCreate),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: TResolverPoliCreate) => {
    setLoading(true)
    await AxiosClient.post('/simrs/referensi/poli', value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menambahkan data poli')
          queryClient.invalidateQueries({ queryKey: ['poli'] })
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={'border-primary text-primary hover:text-primary'}
        variant={'outline'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic className={'lg:min-w-2xl rounded'} title={'Tambah Poli'} open={open} setOpen={setOpen}>
        <FormPoliCreate
          HandleSave={HandleSave}
          form={form}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}
