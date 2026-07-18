import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IDiagnosisResolver, ResolverDiagnosis } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { DiagnosisForm } from '../component/form.tsx'
import type { IDiagnosis } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IDiagnosis
}

export const ButtonEditDiagnosis = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IDiagnosisResolver>({
    resolver: zodResolver(ResolverDiagnosis),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode: data.kode,
        nama: data.nama,
        deskripsi: data.deskripsi,
        harga: data.harga,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: IDiagnosisResolver) => {
    setLoading(true)
    await AxiosClient.put(`/simrs/referensi/diagnosis/${data?.id_diagnosis}`, value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengupdate data diagnosis')
          queryClient.invalidateQueries({ queryKey: ['diagnosis'] })
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
        title={'Edit Diagnosis'}
        open={open}
        setOpen={setOpen}
      >
        <DiagnosisForm
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
