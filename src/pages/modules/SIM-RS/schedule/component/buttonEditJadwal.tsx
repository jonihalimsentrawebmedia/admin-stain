import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverJadwal, type TResolverJadwal } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormJadwal } from './formJadwal.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IJadwalDokterItem } from '../data/types.ts'

interface Props {
  data: IJadwalDokterItem
  id_dokter: string
}

export const ButtonEditJadwal = (props: Props) => {
  const { data, id_dokter } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverJadwal>({
    resolver: zodResolver(ResolverJadwal),
    defaultValues: {
      id_dokter,
      hari: String(data.hari),
      jam_mulai: data.jam_mulai.slice(0, 5),
      jam_selesai: data.jam_selesai.slice(0, 5),
    },
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: TResolverJadwal) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/jadwal-dokter/${data.id_jadwal_dokter}`, {
      ...value,
      hari: Number(value.hari),
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate jadwal')
          queryClient.invalidateQueries({ queryKey: ['doctor-schedule', id_dokter] })
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
        className={'lg:min-w-xl rounded'}
        title={'Edit Jadwal'}
        open={open}
        setOpen={setOpen}
      >
        <FormJadwal HandleSave={HandleSave} form={form} loading={loading} />
      </DialogBasic>
    </>
  )
}
