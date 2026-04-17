import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StatusEmployeeResolver, type TStatusEmployeeResolver } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormEmployeeStatus } from '@/pages/modules/website-utama/lecturer-staff/status-employee/component/form.tsx'

const ButtonAddEmployeeStatus = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TStatusEmployeeResolver>({
    resolver: zodResolver(StatusEmployeeResolver),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TStatusEmployeeResolver) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/sdm-status', value)
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
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className="border border-primary hover:text-primay text-primary"
      >
        Tambah Data
      </Button>

      <DialogBasic title={'Tambah Status Employee'} open={open} setOpen={setOpen}>
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

export default ButtonAddEmployeeStatus
