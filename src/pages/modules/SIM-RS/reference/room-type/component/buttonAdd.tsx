import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IRoomTypeResolver, ResolverRoomType } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { RoomTypeForm } from '@/pages/modules/SIM-RS/reference/room-type/component/form.tsx'

export const ButtonAddRoomType = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IRoomTypeResolver>({
    resolver: zodResolver(ResolverRoomType),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: IRoomTypeResolver) => {
    setLoading(true)
    await AxiosClient.post('/simrs/referensi/jenis-ruangan', value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menambahkan data jenis ruangan')
          queryClient.invalidateQueries({ queryKey: ['room-type'] })
          setOpen(false)
          setLoading(false)
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
        onClick={() => setOpen(true)}
        className={'border-primary text-primary hover:text-primary'}
        variant={'outline'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic
        className={'lg:min-w-2xl rounded'}
        title={'Tambah Jenis Ruangan'}
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
