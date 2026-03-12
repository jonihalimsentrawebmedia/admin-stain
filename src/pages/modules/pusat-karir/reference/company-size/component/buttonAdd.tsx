import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type ICompanySizeResolver, ResolverCompanySize } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { CompanySizeForm } from '@/pages/modules/pusat-karir/reference/company-size/component/form.tsx'

export const ButtonAddCompanySize = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ICompanySizeResolver>({
    resolver: zodResolver(ResolverCompanySize),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: ICompanySizeResolver) => {
    setLoading(true)
    await AxiosClient.post('/pusat-karir/ukuran-perusahaan', value)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['company-size'],
          })
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
      <Button
        onClick={() => setOpen(true)}
        className={'border-primary text-primary hover:text-primary'}
        variant={'outline'}
      >
        <BiPlus />
        Tambah
      </Button>

      <DialogBasic className={'lg:min-w-2xl rounded'} title={'Tambah Ukuran Perusahaan'} open={open} setOpen={setOpen}>
        <CompanySizeForm
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
