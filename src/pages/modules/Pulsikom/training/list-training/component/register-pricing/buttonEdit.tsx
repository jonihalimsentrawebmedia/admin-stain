import { Button } from '@/components/ui/button.tsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ResolverPricing,
  type TResolverPricing,
} from '@/pages/modules/Pulsikom/training/list-training/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { FormRegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/component/form/formRegisterPricing.tsx'
import type { IRegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IRegisterPricing
}

export const ButtonEditRegisterPricing = (props: Props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const id = window.localStorage.getItem('id_training')
  const form = useForm<TResolverPricing>({
    resolver: zodResolver(ResolverPricing),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        urutan: data?.urutan,
        harga: data?.harga,
        keuntungan: data?.keuntungan,
        nama_biaya: data?.nama_biaya,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPricing) => {
    setLoading(true)
    await AxiosClient.put(
      `/pusilkom/training/${id}/biaya-pendaftaran/${data?.id_biaya_pendaftaran}`,
      value
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['register-pricing'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-training'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-yellow-500 text-yellow-500 hover:text-yellow-500'}
        onClick={() => setOpen(true)}
      >
        <HiPencil /> Edit
      </Button>

      <DialogBasic
        title={'Buat Biaya Pendaftaran'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <FormRegisterPricing
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
