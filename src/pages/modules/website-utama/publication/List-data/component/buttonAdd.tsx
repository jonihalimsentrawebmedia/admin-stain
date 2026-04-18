import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormListPublication } from '@/pages/modules/website-utama/publication/List-data/component/form.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { ResolverPublication, type TResolverPublication } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

export const ButtonAddPublication = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPublication>({
    resolver: zodResolver(ResolverPublication),
    defaultValues: {
      id_tahun_publikasi: id,
    },
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPublication) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/publikasi', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['publication'],
          })
          form.reset()
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
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
        onClick={() => setOpen(!open)}
        className={'text-primary hover:text-primary border-primary'}
      >
        <BiPlus />
        Tambah Publikasi
      </Button>

      <DialogBasic title={'Tambah Publikasi'} open={open} setOpen={setOpen}>
        <FormListPublication
          setOpen={setOpen}
          loading={loading}
          open={open}
          form={form}
          HandlerSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}
