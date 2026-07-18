import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import {
  type ISumberBiayaResolver,
  ResolverSumberBiaya,
} from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { SumberBiayaForm } from '../component/form.tsx'
import type { ISumberBiaya } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: ISumberBiaya
}

export const ButtonEditSumberBiaya = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ISumberBiayaResolver>({
    resolver: zodResolver(ResolverSumberBiaya),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode: data.kode,
        nama: data.nama,
        is_ada_nomor_peserta: data.is_ada_nomor_peserta,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ISumberBiayaResolver) => {
    setLoading(true)
    await AxiosClient.put(
      `/simrs/referensi/sumber-biaya-pengobatan/${data?.id_sumber_biaya}`,
      value,
    )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data')
          queryClient.invalidateQueries({ queryKey: ['sumber-biaya'] })
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
        title={'Edit Sumber Biaya Pengobatan'}
        open={open}
        setOpen={setOpen}
      >
        <SumberBiayaForm
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
