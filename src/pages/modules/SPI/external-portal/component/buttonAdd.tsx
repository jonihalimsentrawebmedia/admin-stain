import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { ResolverExternalPortal, type TResolverExternalPortal } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormExternalPortal } from '@/pages/modules/SPI/external-portal/component/form.tsx'

export const ButtonAddPortal = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverExternalPortal>({
    resolver: zodResolver(ResolverExternalPortal),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverExternalPortal) => {
    setLoading(true)
    await AxiosClient.post('/spi/portal-eksternal', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['external-portal'],
          })
          toast.success(res.data.message || 'Success')
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
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Portal Eksternal
      </Button>

      <DialogBasic
        title={'Tambah Portal Eksternal'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-3xl'}
      >
        <FormExternalPortal
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          open={open}
          setOpen={setOpen}
        />
      </DialogBasic>
    </>
  )
}
