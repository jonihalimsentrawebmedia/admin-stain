import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
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
import { BiPlus } from 'react-icons/bi'

export const ButtonAddRegisterPricing = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const id = window.localStorage.getItem('id_training')
  const form = useForm<TResolverPricing>({
    resolver: zodResolver(ResolverPricing),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPricing) => {
    setLoading(true)
    await AxiosClient.post(`/pusilkom/training/${id}/biaya-pendaftaran`, value)
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
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(true)}
      >
        <BiPlus />
        Buat Biaya Pendaftaran
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
