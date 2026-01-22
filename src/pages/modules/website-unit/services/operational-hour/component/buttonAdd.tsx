import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  OperatingHour,
  type OperatingHourType,
} from '@/pages/modules/website-unit/services/operational-hour/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormOperationalHour } from '@/pages/modules/website-unit/services/operational-hour/component/form.tsx'

export const ButtonAddOperationalHour = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<OperatingHourType>({
    resolver: zodResolver(OperatingHour),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: OperatingHourType) => {
    setLoading(true)
    await AxiosClient.post('/unit/jam-operasional', value)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['operational-hour'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Jadwal Operasional')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        disabled={loading}
        className={'border-primary'}
      >
        <BiPlus /> Tambah Data
      </Button>

      <DialogCustom
        className={'lg:max-w-3xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Jadwal Operasional'}
      >
        <FormOperationalHour
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogCustom>
    </>
  )
}
