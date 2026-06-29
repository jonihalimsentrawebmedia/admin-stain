import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormUkkUkm from '@/pages/modules/website-utama/UKK-UKM/component/form.tsx'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import {
  ResolverUkkUkm,
  type TResolverUkkUkm,
} from '@/pages/modules/website-utama/UKK-UKM/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IUkkUkm } from '@/pages/modules/website-utama/UKK-UKM/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IUkkUkm
}

const ButtonEditUkkUkm = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverUkkUkm>({
    resolver: zodResolver(ResolverUkkUkm),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_ukk_ukm: data.nama_ukk_ukm,
        urutan: data?.urutan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverUkkUkm) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/ukk-ukm/${data?.id_ukk_ukm}`, value)
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
      <button
        onClick={() => setOpen(!open)}
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit UKK UKM'} open={open} setOpen={setOpen}>
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

export default ButtonEditUkkUkm
