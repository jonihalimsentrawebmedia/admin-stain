import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StatusEmployeeResolver, type TStatusEmployeeResolver } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormEmployeeStatus } from '@/pages/modules/website-utama/lecturer-staff/status-employee/component/form.tsx'
import type { IStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IStatusEmployee
}

const ButtonEditEmployeeStatus = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TStatusEmployeeResolver>({
    resolver: zodResolver(StatusEmployeeResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode_status: data?.kode_status,
        nama_status: data?.nama_status,
        is_ada_nidn: data?.is_ada_nidn,
        is_dosen: data?.is_dosen,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TStatusEmployeeResolver) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/sdm-status/${data?.id_status_sdm}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['status-employee'],
          })
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
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Status Employee'} open={open} setOpen={setOpen}>
        <FormEmployeeStatus
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditEmployeeStatus
