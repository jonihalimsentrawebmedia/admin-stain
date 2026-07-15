import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type IDiagnosisResolver, ResolverDiagnosis } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { DiagnosisForm } from '@/pages/modules/SIM-RS/reference/diagnosis/component/form.tsx'

export const ButtonAddDiagnosis = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IDiagnosisResolver>({
    resolver: zodResolver(ResolverDiagnosis),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: IDiagnosisResolver) => {
    setLoading(true)
    await AxiosClient.post('/simrs/referensi/diagnosis', value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menambahkan data diagnosis')
          queryClient.invalidateQueries({ queryKey: ['diagnosis'] })
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
        title={'Tambah Diagnosis'}
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
