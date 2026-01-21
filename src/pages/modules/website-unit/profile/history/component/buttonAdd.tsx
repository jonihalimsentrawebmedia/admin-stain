import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import {
  HistoryResolver,
  type HistoryResolverType,
} from '@/pages/modules/website-unit/profile/history/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormHistoryUnit } from '@/pages/modules/website-unit/profile/history/component/form.tsx'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { useQueryClient } from '@tanstack/react-query'

export const ButtonAddHistory = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()

  useEffect(() => {
    if (session) {
      form.reset({
        nama_unit: session?.nama_unit,
      })
    }
  }, [session])

  const form = useForm<HistoryResolverType>({
    resolver: zodResolver(HistoryResolver),
  })
  
  const queryClient = useQueryClient()

  const HandleSave = async (value: HistoryResolverType) => {
    setLoading(true)
    await AxiosClient.post('/unit/profil/sejarah', {
      tahun: value?.tahun,
      urutan: value?.urutan,
      isi_sejarah: value?.isi_sejarah,
      gambar_url: value?.gambar_url,
    })
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Menambahkan Data Sejarah')
          queryClient.invalidateQueries({
            queryKey: ['history-unit'],
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
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Sejarah
      </Button>

      <DialogCustom className={'rounded lg:max-w-2xl'} open={open} setOpen={setOpen} title={'Tambah Sejarah'}>
        <FormHistoryUnit
          form={form}
          handleSave={HandleSave}
          loading={loading}
          setOpen={setOpen}
          open={open}
        />
      </DialogCustom>
    </>
  )
}
