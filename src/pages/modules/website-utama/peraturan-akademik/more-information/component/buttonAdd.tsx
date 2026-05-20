import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormMoreInformation from '@/pages/modules/website-utama/peraturan-akademik/more-information/component/form.tsx'
import { ResolverMoreInformation, type TResolverMoreInformation } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

const ButtonAddMoreInformation = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverMoreInformation>({
    resolver: zodResolver(ResolverMoreInformation),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (e: TResolverMoreInformation) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/pengaturan-akademik-informasi-tambahan', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['more_information'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
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
        className="border border-primary hover:text-primay text-primary"
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Informasi
      </Button>

      <DialogBasic title={'Tambah Informasi'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <FormMoreInformation
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

export default ButtonAddMoreInformation
