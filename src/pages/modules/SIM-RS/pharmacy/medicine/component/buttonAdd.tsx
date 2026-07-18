import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import {
  type IMedicineResolver,
  ResolverMedicine,
} from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { MedicineForm } from '@/pages/modules/SIM-RS/pharmacy/medicine/component/form.tsx'

export const ButtonAddMedicine = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IMedicineResolver>({
    resolver: zodResolver(ResolverMedicine),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: IMedicineResolver) => {
    setLoading(true)
    await AxiosClient.post('/simrs/farmasi/obat', value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil menambahkan data obat')
          queryClient.invalidateQueries({ queryKey: ['medicine'] })
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
        title={'Tambah Obat'}
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
