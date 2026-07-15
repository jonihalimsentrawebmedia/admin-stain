import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverJadwal, type TResolverJadwal } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormJadwal } from './formJadwal.tsx'

interface Props {
  id_dokter: string
}

export const ButtonAddJadwal = (props: Props) => {
  const { id_dokter } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverJadwal>({
    resolver: zodResolver(ResolverJadwal),
    defaultValues: { id_dokter },
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: TResolverJadwal) => {
    setLoading(true)
    await AxiosClient.post('/simrs/jadwal-dokter', {
      ...value,
      hari: Number(value.hari),
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menambahkan jadwal')
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
      <Button
        onClick={() => setOpen(true)}
        className={'border-primary text-primary hover:text-primary'}
        variant={'outline'}
      >
        <BiPlus />
        Tambah Jadwal
      </Button>

      <DialogBasic
        className={'lg:min-w-xl rounded'}
        title={'Tambah Jadwal'}
        open={open}
        setOpen={setOpen}
      >
        <FormJadwal HandleSave={HandleSave} form={form} loading={loading} />
      </DialogBasic>
    </>
  )
}
