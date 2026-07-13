import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IRoomTypeResolver, ResolverRoomType } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { RoomTypeForm } from '../component/form.tsx'
import type { IRoomType } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IRoomType
}

export const ButtonEditRoomType = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IRoomTypeResolver>({
    resolver: zodResolver(ResolverRoomType),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama: data.nama,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: IRoomTypeResolver) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/referensi/jenis-ruangan/${data?.id_jenis_ruangan}`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data jenis ruangan')
          queryClient.invalidateQueries({ queryKey: ['room-type'] })
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        className={'lg:min-w-2xl rounded'}
        title={'Edit Jenis Ruangan'}
        open={open}
        setOpen={setOpen}
      >
        <RoomTypeForm
          HandlerSave={HandleSave}
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}
