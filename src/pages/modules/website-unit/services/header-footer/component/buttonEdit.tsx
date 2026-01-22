import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { type IResolverHeaderFooter, resolverServiceHeaderFooter } from '../data/resolver'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormHeaderFooter } from '@/pages/modules/website-unit/services/header-footer/component/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IUnitHeaderFooterServices } from '@/pages/modules/website-unit/services/header-footer/data/types.ts'
import { HiPencil } from 'react-icons/hi'

export const ButtonEditServiceHeaderFooter = (data?: IUnitHeaderFooterServices) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IResolverHeaderFooter>({
    resolver: zodResolver(resolverServiceHeaderFooter),
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({
        is_footer: data?.is_footer,
        is_header: data?.is_header,
        nama_layanan: data?.nama_layanan,
        url: data?.url,
      })
    }
  }, [data])

  const HandleSave = async (value: IResolverHeaderFooter) => {
    setLoading(true)
    await AxiosClient.put(
      `/unit/layanan-header-footer/${data?.id_unit_layanan_header_footer}`,
      value
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['header-footer'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Layanan Header Footer')
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
        className={'bg-yellow-500 text-white p-1.5 hover:bg-yellow-600'}
        disabled={loading}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'lg:max-w-3xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Layanan Header Footer'}
      >
        <FormHeaderFooter
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
