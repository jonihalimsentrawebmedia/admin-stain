import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import {
  type IMedicineResolver,
  ResolverMedicine,
} from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { MedicineForm } from '../component/form.tsx'
import type { IMedicine } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IMedicine
}

export const ButtonEditMedicine = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IMedicineResolver>({
    resolver: zodResolver(ResolverMedicine),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_obat: data.nama_obat,
        kategori_obat: data.kategori_obat,
        bentuk_sediaan: data.bentuk_sediaan,
        satuan: data.satuan,
        harga: data.harga,
        deskripsi: data.deskripsi,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: IMedicineResolver) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/farmasi/obat/${data?.id_obat}`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data obat')
          queryClient.invalidateQueries({ queryKey: ['medicine'] })
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
        title={'Edit Obat'}
        open={open}
        setOpen={setOpen}
      >
        <MedicineForm
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
