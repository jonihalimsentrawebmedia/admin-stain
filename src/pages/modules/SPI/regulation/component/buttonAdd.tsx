import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { ResolverRegulation, type TResolverRegulation } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormServiceSPI } from '@/pages/modules/SPI/regulation/component/form.tsx'

export const ButtonAddRegulation = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverRegulation>({
    resolver: zodResolver(ResolverRegulation),
  })

  const queryClient = useQueryClient()
  const HandleAdd = async (value: TResolverRegulation) => {
    setLoading(true)
    await AxiosClient.post('/spi/peraturan', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['regulation'],
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
        Tambah Peraturan
      </Button>

      <DialogBasic title={'Tambah Peraturan'} open={open} setOpen={setOpen}>
        <FormServiceSPI form={form} loading={loading} HandleSave={HandleAdd} />
      </DialogBasic>
    </>
  )
}
