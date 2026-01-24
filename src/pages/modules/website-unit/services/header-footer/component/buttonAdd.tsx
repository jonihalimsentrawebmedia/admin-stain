import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { type IResolverHeaderFooter, resolverServiceHeaderFooter } from '../data/resolver'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { BiPlus } from 'react-icons/bi'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormHeaderFooter } from '@/pages/modules/website-unit/services/header-footer/component/form.tsx'
import { zodResolver } from '@hookform/resolvers/zod'

export const ButtonAddServiceHeaderFooter = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IResolverHeaderFooter>({
    resolver: zodResolver(resolverServiceHeaderFooter),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: IResolverHeaderFooter) => {
    setLoading(true)
    await AxiosClient.post('/unit/layanan-header-footer', value)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['header-footer'],
          })
          form.reset()
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
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'border-primary'}
        disabled={loading}
      >
        <BiPlus />
        Tambah
      </Button>

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
