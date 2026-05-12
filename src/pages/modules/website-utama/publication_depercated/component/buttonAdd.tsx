import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverPublication, type TResolverPublication } from '@/pages/modules/website-utama/publication_depercated/data/resolver.tsx'
import FormPublication from '@/pages/modules/website-utama/publication_depercated/component/form.tsx'

const ButtonAddPublication = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPublication>({
    resolver: zodResolver(ResolverPublication),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPublication) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/tahun-publikasi', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          queryClient.invalidateQueries({
            queryKey: ['publication-year'],
          })
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
        onClick={() => setOpen(!open)}
        className="border border-primary hover:text-primay text-primary"
      >
        <BiPlus />
        Tambah Data
      </Button>

      <DialogBasic title={'Tambah Tahun Publikasi'} open={open} setOpen={setOpen}>
        <FormPublication
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonAddPublication
