import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ResolverFloorPlan,
  type ResolverFloorPlanType,
} from '@/pages/modules/website-unit/floor-plan/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FormFloorPlan } from '@/pages/modules/website-unit/floor-plan/component/form.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import type { IFloorPlan } from '@/pages/modules/website-unit/floor-plan/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  session?: ISessionUnit
  data?: IFloorPlan
}

export const ButtonEditFloorPlan = (props: Props) => {
  const { session, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ResolverFloorPlanType>({
    resolver: zodResolver(ResolverFloorPlan),
  })

  useEffect(() => {
    if (session || data) {
      form.reset({
        nama_unit: session?.nama_unit,
        denah_lantai_url: data?.denah_lantai_url,
        urutan: data?.urutan,
        nama_lantai: data?.nama_lantai,
      })
    }
  }, [session, data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ResolverFloorPlanType) => {
    setLoading(true)
    await AxiosClient.put(`/unit/denah-lantai/${data?.id_unit_denah_lantai}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['floor-plan'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Denah Lantai')
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
        className={'hover:bg-yellow-600 text-white p-1.5 bg-yellow-500'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogCustom
        disableOutsideDialog
        className={'rounded lg:max-w-4xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Denah'}
      >
        <FormFloorPlan
          form={form}
          open={open}
          setOpen={setOpen}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogCustom>
    </>
  )
}
