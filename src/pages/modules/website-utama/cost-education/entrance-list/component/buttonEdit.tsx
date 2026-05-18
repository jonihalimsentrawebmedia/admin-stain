import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IUktEntrance } from '@/pages/modules/website-utama/cost-education/entrance-list/data/types.ts'
import { FormEntranceUkt } from '@/pages/modules/website-utama/cost-education/entrance-list/component/form.tsx'
import { type TUktEntranceUkt, UktEntranceUkt } from '../data/resolver.tsx'

interface props {
  data: IUktEntrance
}

export const ButtonDeleEditEntranceUkt = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TUktEntranceUkt>({
    resolver: zodResolver(UktEntranceUkt),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_jalur_masuk: data?.nama_jalur_masuk,
        urutan: data?.urutan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const handleSave = async (value: TUktEntranceUkt) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/jalur-masuk/${data?.id_jalur_masuk}`, value)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['entrance_ukt'],
          })
          setLoading(false)
          setOpen(false)
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
      <button
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Edit Jalur Masuk'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <FormEntranceUkt
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={handleSave}
        />
      </DialogBasic>
    </>
  )
}
