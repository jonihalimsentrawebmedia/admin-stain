import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiPlus } from 'react-icons/bi'
import { ResolverContent, type TResolverContent } from '../data/resolver.tsx'
import { useParams } from 'react-router-dom'
import { FormContentEntrance } from './form.tsx'

const ButtonAddContentEntrance = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const form = useForm<TResolverContent>({
    resolver: zodResolver(ResolverContent),
    defaultValues: {
      id_jalur_masuk: id,
    },
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverContent) => {
    setLoading(true)
    await AxiosClient.post('/pmb/jalur-masuk-konten', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['content-entrance-pmb'],
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
        Tambah Konten
      </Button>

      <DialogBasic title={'Tambah Konten'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <FormContentEntrance
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
export default ButtonAddContentEntrance
