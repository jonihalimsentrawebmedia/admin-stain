import { useState } from 'react'
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
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormTariffType } from '@/pages/modules/website-utama/cost-education/non-ukt/tariff-type/component/form.tsx'

interface props {
  select: EducationalLevelList[]
}

export const ButtonAddTariffType = (props: props) => {
  const { select } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TTariffTypeResolver>({
    resolver: zodResolver(TariffTypeResolver),
  })

  const queryClient = useQueryClient()
  const handleSave = async (value: TTariffTypeResolver) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/jenis-tarif', value)
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
      <Button
        variant={'outline'}
        className={'border border-primary hover:text-primary text-primary'}
        onClick={() => setOpen(!open)}
      >
        <BiPlus />
        Tambah Jenis Tarif
      </Button>

      <DialogBasic
        title={'Tambah Jenis Tarif'}
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
