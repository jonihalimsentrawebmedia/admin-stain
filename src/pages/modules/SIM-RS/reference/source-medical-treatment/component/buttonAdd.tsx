import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type ISumberBiayaResolver, ResolverSumberBiaya } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { SumberBiayaForm } from '@/pages/modules/SIM-RS/reference/source-medical-treatment/component/form.tsx'

export const ButtonAddSumberBiaya = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ISumberBiayaResolver>({
    resolver: zodResolver(ResolverSumberBiaya),
    defaultValues: {
      is_ada_nomor_peserta: false,
    },
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: ISumberBiayaResolver) => {
    setLoading(true)
    await AxiosClient.post('/simrs/referensi/sumber-biaya-pengobatan', value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menambahkan data')
          queryClient.invalidateQueries({ queryKey: ['sumber-biaya'] })
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
        title={'Tambah Sumber Biaya Pengobatan'}
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
