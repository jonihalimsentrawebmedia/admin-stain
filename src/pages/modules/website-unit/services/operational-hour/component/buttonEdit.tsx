import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  OperatingHour,
  type OperatingHourType,
} from '@/pages/modules/website-unit/services/operational-hour/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormOperationalHour } from '@/pages/modules/website-unit/services/operational-hour/component/form.tsx'
import type { IHourOperational } from '@/pages/modules/website-unit/services/operational-hour/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IHourOperational
}

export const ButtonEditOperationalHour = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<OperatingHourType>({
    resolver: zodResolver(OperatingHour),
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({
        hari: data?.hari,
        jam_operasional: data?.jam_operasional,
      })
    }
  }, [data])

  const HandleSave = async (value: OperatingHourType) => {
    setLoading(true)
    await AxiosClient.put(`/unit/jam-operasional/${data?.id_unit_jam_operasional}`, value)
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
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className={'p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white'}
      >
        <HiPencil />
      </button>

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
