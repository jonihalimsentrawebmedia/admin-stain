import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { type ICompanySizeResolver, ResolverCompanySize } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { CompanySizeForm } from '../component/form.tsx'
import type { ICompanySize } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: ICompanySize
}

export const ButtonEditCompanySize = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ICompanySizeResolver>({
    resolver: zodResolver(ResolverCompanySize),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
      })
    }
  }, [data])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ICompanySizeResolver) => {
    setLoading(true)
    await AxiosClient.put(`/pusat-karir/ukuran-perusahaan/${data?.id_ukuran_perusahaan}`, value)
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
      <button
        onClick={() => setOpen(true)}
        className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
      >
        <HiPencil />
      </button>

      <DialogBasic
        className={'lg:min-w-2xl rounded'}
        title={'Tambah Ukuran Perusahaan'}
        open={open}
        setOpen={setOpen}
      >
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
