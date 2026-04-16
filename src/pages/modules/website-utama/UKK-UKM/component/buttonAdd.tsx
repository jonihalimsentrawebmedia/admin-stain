import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormUkkUkm from '@/pages/modules/website-utama/UKK-UKM/component/form.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import {
  ResolverUkkUkm,
  type TResolverUkkUkm,
} from '@/pages/modules/website-utama/UKK-UKM/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { useQueryClient } from '@tanstack/react-query'

const ButtonAddUkkUkm = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverUkkUkm>({
    resolver: zodResolver(ResolverUkkUkm),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverUkkUkm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/ukk-ukm', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          queryClient.invalidateQueries({
            queryKey: ['ukk_ukm'],
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

      <DialogBasic title={'Tambah UKK UKM'} open={open} setOpen={setOpen}>
        <FormUkkUkm
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

export default ButtonAddUkkUkm
