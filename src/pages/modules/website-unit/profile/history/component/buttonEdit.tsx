import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import {
  HistoryResolver,
  type HistoryResolverType,
} from '@/pages/modules/website-unit/profile/history/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormHistoryUnit } from '@/pages/modules/website-unit/profile/history/component/form.tsx'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { HiPencil } from 'react-icons/hi'
import type { IHistoryUnit } from '@/pages/modules/website-unit/profile/history/data/types.ts'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  data?: IHistoryUnit
}

export const ButtonEditHistory = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { session } = UseGetSessionUnit()

  useEffect(() => {
    if (session || data) {
      form.reset({
        nama_unit: session?.nama_unit,
        tahun: data?.tahun,
        urutan: data?.urutan,
        isi_sejarah: data?.isi_sejarah,
        gambar_url: data?.gambar_url,
      })
    }
  }, [session, data])

  const form = useForm<HistoryResolverType>({
    resolver: zodResolver(HistoryResolver),
  })

  const queryClient = useQueryClient()

  const HandleSave = async (value: HistoryResolverType) => {
    setLoading(true)
    await AxiosClient.put(`/unit/profil/sejarah/${data?.id_unit_sejarah}`, {
      tahun: value?.tahun,
      urutan: value?.urutan,
      isi_sejarah: value?.isi_sejarah,
      gambar_url: value?.gambar_url,
    })
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['history-unit'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Sejarah')
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
        className={'p-1.5 bg-yellow-500 hover:bg-yellow-600 text-white'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={'Ubah Data Sejarah'}
      >
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
