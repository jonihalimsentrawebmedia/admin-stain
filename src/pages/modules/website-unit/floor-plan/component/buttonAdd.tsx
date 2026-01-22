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
import { Button } from '@/components/ui/button.tsx'
import { FormFloorPlan } from '@/pages/modules/website-unit/floor-plan/component/form.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'

interface Props {
  session?: ISessionUnit
}

export const ButtonAddFloorPlan = (props: Props) => {
  const { session } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ResolverFloorPlanType>({
    resolver: zodResolver(ResolverFloorPlan),
  })

  useEffect(() => {
    if (session) {
      form.reset({
        nama_unit: session?.nama_unit,
      })
    }
  }, [session])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ResolverFloorPlanType) => {
    setLoading(true)
    await AxiosClient.post('/unit/denah-lantai', value)
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
      <Button variant={'outline'} className={'border-primary'} onClick={() => setOpen(!open)}>
        Tambah Denah
      </Button>

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
