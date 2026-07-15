import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IProcedureResolver, ResolverProcedure } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { ProcedureForm } from '../component/form.tsx'
import type { IProcedure } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IProcedure
}

export const ButtonEditProcedure = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IProcedureResolver>({
    resolver: zodResolver(ResolverProcedure),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode: data.kode,
        nama: data.nama,
        deskripsi: data.deskripsi,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: IProcedureResolver) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/referensi/procedure/${data?.id_procedure}`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data tindakan')
          queryClient.invalidateQueries({ queryKey: ['procedure'] })
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
        title={'Edit Tindakan'}
        open={open}
        setOpen={setOpen}
      >
        <ProcedureForm
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
