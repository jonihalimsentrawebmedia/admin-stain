import { BiPlus } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaqResolver,
  type IFAQResolver,
} from '@/pages/modules/website-utama/pertayaan/Faq/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FormFAQDataProdi } from './form'

export const ButtonAddFAQUnit = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IFAQResolver>({
    resolver: zodResolver(FaqResolver),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: IFAQResolver) => {
    setLoading(true)
    await AxiosClient.post('/unit/faq', value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-faq-unit'],
          })
          toast.success(res.data.message || 'Success Tambah F.A.Q')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'text-primary hover:text-primary border-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah F.A.Q
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah F.A.Q'}
        className={'rounded lg:max-w-7xl'}
        disableOutsideDialog
      >
        <FormFAQDataProdi
          form={form}
          loading={loading}
          open={open}
          setOpen={setOpen}
          HandleSave={HandleSave}
        />
      </DialogCustom>
    </>
  )
}
