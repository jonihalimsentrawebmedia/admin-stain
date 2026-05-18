import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  LevelUTKSchema,
  type TLevelUTKSchema,
} from '@/pages/modules/website-utama/cost-education/level-ukt/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormLevelUkt } from '@/pages/modules/website-utama/cost-education/level-ukt/component/form.tsx'
import type { ILevelUkt } from '@/pages/modules/website-utama/cost-education/level-ukt/data/types.ts'
import { HiPencil } from 'react-icons/hi'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'

interface props {
  data: ILevelUkt
  select?: EducationalLevelList[]
}

export const ButtonEditLevelUkt = (props: props) => {
  const { data, select } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TLevelUTKSchema>({
    resolver: zodResolver(LevelUTKSchema),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_tingkatan_ukt: data?.nama_tingkatan_ukt,
        urutan: data?.urutan,
        jumlah_bawaan_ukt: data?.jumlah_bawaan_ukt,
        id_jenjang_pendidikan: data?.id_jenjang_pendidikan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const handleSave = async (value: TLevelUTKSchema) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/tingkatan-ukt/${data?.id_tingkatan_ukt}`, value)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['level_ukt'],
          })
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          form.reset()
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
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(true)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Tambah Tingkat UKT'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <FormLevelUkt
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={handleSave}
          select={select}
        />
      </DialogBasic>
    </>
  )
}
