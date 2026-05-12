import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ResolverEntrance,
  type TResolverEntrance,
} from '@/pages/modules/PMB/entrance/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FormEntrance } from '@/pages/modules/PMB/entrance/component/form.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiPlus } from 'react-icons/bi'

const ButtonAddEntrancePMB = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverEntrance>({
    resolver: zodResolver(ResolverEntrance),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverEntrance) => {
    setLoading(true)
    await AxiosClient.post('/pmb/jalur-masuk', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['entrance-pmb'],
          })
          form.reset()
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
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Jalur Masuk
      </Button>

      <DialogBasic
        title={'Tambah Jalur Masuk'}
        open={open}
        setOpen={setOpen}
        className={'min-w-3xl'}
      >
        <FormEntrance
          form={form}
          open={open}
          setOpen={setOpen}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}
export default ButtonAddEntrancePMB
