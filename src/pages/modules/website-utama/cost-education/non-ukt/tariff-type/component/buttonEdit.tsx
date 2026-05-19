import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import {
  TariffTypeResolver,
  type TTariffTypeResolver,
} from '@/pages/modules/website-utama/cost-education/non-ukt/tariff-type/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { EducationalLevelList } from '@/pages/modules/settings/reference/educational-level/model'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormTariffType } from '@/pages/modules/website-utama/cost-education/non-ukt/tariff-type/component/form.tsx'
import type { TariffTypeList } from '@/pages/modules/website-utama/cost-education/non-ukt/tariff-type/data/type.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  select: EducationalLevelList[]
  data: TariffTypeList
}

export const ButtonEditTariffType = (props: props) => {
  const { select, data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TTariffTypeResolver>({
    resolver: zodResolver(TariffTypeResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_jenjang_pendidikan: data?.id_jenjang_pendidikan,
        nama_jenis_tarif: data?.nama_jenis_tarif,
        urutan: data?.urutan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const handleSave = async (value: TTariffTypeResolver) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/jenis-tarif/${data.id_jenis_tarif}`, value)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['tariff_type'],
          })
          setLoading(false)
          setOpen(false)
          form.reset()
          toast.success(res.data.message || 'Success Tambah Jenis Tarif')
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
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Edit Jenis Tarif'}
        open={open}
        setOpen={setOpen}
        className={'lg:min-w-2xl'}
      >
        <FormTariffType
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={handleSave}
          selectList={select}
        />
      </DialogBasic>
    </>
  )
}
